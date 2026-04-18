import { createClient } from "@supabase/supabase-js";
import { env } from "../env";

let cached: ReturnType<typeof build> | null = null;

function build() {
  return createClient(env.supabaseUrl(), env.supabaseServiceRole(), {
    auth: { autoRefreshToken: false, persistSession: false },
    db: { schema: "threadlens" },
  });
}

/**
 * Service-role Supabase client (schema: threadlens). Server-only.
 * Single-user MVP: all DB access flows through this client.
 */
export function supabaseAdmin() {
  if (!cached) cached = build();
  return cached;
}
