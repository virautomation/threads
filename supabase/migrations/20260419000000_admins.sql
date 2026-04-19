-- ============================================================
-- threadlens admins table — password-gated single admin login
-- ============================================================

CREATE TABLE IF NOT EXISTS threadlens.admins (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text        UNIQUE NOT NULL,
  password_hash   text        NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS admins_touch ON threadlens.admins;
CREATE TRIGGER admins_touch BEFORE UPDATE ON threadlens.admins
  FOR EACH ROW EXECUTE FUNCTION threadlens.touch_updated_at();

GRANT ALL ON TABLE threadlens.admins TO service_role;
