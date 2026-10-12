import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import AccountSecurity from "@/components/profile/AccountSecurity";
import ProfileCard from "@/components/profile/ProfileCard";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Profile — Inviteo",
};

export default function AccountProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[#8a7048] uppercase">Account</p>
        <h1 className={`${display.className} mt-1 text-3xl font-medium tracking-tight text-[#143027] sm:text-4xl`}>
          Profile & security
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
          Review your details and manage password and signed-in devices.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <ProfileCard />
        <AccountSecurity />
      </div>
    </div>
  );
}
