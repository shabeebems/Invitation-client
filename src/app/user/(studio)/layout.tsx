import AccountShell from "@/components/account/AccountShell";

export default function UserStudioLayout({ children }: { children: React.ReactNode }) {
  return <AccountShell>{children}</AccountShell>;
}
