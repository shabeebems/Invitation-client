import { RequireCustomer } from "@/components/auth/GuestOnly";

export default function UserFlowLayout({ children }: { children: React.ReactNode }) {
  return <RequireCustomer>{children}</RequireCustomer>;
}
