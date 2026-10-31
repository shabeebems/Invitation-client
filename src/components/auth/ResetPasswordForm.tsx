"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import AuthField from "./AuthField";
import { ArrowIcon, EyeIcon, LockIcon } from "./auth-icons";

function ResetForm() {
  const token = useSearchParams().get("token") || "";
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <form onSubmit={onSubmit} className="auth-panel">
      <h1 className={`auth-title ${cormorant.className}`}>Choose a new password</h1>
      <p className="auth-lead">Enter a new password for your account.</p>

      <div className="auth-form auth-form--solo">
        <AuthField
          label="New password"
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="new-password"
          icon={<LockIcon />}
          value={password}
          placeholder="Create a password"
          error={error}
          onChange={setPassword}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="auth-eye"
            >
              <EyeIcon open={showPassword} />
            </button>
          }
        />

        <button type="submit" className="auth-submit">
          <span>Update password</span>
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense>
      <ResetForm />
    </Suspense>
  );
}
