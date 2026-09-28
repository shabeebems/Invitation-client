"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { homeFor, loadSession } from "@/lib/session";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function gate() {
      const user = await loadSession();

      if (cancelled) {
        return;
      }

      if (user) {
        router.replace(homeFor(user));
        return;
      }

      setReady(true);
    }

    void gate();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-full items-center justify-center bg-page text-sm">
        Checking access…
      </div>
    );
  }

  return children;
}
