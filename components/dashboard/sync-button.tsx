"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function SyncButton({ full = false }: { full?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  async function run() {
    setBusy(true);
    try {
      const res = await fetch(`/api/sync${full ? "?full=1" : ""}`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Sync failed");
      } else {
        toast.success(
          `Sync selesai: ${json.posts_seen} post, ${json.insights_refreshed} insights`,
        );
        startTransition(() => router.refresh());
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sync error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button onClick={run} disabled={busy} variant="outline" size="sm">
      <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
      {busy ? "Syncing…" : full ? "Full sync" : "Sync now"}
    </Button>
  );
}
