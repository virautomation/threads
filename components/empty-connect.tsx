import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plug } from "lucide-react";

export function EmptyConnect({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{title ?? "Belum terkoneksi ke Threads"}</CardTitle>
          <CardDescription>
            {description ??
              "Hubungkan akun Threads kamu untuk mulai sync data dan menjalankan analisa AI."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/api/auth/threads">
              <Plug className="h-4 w-4" /> Connect Threads
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
