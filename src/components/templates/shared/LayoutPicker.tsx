"use client";

export type LayoutOption<T extends string = string> = {
  id: T;
  label: string;
};

export function normalizeLayoutId<T extends string>(
  value: string | undefined,
  options: LayoutOption<T>[],
  fallback: T,
  aliases?: Record<string, T>
): T {
  const next = (value || fallback).toLowerCase();
  if (aliases?.[next]) {
    return aliases[next];
  }
  if (options.some((item) => item.id === next)) {
    return next as T;
  }
  return fallback;
}

export default function LayoutPicker<T extends string>({
  options,
  value,
  onChange,
  section,
  title,
  className = "",
}: {
  options: LayoutOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Section name shown in “Choose {section} layout” (e.g. Location, Journey). */
  section: string;
  /** Optional full title override (e.g. “Choose ambient effect”). */
  title?: string;
  className?: string;
}) {
  const heading = title || `Choose ${section} layout`;

  return (
    <div className={`rr-layout-picker ${className}`.trim()} role="group" aria-label={heading}>
      <p className="rr-layout-picker-title font-caps">{heading}</p>
      <div className="rr-layout-picker-options">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`rr-layout-picker-btn font-caps ${value === option.id ? "is-active" : ""}`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
