import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import VerifyEmailStatus from "@/components/auth/VerifyEmailStatus";

export const metadata: Metadata = {
  title: "Verify email — Save the Kath",
};

export default function VerifyEmailPage() {
  return (
    <AuthShell>
      <Suspense>
        <VerifyEmailStatus />
      </Suspense>
    </AuthShell>
  );
}
