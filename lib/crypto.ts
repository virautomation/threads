import crypto from "crypto";
import { env } from "./env";

// AES-256-GCM. Key must be 32 bytes (64 hex chars).
const ALGO = "aes-256-gcm";

function getKey(): Buffer {
  const hex = env.tokenEncryptionKey();
  if (hex.length !== 64) {
    throw new Error("TOKEN_ENCRYPTION_KEY must be 32-byte hex (64 chars). Generate: openssl rand -hex 32");
  }
  return Buffer.from(hex, "hex");
}

export function encryptToken(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("hex"), tag.toString("hex"), ciphertext.toString("hex")].join(":");
}

export function decryptToken(payload: string): string {
  const [ivHex, tagHex, ctHex] = payload.split(":");
  if (!ivHex || !tagHex || !ctHex) throw new Error("Malformed encrypted token");
  const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));
  const pt = Buffer.concat([decipher.update(Buffer.from(ctHex, "hex")), decipher.final()]);
  return pt.toString("utf8");
}
