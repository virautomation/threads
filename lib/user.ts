import { supabaseAdmin } from "./supabase/server";
import { decryptToken } from "./crypto";

export interface AppUser {
  id: string;
  threads_user_id: string;
  username: string | null;
  name: string | null;
  threads_profile_picture_url: string | null;
  access_token_encrypted: string | null;
  token_expires_at: string | null;
  scopes: string[] | null;
}

/**
 * Single-user MVP: returns the most recently connected user, or null.
 */
export async function getCurrentUser(): Promise<AppUser | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("users")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`getCurrentUser: ${error.message}`);
  return (data as AppUser) ?? null;
}

export async function getCurrentUserToken(): Promise<{ user: AppUser; token: string }> {
  const user = await getCurrentUser();
  if (!user) throw new Error("No connected Threads account. Visit /settings to connect.");
  if (!user.access_token_encrypted) throw new Error("Access token missing. Reconnect Threads.");
  return { user, token: decryptToken(user.access_token_encrypted) };
}
