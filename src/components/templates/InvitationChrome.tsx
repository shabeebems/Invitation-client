import { invitationFontsClassName } from "@/lib/template-fonts";

/** Shared font variables for invitation routes; template CSS loads with each design chunk. */
export default function InvitationChrome({ children }: { children: React.ReactNode }) {
  return <div className={invitationFontsClassName}>{children}</div>;
}
