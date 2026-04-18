import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-12">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-sm text-muted-foreground">Halaman tidak ditemukan.</p>
      <Button asChild>
        <Link href="/">Kembali ke Dashboard</Link>
      </Button>
    </div>
  );
}
