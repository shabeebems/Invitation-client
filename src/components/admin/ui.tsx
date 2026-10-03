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
    <div className="mb-8 flex flex-col gap-5 border-b border-[#e6e8ec] pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-zinc-400 uppercase">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#111827]">{title}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">{description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {meta ? (
          <span className="rounded-full border border-[#e6e8ec] bg-white px-3 py-1.5 text-xs font-semibold text-[#111827]">
            {meta}
          </span>
        ) : null}
        {action}
      </div>
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
      className="rounded-full bg-[#111827] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
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
    <Panel className="px-8 py-16 text-center">
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
