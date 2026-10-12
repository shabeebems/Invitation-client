import { redirect } from "next/navigation";

export default function AccountProfileRedirectPage() {
  redirect("/user/profile");
}
