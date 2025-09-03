import { Providers } from "@/app/providers";
import AuthGuard from "@/app/component/auth/AuthGuard";
import RoleGuard from "@/app/component/roles/RoleGuard";
import AdminShell from "@/app/component/admin/AdminShell";

export const metadata = {
  title: "Admin | Marcelex",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AuthGuard>
        <RoleGuard allow={["admin", "owner", "sysadmin"]}>
          <AdminShell>{children}</AdminShell>
        </RoleGuard>
      </AuthGuard>
 

   </Providers>
  );
}
