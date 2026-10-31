"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

export default function VerifyEmailBanner({ email }: { email: string }) {
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  async function resend() {
    if (sending) {
      return;
    }

    setSending(true);
    setNote("");

    try {
      const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Could not send the email");
      }

      setNote("Verification email sent. The link expires in 1 hour.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Could not send the email");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="flex w-full items-center justify-between gap-3 px-6 py-2 md:px-10">
        <p className="text-xs font-medium text-amber-950">
          {note || "Verify your email to finish setting up your account."}
        </p>
        <button
          type="button"
          onClick={() => void resend()}
          disabled={sending}
          className="shrink-0 rounded-full bg-amber-950 px-3 py-1 text-xs font-semibold text-white disabled:opacity-60"
        >
          {sending ? "Sending…" : "Verify email"}
        </button>
      </div>
    </div>
  );
}
