"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RequireUser } from "@/components/auth/GuestOnly";
import SiteNav from "@/components/landing/SiteNav";
import { API_URL, invitationLiveHref, type InvitationTemplate } from "@/lib/api";

function PublishedContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [work, setWork] = useState<InvitationTemplate | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(`${API_URL}/api/works/${slug}`, { credentials: "include" });
        const data = (await response.json()) as {
          success?: boolean;
          template?: InvitationTemplate;
          message?: string;
        };

        if (!response.ok || !data.success || !data.template) {
          throw new Error(data.message || "Invitation not found");
        }

        if (!cancelled) {
          setWork(data.template);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Invitation not found");
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const livePath = work ? invitationLiveHref(work) : `/${slug}`;
  const liveUrl =
    typeof window !== "undefined" ? `${window.location.origin}${livePath}` : livePath;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="min-h-full bg-page">
      <SiteNav />
      <main className="mx-auto w-full max-w-2xl px-6 py-14 md:px-10">
        <div className="rounded-[32px] border border-[#e8dfd0] bg-[#faf6ee] px-6 py-10 shadow-[0_16px_40px_rgba(20,48,39,0.08)] sm:px-10">
          {error ? (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Not found</h1>
              <p className="mt-3 text-sm text-zinc-600">{error}</p>
              <Link
                href="/account"
                className="mt-8 inline-flex rounded-full bg-[#143027] px-5 py-3 text-sm font-semibold text-[#f3ead8]"
              >
                View all my invitations
              </Link>
            </>
          ) : !work ? (
            <p className="text-sm text-zinc-500">Loading your invitation…</p>
          ) : (
            <>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#8a7048] uppercase">Published</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                Your invitation is live
              </h1>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Guests can open this link anytime. Share it on WhatsApp or copy it below.
              </p>

              <div className="mt-8 space-y-4 rounded-[24px] border border-[#e8dfd0] bg-white/70 px-5 py-5">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Title</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900">{work.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Occasion</p>
                  <p className="mt-1 text-sm font-medium text-zinc-800">
                    {work.categoryName || "Invitation"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Guest link</p>
                  <p className="mt-1 break-all text-sm font-medium text-[#143027]">{liveUrl}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void copyLink()}
                  className="rounded-full border border-[#143027]/20 px-5 py-3 text-sm font-semibold text-[#143027] hover:border-[#143027]"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
                <Link
                  href={livePath}
                  target="_blank"
                  className="rounded-full border border-[#143027]/20 px-5 py-3 text-center text-sm font-semibold text-[#143027] hover:border-[#143027]"
                >
                  Open invitation
                </Link>
                <Link
                  href="/account"
                  className="rounded-full bg-[#143027] px-5 py-3 text-center text-sm font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
                >
                  View all my invitations
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function PublishedPage() {
  return (
    <RequireUser>
      <PublishedContent />
    </RequireUser>
  );
}
