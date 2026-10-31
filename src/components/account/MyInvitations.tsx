"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  API_URL,
  imageUrl,
  invitationEditHref,
  invitationLiveHref,
  invitationPreviewHref,
  type InvitationTemplate,
} from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import "./my-invitations.css";

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
    </svg>
  );
}

function TemplateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M4 9.5h16M9.5 9.5V20" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5.5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="18.5" r="1.6" />
    </svg>
  );
}

function thumbFor(work: InvitationTemplate) {
  const url = imageUrl(work.images, "hero") || work.images?.[0]?.url || "";

  return url.includes("/image/upload/")
    ? url.replace("/image/upload/", "/image/upload/c_fill,g_auto,w_320,h_150,q_auto,f_auto/")
    : url;
}

function dateFor(work: InvitationTemplate) {
  const value = work.publishedAt || work.updatedAt || work.createdAt;
  const date = value ? new Date(value) : null;

  return date && !Number.isNaN(date.getTime()) ? DATE_FORMAT.format(date) : "";
}

function SkeletonRow() {
  return (
    <li className="mi-row mi-row--skeleton" aria-hidden="true">
      <span className="mi-thumb" />
      <span className="mi-main">
        <span className="mi-bone mi-bone--title" />
        <span className="mi-bone mi-bone--text" />
      </span>
    </li>
  );
}

