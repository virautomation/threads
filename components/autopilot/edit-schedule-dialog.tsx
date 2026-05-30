"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

const SEP = "\n---\n";

/** ISO (UTC) → value for <input type="datetime-local"> in the browser's local tz. */
function isoToLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EditScheduleDialog({
  scheduleId,
  topic,
  segments,
  scheduleAt,
}: {
  scheduleId: string;
  topic: string | null;
  segments: string[];
  scheduleAt: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(segments.join(SEP));
  const [when, setWhen] = useState(isoToLocalInput(scheduleAt));

  async function onSave() {
    const parts = text
      .split(/\n-{3,}\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) {
      toast.error("Konten kosong");
      return;
    }
    const iso = new Date(when).toISOString();
    setLoading(true);
    try {
      const res = await fetch("/api/repliz/schedule-update", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scheduleId, segments: parts, scheduleAt: iso, topic }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "update_failed");
      toast.success("Jadwal diperbarui");
      setOpen(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal memperbarui");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit jadwal{topic ? ` — ${topic}` : ""}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="when">Waktu tayang</Label>
            <Input
              id="when"
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Konten (pisahkan tiap part dengan baris `---`)</Label>
            <Textarea
              id="text"
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Maks 500 karakter per part. Perubahan teks akan dicek ulang oleh safety critic.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button onClick={onSave} disabled={loading}>
              {loading ? "Menyimpan…" : "Simpan"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
