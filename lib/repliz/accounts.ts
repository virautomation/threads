import { listReplizAccounts, type ReplizAccount } from "./client";

/**
 * Resolve a Threads account by username (case-insensitive, optional leading @).
 * If username is empty/undefined, returns the first connected Threads account
 * (deterministic default). Throws with a helpful message on miss.
 */
export async function resolveReplizAccount(username?: string | null): Promise<ReplizAccount> {
  const accounts = (await listReplizAccounts("threads")).filter((a) => a.isConnected);
  if (accounts.length === 0) {
    throw new Error("No connected Threads accounts in Repliz.");
  }
  const cleaned = (username ?? "").trim().replace(/^@/, "").toLowerCase();
  if (!cleaned) return accounts[0];

  const match = accounts.find((a) => (a.username ?? "").toLowerCase() === cleaned);
  if (!match) {
    const known = accounts.map((a) => a.username).join(", ");
    throw new Error(`Account "${username}" not found in Repliz. Connected: ${known}`);
  }
  return match;
}
