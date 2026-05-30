"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AccountToggle({
  accountId,
  username,
  active,
}: {
  accountId: string;
  username: string;
  active: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onToggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/repliz/account-active", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, username, active: !active }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "update_failed");
      toast.success(!active ? `@${username} diaktifkan` : `@${username} dinonaktifkan`);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onToggle}
      disabled={loading}
    >
      {active ? "Aktif" : "Nonaktif"}
    </Button>
  );
}
