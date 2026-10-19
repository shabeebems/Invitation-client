"use client";

import { useState, type ReactNode } from "react";

export default function AureliaNav({
  logo,
  links,
}: {
  logo: ReactNode;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <nav className={`au-nav${open ? " is-menu" : ""}`}>
        <a href="#hero" className="au-logo" onClick={close}>
          {logo}
        </a>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="au-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>
      </nav>
      <div className={`au-sheet${open ? " is-open" : ""}`} id="au-sheet">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
