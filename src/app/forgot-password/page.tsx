"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/landing/SiteNav";
import { API_URL } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [missingAccount, setMissingAccount] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setMissingAccount(false);
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await response.json()) as { success?: boolean; message?: string; code?: string };

    if (!response.ok || !data.success) {
      setMissingAccount(data.code === "NOT_FOUND");
      setError(data.message || "Could not send reset email");
      return;
    }

    setMessage(data.message || "We sent a reset link to this email. It expires in 1 hour.");
  }

  return (
    <div className="min-h-full bg-page">
      <SiteNav />
      <main className="mx-auto max-w-md px-5 py-16">
        <form onSubmit={onSubmit} className="rounded-[28px] bg-white px-8 py-10 shadow-sm">
          <h1 className="text-3xl font-extrabold tracking-tight">Reset password</h1>
          <p className="mt-2 text-sm text-zinc-500">We will email a link to reset your password.</p>
          <label className="mt-6 block text-sm font-semibold">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm"
            />
          </label>
          {message ? <p className="mt-4 text-sm text-zinc-700">{message}</p> : null}
          {error ? (
            <p className="mt-4 text-sm font-medium text-accent">
              {error}{" "}
              {missingAccount ? (
                <Link href="/signup" className="font-semibold underline">
                  Sign up
                </Link>
              ) : null}
            </p>
          ) : null}
          <button type="submit" className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-white">
            Send reset link
          </button>
          <Link href="/login" className="mt-4 block text-center text-sm font-semibold text-accent">
            Back to login
          </Link>
        </form>
      </main>
    </div>
  );
}
