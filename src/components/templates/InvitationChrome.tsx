import { invitationFontsClassName } from "@/lib/template-fonts";
import "@/styles/templates/royal-reception.css";
import "@/styles/templates/house-warming.css";
import "@/styles/templates/velvet-heritage.css";
import "@/styles/templates/botanical-script.css";
import "@/styles/templates/royal-ruby.css";
import "@/styles/templates/aurelia-nocturne.css";
import "@/styles/templates/cream-editorial.css";

export default function InvitationChrome({ children }: { children: React.ReactNode }) {
  return <div className={invitationFontsClassName}>{children}</div>;
}
