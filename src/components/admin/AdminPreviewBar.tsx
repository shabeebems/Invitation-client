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
      <div className="flex w-full flex-wrap items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 md:px-10">
        <p className="min-w-0 flex-1 basis-[8rem] truncate text-sm font-semibold text-zinc-800">{name}</p>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <Link
            href={backHref}
            className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-zinc-400 sm:px-4 sm:py-2 sm:text-sm"
          >
            Back
          </Link>
          {liveHref ? (
            <Link
              href={liveHref}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-zinc-400 sm:px-4 sm:py-2 sm:text-sm"
            >
              Live
            </Link>
          ) : null}
          <Link
            href={editHref}
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-hover sm:px-4 sm:py-2 sm:text-sm"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
