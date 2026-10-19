"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function CreamNav({
  logo,
  links,
}: {
  logo: ReactNode;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("ce-locked");
    return () => document.body.classList.remove("ce-locked");
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <nav className={`ce-nav${scrolled ? " is-solid" : ""}`}>
        <a href="#hero" className="ce-nav-logo" onClick={close}>
          {logo}
        </a>
        <button
          type="button"
          className="ce-burger"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="ce-menu"
          onClick={() => setOpen(true)}
        >
          <i />
          <i />
        </button>
      </nav>
      <div
        id="ce-menu"
        className={`ce-menu${open ? " is-on" : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="ce-burger ce-menu-close"
          aria-label="Close menu"
          onClick={close}
        >
          <i style={{ transform: "translateY(3.5px) rotate(45deg)" }} />
          <i style={{ transform: "translateY(-3.5px) rotate(-45deg)" }} />
        </button>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
