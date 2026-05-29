"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteScheduleButton({ scheduleId }: { scheduleId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("Hapus jadwal post ini dari Repliz?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/repliz/schedule-delete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scheduleId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "delete_failed");
      toast.success("Jadwal dihapus");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menghapus");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDelete} disabled={loading}>
      <Trash2 className="h-4 w-4 text-muted-foreground" />
    </Button>
  );
}
