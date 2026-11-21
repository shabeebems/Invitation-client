"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandLoader from "@/components/brand/BrandLoader";
import {
  API_URL,
  invitationEditHref,
  invitationLiveHref,
  isInvitationLive,
  type InvitationTemplate,
} from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import "./published.css";

export default function PublishedInvitation({ slug }: { slug: string }) {
  const [work, setWork] = useState<InvitationTemplate | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(`${API_URL}/api/works/${slug}`, { credentials: "include" });
        const data = (await response.json()) as {
          success?: boolean;
          work?: InvitationTemplate;
          template?: InvitationTemplate;
          message?: string;
        };
        const invitation = data.work || data.template;

        if (!response.ok || !data.success || !invitation) {
          throw new Error(data.message || "Invitation not found");
        }

        if (!cancelled) {
          setWork(invitation);
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
  const liveUrl = origin ? `${origin}${livePath}` : livePath;
  const live = work ? isInvitationLive(work) : false;
  const editHref = work ? invitationEditHref(work, "customer") : `/user/works/${slug}/edit`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (error) {
    return (
      <div className="pb">
        <h1 className={`pb-title ${cormorant.className}`}>Not found</h1>
        <p className="pb-state pb-state--error">{error}</p>
        <div className="pb-actions">
          <Link href="/user/invitations" className="pb-btn pb-btn--primary">
            My invitations
          </Link>
        </div>
      </div>
    );
  }

  if (!work) {
    return <BrandLoader variant="inline" label="Loading invitation" />;
  }

  if (!live) {
    return (
      <div className="pb">
        <h1 className={`pb-title ${cormorant.className}`}>Almost ready</h1>
        <p className="pb-note">This invitation is still a draft. Publish it so guests can open the link.</p>

        <dl className="pb-details">
          <div>
            <dt>Title</dt>
            <dd>{work.name}</dd>
          </div>
          <div>
            <dt>Occasion</dt>
            <dd>{work.categoryName || "Invitation"}</dd>
          </div>
        </dl>

        <div className="pb-actions">
          <Link href={editHref} className="pb-btn pb-btn--primary">
            Continue editing
          </Link>
          <Link href="/user/invitations" className="pb-btn">
            My invitations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb">
      <h1 className={`pb-title ${cormorant.className}`}>Your invitation is live</h1>
      <p className="pb-note">Guests can open this link anytime.</p>

      <dl className="pb-details">
        <div>
          <dt>Title</dt>
          <dd>{work.name}</dd>
        </div>
        <div>
          <dt>Occasion</dt>
          <dd>{work.categoryName || "Invitation"}</dd>
        </div>
        <div>
          <dt>Guest link</dt>
          <dd>{liveUrl}</dd>
        </div>
      </dl>

      <div className="pb-actions">
        <button type="button" onClick={() => void copyLink()} className="pb-btn">
          {copied ? "Copied" : "Copy link"}
        </button>
        <Link href={livePath} target="_blank" className="pb-btn">
          Open invitation
        </Link>
        <Link href="/user/invitations" className="pb-btn pb-btn--primary">
          My invitations
        </Link>
      </div>
    </div>
  );
}
