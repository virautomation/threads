import { redirect } from "next/navigation";
import { countAdmins } from "@/lib/admin";
import { getSession } from "@/lib/session";
import { RegisterForm } from "@/components/auth/register-form";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  if (await getSession()) redirect("/");
  if ((await countAdmins()) > 0) redirect("/login");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Daftar Admin</h1>
          <p className="text-sm text-muted-foreground">
            Buat akun admin pertama. Setelah ini, pendaftaran ditutup.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
