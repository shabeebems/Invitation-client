"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "@/lib/session";
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

export default function UseTemplateBar({ slug }: { slug: string }) {
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <header className="pv-bar">
      <div className="pv-bar-inner">
        <Link
          href={isAdmin ? "/admin/templates" : "/#templates"}
          className="pv-back"
          aria-label="Back to templates"
        >
          <BackIcon />
        </Link>

        <Link href={`/user/use/${slug}`} className="pv-use">
          Use this
          <ArrowIcon />
        </Link>
      </div>
    </header>
  );
}
