"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import {
  API_URL,
  invitationLiveHref,
  invitationPreviewHref,
  imageUrl,
  type InvitationTemplate,
} from "@/lib/api";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

function SkeletonRow() {
  return (
    <div className="flex animate-pulse gap-4 rounded-3xl border border-[#ebe7df] bg-white p-4 sm:items-center">
      <div className="h-28 w-full rounded-2xl bg-[#efece6] sm:h-24 sm:w-24" />
      <div className="hidden flex-1 space-y-3 sm:block">
        <div className="h-3 w-24 rounded bg-[#efece6]" />
        <div className="h-5 w-48 rounded bg-[#efece6]" />
        <div className="h-3 w-32 rounded bg-[#efece6]" />
      </div>
      <div className="hidden gap-2 sm:flex">
        <div className="h-9 w-16 rounded-full bg-[#efece6]" />
        <div className="h-9 w-16 rounded-full bg-[#efece6]" />
      </div>
    </div>
  );
}

export default function AccountWorksPage() {
  const [works, setWorks] = useState<InvitationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedSlug, setCopiedSlug] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_URL}/api/works`, { credentials: "include" });
        const data = (await response.json()) as {
          success?: boolean;
          works?: InvitationTemplate[];
          message?: string;
        };

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Could not load invitations");
        }

        setWorks(data.works || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load invitations");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const work of works) {
      if (work.categoryId && work.categoryName) {
        seen.set(work.categoryId, work.categoryName);
      }
    }
    return [...seen.entries()].map(([id, name]) => ({ id, name }));
  }, [works]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return works.filter((work) => {
      if (selectedCategory !== "all" && work.categoryId !== selectedCategory) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return (
        work.name.toLowerCase().includes(needle) ||
        work.slug.toLowerCase().includes(needle) ||
        (work.categoryName || "").toLowerCase().includes(needle)
      );
    });
  }, [works, query, selectedCategory]);

  const liveUrl = (work: InvitationTemplate) => {
    const path = invitationLiveHref(work);
    return typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
  };

  async function copyLink(work: InvitationTemplate) {
    try {
      await navigator.clipboard.writeText(liveUrl(work));
      setCopiedSlug(work.slug);
      window.setTimeout(() => setCopiedSlug(""), 1800);
    } catch {
      setCopiedSlug("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#8a7048] uppercase">
            Dashboard
          </p>
          <h1 className={`${display.className} mt-1 text-3xl font-medium tracking-tight text-[#143027] sm:text-4xl`}>
            My invitations
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Edit designs, copy guest links, and manage every celebration from one place.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-[#143027] ring-1 ring-[#e8e4dc]">
            {loading ? "…" : works.length} total
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-[#143027] ring-1 ring-[#e8e4dc]">
            {loading ? "…" : categories.length} occasions
          </span>
        </div>
      </div>

      <Link
        href="/#templates"
        className="group flex flex-col gap-4 rounded-[28px] border border-dashed border-[#c4a574]/70 bg-gradient-to-br from-[#143027] to-[#1c4034] px-6 py-6 text-white shadow-[0_18px_40px_rgba(20,48,39,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(20,48,39,0.24)] sm:flex-row sm:items-center sm:justify-between sm:px-8"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d6c4a2] text-2xl font-semibold text-[#143027]">
            +
          </span>
          <div>
            <p className={`${display.className} text-2xl font-medium tracking-tight`}>
              Create new invitation
            </p>
            <p className="mt-1 text-sm text-white/65">
              Choose a template, edit every detail, and publish one guest-ready link.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center justify-center rounded-full bg-[#d6c4a2] px-5 py-2.5 text-sm font-semibold text-[#143027] group-hover:bg-[#e6d7bb]">
          Browse templates
        </span>
      </Link>

      <section className="overflow-hidden rounded-[28px] border border-[#ebe7df] bg-white shadow-[0_12px_32px_rgba(20,48,39,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#f0ece4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase ${
                selectedCategory === "all"
                  ? "bg-[#143027] text-[#f3ead8]"
                  : "bg-[#f7f6f3] text-zinc-600 hover:bg-[#efece6]"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase ${
                  selectedCategory === category.id
                    ? "bg-[#143027] text-[#f3ead8]"
                    : "bg-[#f7f6f3] text-zinc-600 hover:bg-[#efece6]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:max-w-xs">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search invitations"
              className="w-full rounded-full border border-[#ebe7df] bg-[#f7f6f3] py-2.5 pr-4 pl-9 text-sm outline-none placeholder:text-zinc-400 focus:border-[#c4a574] focus:bg-white"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {loading ? (
            <div className="space-y-3">
              <SkeletonRow />
              <SkeletonRow />
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-red-50 px-5 py-10 text-center text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : works.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[#d9d2c5] bg-[#f7f6f3] px-6 py-16 text-center">
              <p className={`${display.className} text-3xl text-[#143027]`}>No invitations yet</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-500">
                Start from a template, personalize the details, and publish a shareable guest link.
              </p>
              <Link
                href="/#templates"
                className="mt-6 inline-flex rounded-full bg-[#143027] px-5 py-3 text-sm font-semibold text-[#f3ead8]"
              >
                Create your first invitation
              </Link>
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl bg-[#f7f6f3] px-5 py-10 text-center">
              <p className="text-sm font-semibold text-zinc-800">No invitations match this filter</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-sm font-semibold text-[#143027]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {visible.map((work) => {
                const hero = imageUrl(work.images, "hero");
                const house = /house\s*warm/i.test(work.categoryName || "");

                return (
                  <li
                    key={work.id}
                    className="group rounded-[24px] border border-[#ebe7df] bg-[#fcfbf9] p-3.5 transition hover:border-[#d6c4a2] hover:bg-white hover:shadow-[0_14px_34px_rgba(20,48,39,0.08)] sm:p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div
                        className={`h-40 w-full shrink-0 overflow-hidden rounded-2xl sm:h-[92px] sm:w-[92px] ${
                          house ? "bg-[#fbf7f2]" : "bg-[#1a060c]"
                        }`}
                      >
                        {hero ? (
                          <img
                            src={hero}
                            alt=""
                            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#efe8db] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#8a7048] uppercase">
                            {work.categoryName || "Invitation"}
                          </span>
                          <span className="rounded-full bg-[#e8f2ec] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#143027] uppercase">
                            Live
                          </span>
                        </div>
                        <h2 className={`${display.className} mt-2 truncate text-xl font-medium text-[#143027]`}>
                          {work.name}
                        </h2>
                        <p className="mt-1 truncate font-mono text-xs text-zinc-400">
                          {liveUrl(work)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <Link
                          href={`${invitationPreviewHref(work)}/edit`}
                          className="rounded-full bg-[#143027] px-4 py-2 text-xs font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
                        >
                          Edit
                        </Link>
                        <Link
                          href={invitationLiveHref(work)}
                          target="_blank"
                          className="rounded-full border border-[#ddd6ca] bg-white px-4 py-2 text-xs font-semibold text-[#143027] hover:border-[#c4a574]"
                        >
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => void copyLink(work)}
                          className="rounded-full border border-[#ddd6ca] bg-white px-4 py-2 text-xs font-semibold text-[#143027] hover:border-[#c4a574]"
                        >
                          {copiedSlug === work.slug ? "Copied" : "Copy link"}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
