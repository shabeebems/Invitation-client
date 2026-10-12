import Link from "next/link";

export default function AdminPreviewBar({
  name,
  backHref,
  editHref,
  liveHref,
}: {
  name: string;
  backHref: string;
  editHref: string;
  liveHref?: string;
}) {
  return (
    <div className="sticky top-0 z-[10050] border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-3 px-6 py-3 md:px-10">
        <p className="truncate text-sm font-semibold text-zinc-800">{name}</p>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={backHref}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-400"
          >
            Back
          </Link>
          {liveHref ? (
            <Link
              href={liveHref}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-400"
            >
              Live
            </Link>
          ) : null}
          <Link
            href={editHref}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
