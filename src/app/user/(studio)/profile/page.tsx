import type { Metadata } from "next";
import ProfileSettings from "@/components/profile/ProfileSettings";

export const metadata: Metadata = {
  title: "Profile — Save the Kath",
};

export default function AccountProfilePage() {
  return <ProfileSettings />;
}