export default function MyInvitations() {
  const [works, setWorks] = useState<InvitationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedSlug, setCopiedSlug] = useState("");
  const [menuSlug, setMenuSlug] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

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

        const items = [...(data.works || [])].sort((a, b) => {
          const left = new Date(b.publishedAt || b.updatedAt || b.createdAt || 0).getTime();
          const right = new Date(a.publishedAt || a.updatedAt || a.createdAt || 0).getTime();
          return left - right;
        });

        setWorks(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load invitations");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  useEffect(() => {
    if (!menuSlug) {
      return;
    }

    function closeOnOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuSlug("");
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuSlug("");
      }
    }

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuSlug]);

  function liveUrl(work: InvitationTemplate) {
    return `${window.location.origin}${invitationLiveHref(work)}`;
  }

  async function copyLink(work: InvitationTemplate) {
    try {
      await navigator.clipboard.writeText(liveUrl(work));
      setCopiedSlug(work.slug);
      window.setTimeout(() => setCopiedSlug((current) => (current === work.slug ? "" : current)), 1800);
    } catch {
      setCopiedSlug("");
    }
  }

  function renderMenu(work: InvitationTemplate) {
    const open = menuSlug === work.slug;

    return (
      <div className="mi-more" ref={open ? menuRef : undefined}>
        <button
          type="button"
          className="mi-icon mi-icon--bare"
          aria-label={`More actions for ${work.name}`}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setMenuSlug(open ? "" : work.slug)}
        >
          <MoreIcon />
        </button>

        {open ? (
          <div className="mi-menu" role="menu">
            <Link
              href={invitationPreviewHref(work, "customer")}
              role="menuitem"
              className="mi-menu-item mi-menu-item--compact"
              onClick={() => setMenuSlug("")}
            >
              <EyeIcon />
              Preview
            </Link>
            <button
              type="button"
              role="menuitem"
              className="mi-menu-item mi-menu-item--compact"
              onClick={() => {
                void copyLink(work);
                setMenuSlug("");
              }}
            >
              <LinkIcon />
              Copy guest link
            </button>
            <Link
              href={invitationEditHref(work, "customer")}
              role="menuitem"
              className="mi-menu-item mi-menu-item--compact"
              onClick={() => setMenuSlug("")}
            >
              <PenIcon />
              Edit
            </Link>
            <a
              href={invitationLiveHref(work)}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              className="mi-menu-item"
              onClick={() => setMenuSlug("")}
            >
              <ExternalIcon />
              Open guest page
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(liveUrl(work))}`}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              className="mi-menu-item"
              onClick={() => setMenuSlug("")}
            >
              <ShareIcon />
              Share on WhatsApp
            </a>
            {work.templateSlug ? (
              <Link
                href={`/preview/${work.templateSlug}`}
                role="menuitem"
                className="mi-menu-item"
                onClick={() => setMenuSlug("")}
              >
                <TemplateIcon />
                View original template
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mi">
      <header className="mi-head">
        <div className="mi-intro">
          <h1 className={`mi-title ${cormorant.className}`}>My invitations</h1>
          {!loading && !error ? (
            <p className="mi-count">
              {works.length} {works.length === 1 ? "invitation" : "invitations"}
            </p>
          ) : null}
        </div>

        <Link href="/#templates" className="mi-create">
          <PlusIcon />
          New invitation
        </Link>
      </header>

      {loading ? (
        <ul className="mi-list">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </ul>
      ) : error ? (
        <div className="mi-state mi-state--error">{error}</div>
      ) : works.length === 0 ? (
        <div className="mi-state">
          <p className={`mi-state-title ${cormorant.className}`}>No invitations yet</p>
          <p className="mi-state-text">
            Start from a template, personalise the details, and publish one guest-ready link.
          </p>
          <Link href="/#templates" className="mi-state-cta">
            <PlusIcon />
            Create your first invitation
          </Link>
        </div>
      ) : (
        <ul className="mi-list">
          <li className="mi-cols" aria-hidden="true">
            <span className="mi-col-main">Invitation</span>
            <span className="mi-col-cat">Occasion</span>
            <span className="mi-col-status">Status</span>
            <span className="mi-col-date">Updated</span>
          </li>
          {works.map((work) => {
            const thumb = thumbFor(work);
            const date = dateFor(work);
            const live = work.isPublished !== false;
            const copied = copiedSlug === work.slug;

            return (
              <li key={work.id} className={`mi-row${menuSlug === work.slug ? " is-menu-open" : ""}`}>
                <Link href={invitationPreviewHref(work, "customer")} className="mi-thumb" tabIndex={-1} aria-hidden="true">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="" loading="lazy" />
                  ) : null}
                </Link>

                <div className="mi-main">
                  <h2 className={`mi-name ${cormorant.className}`}>
                    <Link href={invitationPreviewHref(work, "customer")}>{work.name}</Link>
                  </h2>
                  {work.description ? <p className="mi-desc">{work.description}</p> : null}
                  {date ? <p className="mi-date-inline">{date}</p> : null}
                </div>

                <div className="mi-tags">
                  <span className="mi-cat">{work.categoryName || "Other"}</span>
                  <span className={`mi-status${live ? " is-live" : " is-draft"}`}>
                    <i aria-hidden="true" />
                    {live ? "Live" : "Draft"}
                  </span>
                </div>

                <span className="mi-date">{date}</span>

                <div className="mi-actions">
                  <Link
                    href={invitationPreviewHref(work, "customer")}
                    className="mi-icon"
                    aria-label={`Preview ${work.name}`}
                    title="Preview"
                  >
                    <EyeIcon />
                  </Link>
                  <button
                    type="button"
                    className={`mi-icon${copied ? " is-done" : ""}`}
                    aria-label={copied ? "Link copied" : `Copy guest link for ${work.name}`}
                    title={copied ? "Copied" : "Copy guest link"}
                    onClick={() => void copyLink(work)}
                  >
                    {copied ? <CheckIcon /> : <LinkIcon />}
                  </button>
                  <Link
                    href={invitationEditHref(work, "customer")}
                    className="mi-icon"
                    aria-label={`Edit ${work.name}`}
                    title="Edit"
                  >
                    <PenIcon />
                  </Link>
                  {renderMenu(work)}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className={`mi-toast${copiedSlug ? " is-visible" : ""}`} role="status" aria-live="polite">
        {copiedSlug ? "Guest link copied" : ""}
      </p>
    </div>
  );
}
