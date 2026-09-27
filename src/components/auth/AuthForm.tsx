"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type: "standard";
              theme: "outline";
              size: "large";
              text: "continue_with";
              shape: "pill";
              width: number;
              logo_alignment: "center";
            }
          ) => void;
        };
      };
    };
  }
}

type Mode = "login" | "signup";

type Fields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-accent";

const passwordInputClass =
  "w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pr-12 text-sm text-zinc-900 outline-none transition focus:border-accent";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" />
        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9.5 4.2 11 7-1 1.8-2.4 3.5-4.2 4.7" />
        <path d="M6.1 6.1C4.2 7.4 2.7 9.2 1.5 12c1.5 2.8 5.5 7 10.5 7 1.2 0 2.3-.2 3.3-.6" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

let googleInitialized = false;

export default function AuthForm({ mode }: { mode: Mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const onGoogleCredential = useRef<(credential: string) => void>(() => {});

  onGoogleCredential.current = async (credential) => {
    try {
      const result = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = (await result.json()) as {
        success?: boolean;
        message?: string;
        user?: { role?: string };
      };

      if (!result.ok || !data.success) {
        throw new Error(data.message || "Could not continue");
      }

      router.push(data.user?.role === "admin" ? "/admin/dashboard" : "/");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not continue");
    }
  };

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const parent = googleButtonRef.current;

    if (!clientId || !parent) {
      return;
    }

    let cancelled = false;

    function renderGoogleButton() {
      const host = googleButtonRef.current;

      if (cancelled || !host || !window.google?.accounts?.id) {
        return;
      }

      if (!googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: clientId!,
          callback: (response) => {
            void onGoogleCredential.current(response.credential);
          },
        });
        googleInitialized = true;
      }

      host.replaceChildren();
      window.google.accounts.id.renderButton(host, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        width: Math.min(Math.max(host.offsetWidth, 280), 400),
        logo_alignment: "center",
      });
    }

    if (window.google?.accounts?.id) {
      renderGoogleButton();
      return () => {
        cancelled = true;
      };
    }

    let script = document.getElementById("google-identity") as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = "google-identity";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", renderGoogleButton);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", renderGoogleButton);
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    const email = fields.email.trim();

    if (isSignup && !fields.name.trim()) {
      next.name = "Name is required";
    }

    if (!email) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email";
    }

    if (!fields.password) {
      next.password = "Password is required";
    } else if (isSignup && fields.password.length < 8) {
      next.password = "Use at least 8 characters";
    }

    if (isSignup && !fields.confirmPassword) {
      next.confirmPassword = "Confirm your password";
    } else if (isSignup && fields.confirmPassword !== fields.password) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    setFormError("");

    if (Object.keys(next).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email,
          password: fields.password,
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        user?: { role?: string };
      };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not continue");
      }

      router.push(data.user?.role === "admin" ? "/admin/dashboard" : "/");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not continue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[28px] bg-white px-8 py-10 shadow-sm">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        {isSignup
          ? "Start an invitation you can share with one link."
          : "Log in to open the invitations you have made."}
      </p>

      <div ref={googleButtonRef} className="mt-8 flex min-h-11 w-full justify-center [&>div]:w-full" />

      <div className="my-6 flex items-center gap-3 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
        <span className="h-px flex-1 bg-zinc-200" />
        or
        <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        {isSignup ? (
          <label className="text-sm font-semibold text-zinc-800">
            Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={fields.name}
              onChange={(event) => update("name", event.target.value)}
              className={inputClass}
            />
            {errors.name ? <span className="mt-1 block text-xs font-medium text-accent">{errors.name}</span> : null}
          </label>
        ) : null}

        <label className="text-sm font-semibold text-zinc-800">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
          />
          {errors.email ? <span className="mt-1 block text-xs font-medium text-accent">{errors.email}</span> : null}
        </label>

        <label className="text-sm font-semibold text-zinc-800">
          Password
          <span className="relative mt-1.5 block">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={fields.password}
              onChange={(event) => update("password", event.target.value)}
              className={passwordInputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-zinc-800"
            >
              <EyeIcon open={showPassword} />
            </button>
          </span>
          {errors.password ? (
            <span className="mt-1 block text-xs font-medium text-accent">{errors.password}</span>
          ) : null}
        </label>

        {isSignup ? (
          <label className="text-sm font-semibold text-zinc-800">
            Confirm password
            <span className="relative mt-1.5 block">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={fields.confirmPassword}
                onChange={(event) => update("confirmPassword", event.target.value)}
                className={passwordInputClass}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-zinc-800"
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </span>
            {errors.confirmPassword ? (
              <span className="mt-1 block text-xs font-medium text-accent">{errors.confirmPassword}</span>
            ) : null}
          </label>
        ) : null}

        {!isSignup ? (
          <Link href="/forgot-password" className="text-sm font-semibold text-accent hover:text-accent-hover">
            Forgot password
          </Link>
        ) : null}

        {formError ? <p className="text-sm font-medium text-accent">{formError}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {submitting ? "Please wait" : isSignup ? "Signup" : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-accent hover:text-accent-hover">
          {isSignup ? "Login" : "Signup"}
        </Link>
      </p>
    </div>
  );
}
