import Link from "next/link";
import { getCurrentUser } from "@/lib/user";
import { getSyncState } from "@/lib/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DisconnectButton } from "@/components/settings/disconnect-button";
import { SyncButton } from "@/components/dashboard/sync-button";
import { formatDateTime } from "@/lib/utils";
import { Plug, ShieldCheck, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { error?: string; connected?: string; uid?: string };
}) {
  const user = await getCurrentUser().catch(() => null);
  const sync = user ? await getSyncState(user.id) : null;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Kelola koneksi Threads dan sync.</p>
      </div>

      {searchParams.error && (
        <Card className="border-destructive/50">
          <CardContent className="pt-6 flex items-start gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
            <div>
              <div className="font-medium">OAuth error</div>
              <div className="text-muted-foreground">{decodeURIComponent(searchParams.error)}</div>
            </div>
          </CardContent>
        </Card>
      )}
      {searchParams.connected && user && (
        <Card className="border-emerald-500/50">
          <CardContent className="pt-6 flex items-start gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-500 mt-0.5" />
            <div className="font-medium">Akun terhubung.</div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Akun Threads</CardTitle>
          <CardDescription>Akun yang sedang terhubung.</CardDescription>
        </CardHeader>
        <CardContent>
          {!user ? (
            <Button asChild>
              <Link href="/api/auth/threads">
                <Plug className="h-4 w-4" /> Connect Threads
              </Link>
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                {user.threads_profile_picture_url && (
                  <AvatarImage src={user.threads_profile_picture_url} alt={user.username ?? ""} />
                )}
                <AvatarFallback>{(user.username ?? "?").slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{user.name ?? user.username ?? "—"}</div>
                <div className="text-sm text-muted-foreground">@{user.username ?? user.threads_user_id}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Token expires: {formatDateTime(user.token_expires_at)}
                </div>
                <div className="flex gap-1 mt-2">
                  {(user.scopes ?? []).map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>
              <DisconnectButton />
            </div>
          )}
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Sync</CardTitle>
            <CardDescription>Status sync dan trigger manual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Status" value={sync?.status ?? "idle"} />
              <Stat label="Posts synced" value={String(sync?.posts_synced ?? 0)} />
              <Stat label="Last started" value={formatDateTime(sync?.last_started_at)} />
              <Stat label="Last succeeded" value={formatDateTime(sync?.last_succeeded_at)} />
              <Stat label="Next scheduled" value={formatDateTime(sync?.next_scheduled_at)} />
              <Stat label="Last error" value={sync?.last_error ?? "—"} />
            </div>
            <div className="flex gap-2 pt-2">
              <SyncButton />
              <SyncButton full />
            </div>
            <p className="text-xs text-muted-foreground">
              Cron berjalan tiap 6 jam (Vercel Cron). Manual sync incremental sampai ketemu 20 post yang
              sudah dikenal. Full sync mengulang semua post + refresh insights.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
