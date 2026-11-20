"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import BrandLoader from "@/components/brand/BrandLoader";
import { subscribeNavigationBusy } from "@/lib/navigation-busy";

const SHOW_AFTER_MS = 120;
const FAILSAFE_MS = 12_000;

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function sameDocumentHref(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute("rel")?.includes("external")) return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  try {
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return false;

    const next = `${url.pathname}${url.search}`;
    const current = `${window.location.pathname}${window.location.search}`;
    return next !== current;
  } catch {
    return false;
  }
}

/** Instant feedback on in-app navigations so waits never feel like a stuck page. */
export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const showTimer = useRef<number | null>(null);
  const failsafeTimer = useRef<number | null>(null);
  const visibleRef = useRef(false);

  function clearTimers() {
    if (showTimer.current !== null) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (failsafeTimer.current !== null) {
      window.clearTimeout(failsafeTimer.current);
      failsafeTimer.current = null;
    }
  }

  function stop() {
    clearTimers();
    visibleRef.current = false;
    setVisible(false);
    document.documentElement.removeAttribute("data-nav-busy");
  }

  function start() {
    if (showTimer.current !== null || visibleRef.current) return;

    // Block repeat taps immediately so slow networks don't get double navigations.
    document.documentElement.setAttribute("data-nav-busy", "1");

    showTimer.current = window.setTimeout(() => {
      showTimer.current = null;
      visibleRef.current = true;
      setVisible(true);
      failsafeTimer.current = window.setTimeout(stop, FAILSAFE_MS);
    }, SHOW_AFTER_MS);
  }

  useEffect(() => {
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed to URL settlement only
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (isModifiedClick(event)) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (!sameDocumentHref(anchor)) return;

      start();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (!sameDocumentHref(anchor)) return;

      start();
    }

    const unsubscribe = subscribeNavigationBusy((busy) => {
      if (busy) start();
      else stop();
    });

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      unsubscribe();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bind once
  }, []);

  if (!visible) return null;

  return <BrandLoader variant="overlay" label="Opening" />;
}
