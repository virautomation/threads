"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Markdown } from "@/lib/markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function PerformanceButton({ postId }: { postId: string }) {
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setOutput(null);
    try {
      const res = await fetch(`/api/analysis/performance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Analysis failed");
      } else {
        setOutput(json.output);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Analysis error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button onClick={run} disabled={busy}>
        <Sparkles className="h-4 w-4" />
        {busy ? "Menganalisa…" : "Analisa dengan AI"}
      </Button>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Markdown source={output} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
