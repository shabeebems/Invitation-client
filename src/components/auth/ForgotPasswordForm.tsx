"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import AuthField from "./AuthField";
import { ArrowIcon, MailIcon } from "./auth-icons";

const SUCCESS_MESSAGE =
  "If an account exists for that email, we sent a reset link. It expires in 1 hour.";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !data.success) {
      setError(data.message || "Could not send reset email");
      return;
    }

    setMessage(data.message || SUCCESS_MESSAGE);
  }

  return (
    <form onSubmit={onSubmit} className="auth-panel">
      <h1 className={`auth-title ${cormorant.className}`}>Forgot password</h1>
      <p className="auth-lead">We will email a link to reset your password.</p>

      <div className="auth-form auth-form--solo">
        <AuthField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          icon={<MailIcon />}
          value={email}
          placeholder="Enter your email"
          onChange={setEmail}
        />

        {message ? <p className="auth-success">{message}</p> : null}
        {error ? <p className="auth-error">{error}</p> : null}

        <button type="submit" className="auth-submit">
          <span>Send reset link</span>
          <ArrowIcon />
        </button>
      </div>

      <p className="auth-note">
        Remember it?{" "}
        <Link href="/login" className="auth-link">
          Log In
        </Link>
      </p>
    </form>
  );
}
