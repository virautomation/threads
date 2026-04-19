import bcrypt from "bcryptjs";
import { supabaseAdmin } from "./supabase/server";

export interface Admin {
  id: string;
  email: string;
  password_hash: string;
}

export async function countAdmins(): Promise<number> {
  const db = supabaseAdmin();
  const { count, error } = await db.from("admins").select("*", { count: "exact", head: true });
  if (error) throw new Error(`countAdmins: ${error.message}`);
  return count ?? 0;
}

export async function getAdminByEmail(email: string): Promise<Admin | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("admins")
    .select("id, email, password_hash")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  if (error) throw new Error(`getAdminByEmail: ${error.message}`);
  return (data as Admin) ?? null;
}

export async function createAdmin(email: string, password: string): Promise<Admin> {
  const db = supabaseAdmin();
  const password_hash = await bcrypt.hash(password, 12);
  const { data, error } = await db
    .from("admins")
    .insert({ email: email.toLowerCase(), password_hash })
    .select("id, email, password_hash")
    .single();
  if (error) throw new Error(`createAdmin: ${error.message}`);
  return data as Admin;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
