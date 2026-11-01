"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, type AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";
import { cormorant } from "@/lib/fonts";

type Gate = { status: "checking" } | { status: "verified" } | { status: "unverified"; user: AdminUser };

/** Holds editing back until the signed-in user has verified their email. */
export default function RequireVerifiedEmail({ children }: { children: React.ReactNode }) {
  const [gate, setGate] = useState<Gate>({ status: "checking" });
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);

  const check = useCallback(async () => {
    const user = await loadSession();
    return user && user.emailVerified === false ? user : null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    void check().then((unverified) => {
      if (!cancelled) {
        setGate(unverified ? { status: "unverified", user: unverified } : { status: "verified" });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [check]);

  useEffect(() => {
    if (gate.status !== "unverified") {
      return;
    }

    function recheckOnReturn() {
      if (document.visibilityState === "visible") {
        void check().then((unverified) => {
          if (!unverified) {
            setGate({ status: "verified" });
          }
        });
      }
    }

    document.addEventListener("visibilitychange", recheckOnReturn);
    return () => document.removeEventListener("visibilitychange", recheckOnReturn);
  }, [check, gate.status]);

  async function resend(email: string) {
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

      setNote(response.ok ? "Sent. The link expires in 1 hour." : data.message || "Could not send the email.");
    } catch {
      setNote("Could not send the email.");
    } finally {
      setSending(false);
    }
  }

  async function confirm() {
    setChecking(true);
    setNote("");
    const unverified = await check();
    setChecking(false);

    if (unverified) {
      setNote("Not verified yet. Open the link in your email, then try again.");
      return;
    }

    setGate({ status: "verified" });
  }

  if (gate.status === "verified") {
    return children;
  }

  if (gate.status === "checking") {
    return <div className="flex min-h-[60vh] items-center justify-center text-sm text-[#8d8f87]">Checking account…</div>;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F2E8] px-5 py-16">
      <div className="w-full max-w-md">
        <h1 className={`${cormorant.className} text-[2.1rem] leading-tight font-semibold text-[#173a2c]`}>
          Verify your email to start editing
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#686d65]">
          We sent a verification link to{" "}
          <span className="font-semibold text-[#173a2c]">{gate.user.email}</span>. Open it, then come back
          here to continue.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void confirm()}
            disabled={checking}
            className="h-[38px] rounded-md bg-[#173a2c] px-4 text-[13px] font-semibold text-[#fbf6ea] transition-colors hover:bg-[#245440] disabled:opacity-60"
          >
            {checking ? "Checking…" : "I've verified"}
          </button>
          <button
            type="button"
            onClick={() => void resend(gate.user.email)}
            disabled={sending}
            className="h-[38px] rounded-md border border-[#ddd1bb] px-4 text-[13px] font-semibold text-[#3a4a40] transition-colors hover:border-[#173a2c] hover:text-[#173a2c] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Resend email"}
          </button>
        </div>

        {note ? (
          <p className="mt-4 text-[13px] text-[#3a4a40]" role="status">
            {note}
          </p>
        ) : null}

        <Link
          href="/#templates"
          className="mt-8 inline-block text-[13px] font-semibold text-[#8d8f87] underline-offset-4 hover:text-[#173a2c] hover:underline"
        >
          Back to templates
        </Link>
      </div>
    </div>
  );
}
