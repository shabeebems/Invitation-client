"use client";

export default function RoyalNav({
  groomInitial,
  brideInitial,
}: {
  groomInitial: string;
  brideInitial: string;
}) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1100] px-[clamp(12px,2.5vw,32px)]">
      <div className="flex min-h-16 items-center justify-center">
        <a href="#home" className="pointer-events-auto flex flex-col items-center no-underline" aria-label="Home">
          <span className="font-names text-[clamp(28px,4vw,38px)] leading-none tracking-wide text-[#e7d3a4] [text-shadow:0_2px_18px_rgba(185,137,62,0.35)]">
            {groomInitial}
            <span className="mx-0.5 text-[0.55em] text-[#b9893e]">&</span>
            {brideInitial}
          </span>
        </a>
      </div>
    </header>
  );
}
