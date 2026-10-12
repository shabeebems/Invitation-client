import { RequireAdmin } from "@/components/auth/GuestOnly";
import InvitationChrome from "@/components/templates/InvitationChrome";

export default function AdminCanvasLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAdmin>
      <InvitationChrome>{children}</InvitationChrome>
    </RequireAdmin>
  );
}
