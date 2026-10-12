import AccountShell from "@/components/account/AccountShell";
import { RequireCustomer } from "@/components/auth/GuestOnly";

export default function UserStudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireCustomer>
      <AccountShell>{children}</AccountShell>
    </RequireCustomer>
  );
}
