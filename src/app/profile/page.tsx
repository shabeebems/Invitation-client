import type { Metadata } from "next";
import SiteNav from "@/components/landing/SiteNav";
import AccountSecurity from "@/components/profile/AccountSecurity";
import ProfileCard from "@/components/profile/ProfileCard";

export const metadata: Metadata = {
  title: "Profile — Inviteo",
};

export default function ProfilePage() {
  return (
    <div className="min-h-full bg-page">
      <SiteNav />
      <main className="mx-auto max-w-lg px-5 py-16">
        <ProfileCard />
        <AccountSecurity />
      </main>
    </div>
  );
}
