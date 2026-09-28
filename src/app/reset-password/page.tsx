"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SiteNav from "@/components/landing/SiteNav";
import { API_URL } from "@/lib/api";

function ResetForm() {
  const token = useSearchParams().get("token") || "";
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setError(data.message || "Could not reset password");
      return;
    }

    router.replace("/login");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white px-8 py-10 shadow-sm">
      <h1 className="text-3xl font-extrabold tracking-tight">Choose a new password</h1>
      <label className="mt-6 block text-sm font-semibold">
        New password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1.5 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm"
        />
      </label>
      {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
      <button type="submit" className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-white">
        Update password
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-full bg-page">
      <SiteNav />
      <main className="mx-auto max-w-md px-5 py-16">
        <Suspense>
          <ResetForm />
        </Suspense>
      </main>
    </div>
  );
}
