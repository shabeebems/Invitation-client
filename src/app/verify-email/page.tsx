"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SiteNav from "@/components/landing/SiteNav";
import { API_URL } from "@/lib/api";

const verifyRequests = new Map<string, Promise<string>>();

function verifyToken(token: string): Promise<string> {
  const existing = verifyRequests.get(token);

  if (existing) {
    return existing;
  }

  const request = fetch(`${API_URL}/api/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then(async (response) => {
      const data = (await response.json()) as { message?: string };
      return response.ok ? "Email verified." : data.message || "Verification failed";
    })
    .catch(() => "Verification failed");

  verifyRequests.set(token, request);
  return request;
}

function VerifyEmail() {
  const token = useSearchParams().get("token") || "";
  const [message, setMessage] = useState("Verifying email…");

  useEffect(() => {
    let active = true;

    if (!token) {
      setMessage("Verification link is missing.");
      return;
    }

    void verifyToken(token).then((next) => {
      if (active) {
        setMessage(next);
      }
    });

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <div className="rounded-[28px] bg-white px-8 py-10 shadow-sm">
      <h1 className="text-3xl font-extrabold tracking-tight">Email verification</h1>
      <p className="mt-4 text-sm text-zinc-600">{message}</p>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-accent">
        Back to home
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-full bg-page">
      <SiteNav />
      <main className="mx-auto max-w-md px-5 py-16">
        <Suspense>
          <VerifyEmail />
        </Suspense>
      </main>
    </div>
  );
}
