"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import { ArrowIcon } from "./auth-icons";

type Result = { status: "pending" } | { status: "verified" } | { status: "failed"; message: string };

const verifyRequests = new Map<string, Promise<Result>>();

function verifyToken(token: string): Promise<Result> {
  const existing = verifyRequests.get(token);

  if (existing) {
    return existing;
  }

  const request = fetch(`${API_URL}/api/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then(async (response): Promise<Result> => {
      if (response.ok) {
        return { status: "verified" };
      }

      const data = (await response.json()) as { message?: string };
      const message = (data.message || "This verification link didn't work").trim();
      return { status: "failed", message: /[.!?]$/.test(message) ? message : `${message}.` };
    })
    .catch((): Result => ({ status: "failed", message: "We couldn't reach the server. Try the link again." }));

  verifyRequests.set(token, request);
  return request;
}

export default function VerifyEmailStatus() {
  const token = useSearchParams().get("token") || "";
  const [result, setResult] = useState<Result>({ status: "pending" });

  useEffect(() => {
    if (!token) {
      return;
    }

    let active = true;

    void verifyToken(token).then((next) => {
      if (active) {
        setResult(next);
      }
    });

    return () => {
      active = false;
    };
  }, [token]);

  const current: Result = token ? result : { status: "failed", message: "This verification link is incomplete." };

  if (current.status === "pending") {
    return (
      <div className="auth-panel" role="status">
        <h1 className={`auth-title ${cormorant.className}`}>Verifying your email</h1>
        <p className="auth-lead">This only takes a moment.</p>
      </div>
    );
  }

  if (current.status === "verified") {
    return (
      <div className="auth-panel" role="status">
        <h1 className={`auth-title ${cormorant.className}`}>Email verified</h1>
        <p className="auth-lead">You&apos;re all set. Pick a template and start your invitation.</p>
        <div className="auth-form auth-form--solo">
          <Link href="/#templates" className="auth-submit">
            <span>Browse templates</span>
            <ArrowIcon />
          </Link>
        </div>
        <p className="auth-note">
          <Link href="/user/invitations" className="auth-link">
            Go to My Invitations
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-panel" role="alert">
      <h1 className={`auth-title ${cormorant.className}`}>Link didn&apos;t work</h1>
      <p className="auth-lead">
        {current.message} Log in and use <strong>Verify email</strong> at the top of the page to get a new link.
      </p>
      <div className="auth-form auth-form--solo">
        <Link href="/login" className="auth-submit">
          <span>Log In</span>
          <ArrowIcon />
        </Link>
      </div>
      <p className="auth-note">
        <Link href="/" className="auth-link">
          Back to home
        </Link>
      </p>
    </div>
  );
}
