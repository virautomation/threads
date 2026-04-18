-- ============================================================
-- threadlens schema — Threads content analytics + LLM insights
-- Run via: supabase db push  (or paste in Supabase SQL editor)
-- ============================================================

CREATE SCHEMA IF NOT EXISTS threadlens;
GRANT USAGE ON SCHEMA threadlens TO anon, authenticated, service_role;

-- Extensions ---------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums --------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE threadlens.media_type AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'CAROUSEL_ALBUM', 'AUDIO', 'REPOST_FACADE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE threadlens.analysis_type AS ENUM ('performance', 'pattern', 'ideas', 'chat');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE threadlens.sync_status AS ENUM ('idle', 'running', 'success', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Tables -------------------------------------------------------

-- Single-user MVP: only one row expected here, but kept as table
-- so multi-user upgrade later is a non-breaking change.
CREATE TABLE IF NOT EXISTS threadlens.users (
  id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  threads_user_id         text          UNIQUE NOT NULL,
  username                text,
  name                    text,
  threads_profile_picture_url text,
  -- access_token stored AES-256-GCM encrypted (iv:tag:ciphertext as hex)
  access_token_encrypted  text,
  token_expires_at        timestamptz,
  scopes                  text[],
  created_at              timestamptz   NOT NULL DEFAULT now(),
  updated_at              timestamptz   NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS threadlens.posts (
  id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid          NOT NULL REFERENCES threadlens.users(id) ON DELETE CASCADE,
  threads_post_id         text          NOT NULL,
  text                    text,
  media_type              threadlens.media_type,
  media_url               text,
  thumbnail_url           text,
  permalink               text,
  is_quote_post           boolean       NOT NULL DEFAULT false,
  published_at            timestamptz   NOT NULL,
  last_insights_sync_at   timestamptz,
  created_at              timestamptz   NOT NULL DEFAULT now(),
  updated_at              timestamptz   NOT NULL DEFAULT now(),
  UNIQUE (user_id, threads_post_id)
);

CREATE INDEX IF NOT EXISTS idx_posts_user_published_at
  ON threadlens.posts (user_id, published_at DESC);

-- Latest insights snapshot per post (denormalized for fast list queries)
CREATE TABLE IF NOT EXISTS threadlens.post_insights (
  post_id                 uuid          PRIMARY KEY REFERENCES threadlens.posts(id) ON DELETE CASCADE,
  views                   bigint        NOT NULL DEFAULT 0,
  likes                   bigint        NOT NULL DEFAULT 0,
  replies                 bigint        NOT NULL DEFAULT 0,
  reposts                 bigint        NOT NULL DEFAULT 0,
  quotes                  bigint        NOT NULL DEFAULT 0,
  shares                  bigint        NOT NULL DEFAULT 0,
  engagement_rate         numeric(8,4)  GENERATED ALWAYS AS (
    CASE WHEN views > 0
      THEN ((likes + replies + reposts + quotes + shares)::numeric / views::numeric)
      ELSE 0 END
  ) STORED,
  snapshot_at             timestamptz   NOT NULL DEFAULT now()
);

-- Historical snapshots (insights change over time)
CREATE TABLE IF NOT EXISTS threadlens.post_insights_history (
  id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id                 uuid          NOT NULL REFERENCES threadlens.posts(id) ON DELETE CASCADE,
  views                   bigint        NOT NULL DEFAULT 0,
  likes                   bigint        NOT NULL DEFAULT 0,
  replies                 bigint        NOT NULL DEFAULT 0,
  reposts                 bigint        NOT NULL DEFAULT 0,
  quotes                  bigint        NOT NULL DEFAULT 0,
  shares                  bigint        NOT NULL DEFAULT 0,
  snapshot_at             timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_post_insights_history_post_snapshot
  ON threadlens.post_insights_history (post_id, snapshot_at DESC);

CREATE TABLE IF NOT EXISTS threadlens.account_insights (
  id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid          NOT NULL REFERENCES threadlens.users(id) ON DELETE CASCADE,
  followers_count         bigint        NOT NULL DEFAULT 0,
  views                   bigint        NOT NULL DEFAULT 0,
  likes                   bigint        NOT NULL DEFAULT 0,
  replies                 bigint        NOT NULL DEFAULT 0,
  reposts                 bigint        NOT NULL DEFAULT 0,
  quotes                  bigint        NOT NULL DEFAULT 0,
  snapshot_at             timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_account_insights_user_snapshot
  ON threadlens.account_insights (user_id, snapshot_at DESC);

CREATE TABLE IF NOT EXISTS threadlens.llm_analysis (
  id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid          NOT NULL REFERENCES threadlens.users(id) ON DELETE CASCADE,
  post_id                 uuid          REFERENCES threadlens.posts(id) ON DELETE SET NULL,
  type                    threadlens.analysis_type NOT NULL,
  input_context           jsonb         NOT NULL DEFAULT '{}'::jsonb,
  output                  text          NOT NULL,
  model_used              text          NOT NULL,
  prompt_tokens           integer,
  completion_tokens       integer,
  created_at              timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_llm_analysis_user_type_created
  ON threadlens.llm_analysis (user_id, type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_llm_analysis_post_type
  ON threadlens.llm_analysis (post_id, type);

-- Sync state (one row per user)
CREATE TABLE IF NOT EXISTS threadlens.sync_state (
  user_id                 uuid          PRIMARY KEY REFERENCES threadlens.users(id) ON DELETE CASCADE,
  status                  threadlens.sync_status NOT NULL DEFAULT 'idle',
  last_started_at         timestamptz,
  last_succeeded_at       timestamptz,
  last_error              text,
  posts_synced            integer       NOT NULL DEFAULT 0,
  next_scheduled_at       timestamptz
);

-- Updated_at trigger ------------------------------------------
CREATE OR REPLACE FUNCTION threadlens.touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_touch ON threadlens.users;
CREATE TRIGGER users_touch BEFORE UPDATE ON threadlens.users
  FOR EACH ROW EXECUTE FUNCTION threadlens.touch_updated_at();

DROP TRIGGER IF EXISTS posts_touch ON threadlens.posts;
CREATE TRIGGER posts_touch BEFORE UPDATE ON threadlens.posts
  FOR EACH ROW EXECUTE FUNCTION threadlens.touch_updated_at();

-- Permissions --------------------------------------------------
GRANT ALL ON ALL TABLES    IN SCHEMA threadlens TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA threadlens TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA threadlens
  GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA threadlens
  GRANT ALL ON SEQUENCES TO service_role;

-- NOTE: Single-user MVP — all DB access goes through the
-- service-role on the server. We intentionally do NOT grant
-- table access to anon/authenticated. RLS is therefore not
-- required (no client-side reads), and the schema must be
-- added to PGRST_DB_SCHEMAS for service_role REST access.
