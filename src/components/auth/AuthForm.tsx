"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import { loginHref, safeNextPath, signupHref } from "@/lib/session";
import AuthField from "./AuthField";
import { ArrowIcon, EyeIcon, GoogleMark, LockIcon, MailIcon, UserIcon } from "./auth-icons";

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

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

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
  const nextPathRef = useRef("");
  const [nextPath, setNextPath] = useState("");
  const onGoogleCredential = useRef<(credential: string) => void>(() => {});
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const path = safeNextPath(new URLSearchParams(window.location.search).get("next"));
    nextPathRef.current = path;
    setNextPath(path);
  }, []);

  function afterAuth(role?: string) {
    const next = nextPathRef.current;
    if (next) {
      if (role === "admin" && (next === "/user" || next.startsWith("/user/"))) {
        router.push("/admin/dashboard");
        return;
      }
      if (role !== "admin" && (next === "/admin" || next.startsWith("/admin/"))) {
        router.push("/user/invitations");
        return;
      }
      router.push(next);
      return;
    }

    router.push(role === "admin" ? "/admin/dashboard" : "/user/invitations");
  }

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

      afterAuth(data.user?.role);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not continue");
    }
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return;
    }

    let cancelled = false;

    function ready() {
      const host = googleButtonRef.current;

      if (cancelled || !host || !window.google?.accounts?.id) {
        return;
      }

      if (!googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID!,
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
        width: Math.min(Math.max(host.offsetWidth || host.parentElement?.clientWidth || 280, 240), 400),
        logo_alignment: "center",
      });
    }

    if (window.google?.accounts?.id) {
      ready();
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

    script.addEventListener("load", ready);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", ready);
    };
  }, []);

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

      afterAuth(data.user?.role);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not continue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-panel">
      <h1 className={`auth-title ${cormorant.className}`}>
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="auth-lead">
        {isSignup
          ? "Start an invitation you can share with one link."
          : "Log in to open the invitations you have made."}
      </p>

      {GOOGLE_CLIENT_ID ? (
        <div className="auth-google">
          <span className="auth-google-face" aria-hidden="true">
            <GoogleMark />
            Continue with Google
          </span>
          <div ref={googleButtonRef} className="auth-google-host" />
        </div>
      ) : null}

      {GOOGLE_CLIENT_ID ? <div className="auth-rule">or</div> : null}

      <form onSubmit={onSubmit} noValidate className="auth-form">
        {isSignup ? (
          <AuthField
            label="Name"
            name="name"
            autoComplete="name"
            icon={<UserIcon />}
            value={fields.name}
            placeholder="Enter your name"
            error={errors.name}
            onChange={(value) => update("name", value)}
          />
        ) : null}

        <AuthField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          icon={<MailIcon />}
          value={fields.email}
          placeholder="Enter your email"
          error={errors.email}
          onChange={(value) => update("email", value)}
        />

        <AuthField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          icon={<LockIcon />}
          value={fields.password}
          placeholder={isSignup ? "Create a password" : "Enter your password"}
          error={errors.password}
          onChange={(value) => update("password", value)}
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

        {isSignup ? (
          <AuthField
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            autoComplete="new-password"
            icon={<LockIcon />}
            value={fields.confirmPassword}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            onChange={(value) => update("confirmPassword", value)}
            trailing={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="auth-eye"
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            }
          />
        ) : (
          <div className="auth-forgot">
            <Link href="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>
        )}

        {formError ? <p className="auth-error">{formError}</p> : null}

        <button type="submit" disabled={submitting} className="auth-submit">
          <span>{submitting ? "Please wait" : isSignup ? "Sign Up" : "Log In"}</span>
          {submitting ? null : <ArrowIcon />}
        </button>
      </form>

      <p className="auth-note">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link href={isSignup ? loginHref(nextPath) : signupHref(nextPath)} className="auth-link">
          {isSignup ? "Log In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
}
