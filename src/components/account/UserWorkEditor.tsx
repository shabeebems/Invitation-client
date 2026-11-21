"use client";

import { useEffect, useState } from "react";
import BrandLoader from "@/components/brand/BrandLoader";
import RequireVerifiedEmail from "@/components/auth/RequireVerifiedEmail";
import InvitationView from "@/components/templates/InvitationView";
import { canEditWork, fetchWork, type InvitationTemplate } from "@/lib/api";
import { loadSession, loginHref } from "@/lib/session";

type WorkEditorMode = "user" | "admin";

export default function UserWorkEditor({
  slug,
  mode = "user",
}: {
  slug: string;
  mode?: WorkEditorMode;
}) {
  const [work, setWork] = useState<InvitationTemplate | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const user = await loadSession();
      if (cancelled) {
        return;
      }

      if (mode === "admin") {
        if (!user || user.role !== "admin") {
          window.location.replace(loginHref(`/admin/works/${slug}/edit`));
          return;
        }
      } else if (!user) {
        window.location.replace(loginHref(`/user/works/${slug}/edit`));
        return;
      }

      const loaded = await fetchWork(slug, { fresh: true, credentials: "include" });
      if (cancelled) {
        return;
      }

      if (!loaded || (mode === "user" && !canEditWork(loaded, user))) {
        setMissing(true);
        return;
      }

      setWork(loaded);
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, mode]);

  if (missing) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F7F2E8] px-5 text-center text-sm text-zinc-600">
        Invitation not found.
      </div>
    );
  }

  if (!work) {
    return <BrandLoader label="Opening invitation" />;
  }

  if (mode === "admin") {
    return <InvitationView template={work} editable />;
  }

  return (
    <RequireVerifiedEmail>
      <InvitationView template={work} editable />
    </RequireVerifiedEmail>
  );
}
