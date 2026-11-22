import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-[#e6e8ec] pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-zinc-400 uppercase">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">{description}</p>
      </div>
      {(meta || action) ? (
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3 lg:shrink-0 lg:justify-end">
          {meta ? (
            <span className="max-w-full rounded-full border border-[#e6e8ec] bg-white px-3 py-1.5 text-xs font-semibold break-words text-[#111827]">
              {meta}
            </span>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="shrink-0 rounded-full bg-[#111827] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-black disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-[#e6e8ec] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)] ${className}`}>
      {children}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Panel className="px-5 py-12 text-center sm:px-8 sm:py-16">
      <p className="text-lg font-semibold text-[#111827]">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">{body}</p>
    </Panel>
  );
}

export function StatusNote({ tone, children }: { tone: "error" | "muted"; children: ReactNode }) {
  if (tone === "error") {
    return (
      <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        {children}
      </p>
    );
  }

  return <p className="text-sm text-zinc-500">{children}</p>;
}
