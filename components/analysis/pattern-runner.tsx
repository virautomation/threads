"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Markdown } from "@/lib/markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function PatternRunner() {
  const [busy, setBusy] = useState(false);
  const [period, setPeriod] = useState("30");
  const [sample, setSample] = useState("20");
  const [output, setOutput] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setOutput(null);
    try {
      const res = await fetch(`/api/analysis/pattern`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ period_days: Number(period), sample_size: Number(sample) }),
      });
      const json = await res.json();
      if (!res.ok) toast.error(json.error ?? "Pattern analysis failed");
      else setOutput(json.output);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  function downloadMd() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `threadlens-pattern-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Periode</label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 hari</SelectItem>
              <SelectItem value="30">30 hari</SelectItem>
              <SelectItem value="90">90 hari</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Sample (top + bottom)</label>
          <Select value={sample} onValueChange={setSample}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 + 10</SelectItem>
              <SelectItem value="20">20 + 20</SelectItem>
              <SelectItem value="30">30 + 30</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={run} disabled={busy}>
          <Sparkles className="h-4 w-4" />
          {busy ? "Menganalisa…" : "Generate Pattern Report"}
        </Button>
        {output && (
          <Button variant="outline" onClick={downloadMd}>
            <Download className="h-4 w-4" /> Markdown
          </Button>
        )}
      </div>

      {output && (
        <Card>
          <CardHeader><CardTitle className="text-base">Pattern Report</CardTitle></CardHeader>
          <CardContent><Markdown source={output} /></CardContent>
        </Card>
      )}
    </div>
  );
}
