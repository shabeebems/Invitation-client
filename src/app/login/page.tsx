import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";
import AuthShell from "@/components/auth/AuthShell";
import GuestOnly from "@/components/auth/GuestOnly";

export const metadata: Metadata = {
  title: "Login — Save the Kath",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <GuestOnly>
        <AuthForm mode="login" />
      </GuestOnly>
    </AuthShell>
  );
}
