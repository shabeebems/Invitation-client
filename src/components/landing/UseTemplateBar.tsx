"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { loadSession, loginHref } from "@/lib/session";
import "./landing.css";

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M19 12H6" strokeLinecap="round" />
      <path d="m11 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h13" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function syncPreviewChrome(inner: HTMLElement | null) {
  const root = document.documentElement;
  const fallback = window.matchMedia("(min-width: 640px)").matches ? 64 : 56;
  const height = Math.ceil(inner?.getBoundingClientRect().height || fallback);
  root.style.setProperty("--pv-chrome", `${height}px`);
  root.classList.add("has-pv-chrome");
}

export default function UseTemplateBar({ slug }: { slug: string }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    void loadSession().then((user) => {
      if (!cancelled) {
        setIsAdmin(user?.role === "admin");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const sync = () => syncPreviewChrome(innerRef.current);
    sync();
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("resize", sync);
      document.documentElement.style.removeProperty("--pv-chrome");
      document.documentElement.classList.remove("has-pv-chrome");
    };
  }, []);

  return (
    <header className="pv-bar">
      <div ref={innerRef} className="pv-bar-inner">
        <Link
          href={isAdmin ? "/admin/templates" : "/#templates"}
          className="pv-back"
          aria-label="Back to templates"
          suppressHydrationWarning
        >
          <BackIcon />
        </Link>

        <Link href={loginHref(`/user/use/${slug}`)} className="pv-use">
          Use this
          <ArrowIcon />
        </Link>
      </div>
    </header>
  );
}
