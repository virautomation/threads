"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download, ExternalLink } from "lucide-react";
import { formatDate, formatNumber, formatPercent, truncate } from "@/lib/utils";
import type { PostRow } from "@/lib/queries";

type SortKey = "published_at" | "views" | "likes" | "replies" | "reposts" | "engagement_rate";

export function PostTable({ rows }: { rows: PostRow[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("published_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let out = rows;
    if (q) out = out.filter((r) => (r.text ?? "").toLowerCase().includes(q));
    out = [...out].sort((a, b) => {
      const av = sortVal(a, sortKey);
      const bv = sortVal(b, sortKey);
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return out;
  }, [rows, query, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function exportCsv() {
    const header = [
      "published_at", "permalink", "text",
      "views", "likes", "replies", "reposts", "quotes", "shares", "engagement_rate",
    ];
    const escape = (s: any) => `"${String(s ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;
    const lines = [header.join(",")];
    for (const r of filtered) {
      lines.push([
        r.published_at,
        r.permalink ?? "",
        r.text ?? "",
        r.insights?.views ?? 0,
        r.insights?.likes ?? 0,
        r.insights?.replies ?? 0,
        r.insights?.reposts ?? 0,
        r.insights?.quotes ?? 0,
        r.insights?.shares ?? 0,
        Number(r.insights?.engagement_rate ?? 0).toFixed(4),
      ].map(escape).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `threads-posts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Cari teks post…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto text-sm text-muted-foreground">
          {filtered.length} dari {rows.length} post
        </div>
        <Button onClick={exportCsv} variant="outline" size="sm">
          <Download className="h-4 w-4" /> CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[280px]">Post</TableHead>
              <SortHead onClick={() => toggleSort("published_at")} active={sortKey === "published_at"}>Tanggal</SortHead>
              <SortHead onClick={() => toggleSort("views")} active={sortKey === "views"} right>Views</SortHead>
              <SortHead onClick={() => toggleSort("likes")} active={sortKey === "likes"} right>Likes</SortHead>
              <SortHead onClick={() => toggleSort("replies")} active={sortKey === "replies"} right>Replies</SortHead>
              <SortHead onClick={() => toggleSort("reposts")} active={sortKey === "reposts"} right>Reposts</SortHead>
              <SortHead onClick={() => toggleSort("engagement_rate")} active={sortKey === "engagement_rate"} right>ER</SortHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  Tidak ada post.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <Link
                    href={`/posts/${r.id}`}
                    className="underline underline-offset-2 decoration-muted-foreground/40 hover:decoration-foreground"
                  >
                    {truncate(r.text, 110) || "(tanpa teks)"}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(r.published_at)}
                </TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(r.insights?.views)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(r.insights?.likes)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(r.insights?.replies)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(r.insights?.reposts)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatPercent(r.insights?.engagement_rate)}</TableCell>
                <TableCell>
                  {r.permalink && (
                    <a href={r.permalink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function SortHead({
  children,
  onClick,
  active,
  right,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  right?: boolean;
}) {
  return (
    <TableHead className={right ? "text-right" : ""}>
      <button onClick={onClick} className={`inline-flex items-center gap-1 ${active ? "text-foreground" : ""}`}>
        {children}
        <ArrowUpDown className="h-3 w-3" />
      </button>
    </TableHead>
  );
}

function sortVal(r: PostRow, key: SortKey): number {
  if (key === "published_at") return new Date(r.published_at).getTime();
  return Number(r.insights?.[key as keyof NonNullable<PostRow["insights"]>] ?? 0);
}
