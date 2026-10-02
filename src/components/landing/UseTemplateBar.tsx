import Link from "next/link";

export default function UseTemplateBar({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="sticky top-0 z-[10050] border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-3 px-6 py-3 md:px-10">
        <p className="truncate text-sm font-semibold text-zinc-800">{name}</p>
        <Link
          href={`/use/${slug}`}
          className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Use this template
        </Link>
      </div>
    </div>
  );
}
