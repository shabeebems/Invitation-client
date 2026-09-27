import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";
import GuestOnly from "@/components/auth/GuestOnly";
import SiteNav from "@/components/landing/SiteNav";

export const metadata: Metadata = {
  title: "Login — Inviteo",
};

export default function LoginPage() {
  return (
    <GuestOnly>
      <div className="min-h-full bg-page">
        <SiteNav />
        <main className="mx-auto max-w-md px-5 py-16">
          <AuthForm mode="login" />
        </main>
      </div>
    </GuestOnly>
  );
}
