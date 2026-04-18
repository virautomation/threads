import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Plug } from "lucide-react";
import { getCurrentUser } from "@/lib/user";

export async function Topbar() {
  let user = null as Awaited<ReturnType<typeof getCurrentUser>>;
  try {
    user = await getCurrentUser();
  } catch {
    user = null;
  }

  return (
    <header className="flex h-14 items-center justify-between gap-2 border-b bg-background px-4 md:px-6">
      <div className="md:hidden font-semibold">ThreadLens</div>
      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <Link href="/settings" className="flex items-center gap-2 text-sm">
            <Avatar className="h-7 w-7">
              {user.threads_profile_picture_url && (
                <AvatarImage src={user.threads_profile_picture_url} alt={user.username ?? ""} />
              )}
              <AvatarFallback>{(user.username ?? "?").slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">@{user.username ?? user.threads_user_id}</span>
          </Link>
        ) : (
          <Button asChild size="sm">
            <Link href="/api/auth/threads">
              <Plug className="h-4 w-4" /> Connect Threads
            </Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
