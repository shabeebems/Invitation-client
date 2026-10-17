"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import {
  CupIcon,
  HouseIcon,
  LeafFlourish,
  SideBotanical,
  TripleLeaf,
  UtensilsIcon,
} from "@/components/templates/house/HouseIcons";
import {
  SCHEDULE_LAYOUT_ALIASES,
  SCHEDULE_LAYOUTS,
  type ProgramLayout,
} from "@/components/templates/house/house-layouts";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { MAX_PROGRAM_ITEMS, PROGRAM_ITEM_MAX } from "@/lib/content-limits";
import type { ProgramItem } from "@/lib/api";

function EventGlyph({ index, className = "h-5 w-5" }: { index: number; className?: string }) {
  const kind = index % 3;
  if (kind === 0) return <CupIcon className={className} />;
  if (kind === 1) return <HouseIcon className={className} />;
  return <UtensilsIcon className={className} />;
}

function RemoveButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] text-[#87361b] hover:bg-[#ab4f31] hover:text-white ${className}`.trim()}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      aria-label="Delete program item"
    >
      ×
    </button>
  );
}

function EditableTime({
  item,
  index,
  editing,
  onCommit,
  className = "",
}: {
  item: ProgramItem;
  index: number;
  editing: boolean;
  onCommit: (index: number, key: keyof ProgramItem, value: string) => void;
  className?: string;
}) {
  return (
    <EditableField
      value={item.time || ""}
      editable={editing}
      maxLength={PROGRAM_ITEM_MAX.time}
      onCommit={(value) => onCommit(index, "time", value)}
      className={className}
    />
  );
}

function EditableTitle({
  item,
  index,
  editing,
  onCommit,
  className = "",
}: {
  item: ProgramItem;
  index: number;
  editing: boolean;
  onCommit: (index: number, key: keyof ProgramItem, value: string) => void;
  className?: string;
}) {
  return (
    <EditableField
      value={item.title || ""}
      editable={editing}
      maxLength={PROGRAM_ITEM_MAX.title}
      onCommit={(value) => onCommit(index, "title", value)}
      className={className}
    />
  );
}

function EditableDescription({
  item,
  index,
  editing,
  onCommit,
  className = "",
}: {
  item: ProgramItem;
  index: number;
  editing: boolean;
  onCommit: (index: number, key: keyof ProgramItem, value: string) => void;
  className?: string;
}) {
  return (
    <EditableField
      value={item.description || ""}
      editable={editing}
      multiline
      maxLength={PROGRAM_ITEM_MAX.description}
      onCommit={(value) => onCommit(index, "description", value)}
      className={className}
    />
  );
}

function AddProgramButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center pt-6">
      <button
        type="button"
        className="relative z-[5] flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[#e4be57] bg-[var(--color-linen-card)] text-[1.5rem] leading-none text-[var(--color-terracotta)] shadow-[0_6px_18px_#c59b2738]"
        onClick={onClick}
        aria-label="Add program item"
      >
        +
      </button>
    </div>
  );
}

function ProgramLimitNote() {
  return (
    <p className="relative z-[5] pt-6 text-center text-[0.82rem] font-medium tracking-[0.04em] text-[#796e65]">
      Maximum {MAX_PROGRAM_ITEMS} schedule items reached
    </p>
  );
}

/** Concept 1 — Asymmetric vertical zigzag timeline */
function ZigzagSchedule({
  program,
  editing,
  onCommitProgram,
  onRemoveProgram,
}: {
  program: ProgramItem[];
  editing: boolean;
  onCommitProgram: (index: number, key: keyof ProgramItem, value: string) => void;
  onRemoveProgram: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto max-w-[860px] py-2">
      <div className="pointer-events-none absolute top-2 bottom-2 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--color-terracotta)]/40 md:block" />
      <ul className="relative m-0 list-none space-y-12 p-0 md:space-y-16">
        {program.map((item, index) => {
          const left = index % 2 === 0;
          return (
            <li
              key={`${item.title}-${index}`}
              className={`relative grid grid-cols-1 md:grid-cols-2 md:gap-x-14 ${
                left ? "" : "md:pt-8"
              }`}
            >
              <span className="pointer-events-none absolute top-3 left-1/2 z-[2] hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-terracotta)] md:block" />

              <article
                className={`relative ${
                  left
                    ? "md:col-start-1 md:pr-10 md:text-right"
                    : "md:col-start-2 md:row-start-1 md:pl-10 md:text-left"
                }`}
              >
                {editing ? (
                  <RemoveButton
                    onClick={() => onRemoveProgram(index)}
                    className={`absolute top-0 ${left ? "left-0 md:left-auto md:right-0" : "right-0"}`}
                  />
                ) : null}
                <p className="mb-2.5 text-[0.84rem] font-bold tracking-[0.06em] text-[var(--color-terracotta-dark)]">
                  <EditableTime item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </p>
                <div
                  className={`mb-2 inline-flex items-center gap-2.5 text-[var(--color-terracotta)] ${
                    left ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <EventGlyph index={index} className="h-[18px] w-[18px] shrink-0" />
                  <h3 className="hw-font-serif text-[1.28rem] leading-snug font-semibold text-[var(--color-terracotta-dark)]">
                    <EditableTitle item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                  </h3>
                </div>
                <p
                  className={`max-w-[300px] text-[0.9rem] leading-[1.7] text-[#7a6b60] ${
                    left ? "md:ml-auto" : ""
                  }`}
                >
                  <EditableDescription item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Concept 2 — Editorial newspaper rows */
function EditorialSchedule({
  program,
  editing,
  onCommitProgram,
  onRemoveProgram,
}: {
  program: ProgramItem[];
  editing: boolean;
  onCommitProgram: (index: number, key: keyof ProgramItem, value: string) => void;
  onRemoveProgram: (index: number) => void;
}) {
  return (
    <div className="mx-auto max-w-[780px]">
      {program.map((item, index) => (
        <article
          key={`${item.title}-${index}`}
          className="relative grid grid-cols-1 items-start gap-4 border-b border-[var(--color-terracotta)]/22 py-8 last:border-b-0 sm:grid-cols-[minmax(150px,200px)_1fr] sm:gap-0 sm:pr-12"
        >
          <p className="hw-font-serif text-[clamp(1.85rem,3.8vw,2.55rem)] leading-none font-light tracking-[0.02em]">
            <EditableTime
              item={item}
              index={index}
              editing={editing}
              onCommit={onCommitProgram}
              className="text-[color-mix(in_srgb,var(--color-terracotta)_38%,transparent)]"
            />
          </p>
          <div className="relative sm:border-l sm:border-[var(--color-terracotta)]/25 sm:pl-9">
            <div className="mb-2 flex items-start gap-2.5 text-[var(--color-terracotta)]">
              <EventGlyph index={index} className="mt-1 h-[18px] w-[18px] shrink-0" />
              <h3 className="hw-font-serif text-[1.38rem] font-semibold text-[var(--color-terracotta-dark)]">
                <EditableTitle item={item} index={index} editing={editing} onCommit={onCommitProgram} />
              </h3>
            </div>
            <p className="max-w-[420px] pl-7 text-[0.92rem] leading-[1.7] text-[#7a6b60] sm:pl-0">
              <EditableDescription item={item} index={index} editing={editing} onCommit={onCommitProgram} />
            </p>
          </div>
          {editing ? (
            <RemoveButton
              onClick={() => onRemoveProgram(index)}
              className="absolute top-6 right-0 z-20"
            />
          ) : null}
        </article>
      ))}
    </div>
  );
}

/** Concept 3 — Horizontal rail itinerary (same scroll track on mobile + desktop) */
function RailSchedule({
  program,
  editing,
  onCommitProgram,
  onRemoveProgram,
}: {
  program: ProgramItem[];
  editing: boolean;
  onCommitProgram: (index: number, key: keyof ProgramItem, value: string) => void;
  onRemoveProgram: (index: number) => void;
}) {
  const itemWidth = 188;
  const gap = 28;
  const trackPadX = 24;
  const trackWidth =
    program.length > 0
      ? trackPadX * 2 + program.length * itemWidth + Math.max(0, program.length - 1) * gap
      : trackPadX * 2;

  return (
    <div className="w-full">
      <div
        className="hw-rail-scroll -mx-6 overflow-x-auto overscroll-x-contain px-6 pb-3"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="relative pt-2 pb-4" style={{ width: trackWidth, minWidth: trackWidth }}>
          <div
            className="pointer-events-none absolute top-[36px] h-px bg-[var(--color-terracotta)]/50"
            style={{
              left: trackPadX + itemWidth / 2,
              right: trackPadX + itemWidth / 2,
            }}
          />
          <ul
            className="relative m-0 flex list-none flex-nowrap items-start p-0"
            style={{ gap, paddingLeft: trackPadX, paddingRight: trackPadX }}
          >
            {program.map((item, index) => (
              <li
                key={`${item.title}-${index}`}
                className="relative flex shrink-0 flex-col items-center text-center"
                style={{ width: itemWidth }}
              >
                {editing ? (
                  <RemoveButton
                    onClick={() => onRemoveProgram(index)}
                    className="absolute -top-1 right-3 z-[3] h-7 w-7 text-sm"
                  />
                ) : null}
                <span className="relative z-[2] mb-3.5 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[var(--color-terracotta)] text-[var(--color-linen-card)] shadow-[0_4px_14px_#87361b33]">
                  <EventGlyph index={index} className="h-5 w-5" />
                </span>
                <p className="mb-1.5 text-[0.8rem] font-bold tracking-[0.05em] text-[var(--color-terracotta-dark)]">
                  <EditableTime item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </p>
                <h3 className="hw-font-serif mb-1.5 text-[1.1rem] leading-snug font-semibold text-[var(--color-terracotta-dark)]">
                  <EditableTitle item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </h3>
                <p className="text-[0.78rem] leading-[1.55] text-[#7a6b60]">
                  <EditableDescription item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-2.5 text-[var(--color-terracotta)]">
        <LeafFlourish className="h-4 w-11 opacity-75" />
        <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-[var(--color-terracotta-dark)] uppercase">
          Good Food · Warm Company · Blessed Home
        </p>
      </div>
    </div>
  );
}

/** Concept 4 — Botanical invitation list */
function BotanicalSchedule({
  program,
  editing,
  onCommitProgram,
  onRemoveProgram,
}: {
  program: ProgramItem[];
  editing: boolean;
  onCommitProgram: (index: number, key: keyof ProgramItem, value: string) => void;
  onRemoveProgram: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto max-w-[780px] px-1 sm:px-12">
      <SideBotanical className="pointer-events-none absolute top-[-12px] bottom-[-12px] left-0 hidden w-[88px] opacity-90 md:block" />
      <SideBotanical
        className="pointer-events-none absolute top-[-12px] right-0 bottom-[-12px] hidden w-[88px] opacity-90 md:block"
        flip
      />

      <div className="relative mx-auto max-w-[500px]">
        <div className="pointer-events-none absolute top-2 bottom-2 left-[calc(6.75rem+10px)] w-px bg-[var(--color-terracotta)]/35 sm:left-[calc(7.5rem+12px)]" />
        <ul className="relative m-0 list-none space-y-9 p-0">
          {program.map((item, index) => (
            <li
              key={`${item.title}-${index}`}
              className="relative grid grid-cols-[6.75rem_20px_1fr] items-start gap-x-2 sm:grid-cols-[7.5rem_24px_1fr] sm:gap-x-3"
            >
              <p className="pt-0.5 text-right text-[0.92rem] font-semibold tracking-[0.02em] text-[var(--color-terracotta-dark)]">
                <EditableTime item={item} index={index} editing={editing} onCommit={onCommitProgram} />
              </p>
              <span className="relative z-[2] mt-1.5 flex justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-terracotta)]" />
              </span>
              <div className="relative min-w-0">
                {editing ? (
                  <RemoveButton
                    onClick={() => onRemoveProgram(index)}
                    className="absolute -top-1 right-0 h-7 w-7 text-sm"
                  />
                ) : null}
                <h3 className="hw-font-serif mb-1 text-[1.22rem] font-semibold text-[var(--color-terracotta-dark)]">
                  <EditableTitle item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </h3>
                <p className="text-[0.88rem] leading-[1.65] text-[#7a6b60]">
                  <EditableDescription item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Concept 5 — Modern numbered typographic schedule */
function ModernSchedule({
  program,
  editing,
  onCommitProgram,
  onRemoveProgram,
}: {
  program: ProgramItem[];
  editing: boolean;
  onCommitProgram: (index: number, key: keyof ProgramItem, value: string) => void;
  onRemoveProgram: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto max-w-[720px]">
      <div className="pointer-events-none absolute top-4 bottom-6 left-[6.75rem] w-px bg-[var(--color-terracotta)]/30 sm:left-[7.5rem]" />
      <ul className="relative m-0 list-none space-y-9 p-0">
        {program.map((item, index) => {
          const step = String(index + 1).padStart(2, "0");
          return (
            <li
              key={`${item.title}-${index}`}
              className="relative grid grid-cols-[5.5rem_2.5rem_1fr] items-start gap-x-2 sm:grid-cols-[6.25rem_2.75rem_1fr] sm:gap-x-3"
            >
              <p className="pt-1.5 text-right text-[0.86rem] font-medium tracking-[0.02em] text-[var(--color-terracotta-dark)]">
                <EditableTime item={item} index={index} editing={editing} onCommit={onCommitProgram} />
              </p>
              <span className="relative z-[2] flex justify-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-terracotta)] text-[0.68rem] font-bold tracking-[0.08em] text-[var(--color-linen-card)]">
                  {step}
                </span>
              </span>
              <div className="relative min-w-0 pt-0.5">
                {editing ? (
                  <RemoveButton onClick={() => onRemoveProgram(index)} className="absolute -top-1 right-0 h-7 w-7 text-sm" />
                ) : null}
                <h3 className="hw-font-serif mb-1 text-[1.35rem] font-semibold text-[var(--color-terracotta-dark)]">
                  <EditableTitle item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </h3>
                <p className="text-[0.9rem] leading-[1.65] text-[#7a6b60]">
                  <EditableDescription item={item} index={index} editing={editing} onCommit={onCommitProgram} />
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <TripleLeaf className="pointer-events-none absolute right-2 bottom-0 h-8 w-8 text-[var(--color-terracotta)] opacity-50" />
    </div>
  );
}

export default function HouseSchedule({
  field,
  editing,
  program,
  layout,
  onLayoutChange,
  onCommitProgram,
  onRemoveProgram,
  onAddProgram,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  program: ProgramItem[];
  layout?: string;
  onLayoutChange?: (layout: ProgramLayout) => void;
  onCommitProgram: (index: number, key: keyof ProgramItem, value: string) => void;
  onRemoveProgram: (index: number) => void;
  onAddProgram: () => void;
}) {
  const activeLayout = normalizeLayoutId(
    layout,
    SCHEDULE_LAYOUTS,
    "zigzag",
    SCHEDULE_LAYOUT_ALIASES
  );

  const header =
    activeLayout === "modern" ? (
      <header className="mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-[var(--color-terracotta)]/30 pb-4">
        <p className="text-[0.76rem] font-bold tracking-[0.24em] text-[var(--color-terracotta-dark)] uppercase">
          {field("programEyebrow")}
        </p>
        <p className="hw-font-serif text-[1.1rem] tracking-[0.01em] text-[var(--color-terracotta)] italic">
          Home · Family · Together
        </p>
      </header>
    ) : activeLayout === "botanical" ? (
      <header className="mb-12 text-center">
        <h2 className="hw-font-serif text-[clamp(1.65rem,3.4vw,2.25rem)] font-semibold tracking-[0.22em] text-[var(--color-terracotta-dark)] uppercase">
          {field("programTitle")}
        </h2>
        <div className="mt-3.5 flex justify-center text-[var(--color-terracotta)]">
          <LeafFlourish className="h-4 w-10 opacity-75" />
        </div>
      </header>
    ) : activeLayout === "rail" ? (
      <header className="mb-12 text-center">
        <h2 className="hw-font-serif mb-3 text-[clamp(2rem,4vw,2.85rem)] font-semibold text-[var(--color-terracotta-dark)]">
          {field("programTitle")}
        </h2>
        <div className="mb-3 flex justify-center text-[var(--color-terracotta)]">
          <LeafFlourish className="h-4 w-10 opacity-70" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="hidden h-px w-10 bg-[var(--color-terracotta)]/35 sm:block" />
          <p className="text-[0.76rem] font-semibold tracking-[0.22em] text-[var(--color-terracotta)] uppercase">
            {field("programEyebrow")}
          </p>
          <span className="hidden h-px w-10 bg-[var(--color-terracotta)]/35 sm:block" />
        </div>
      </header>
    ) : activeLayout === "editorial" ? (
      <header className="mb-12 text-center">
        <h2 className="hw-font-serif mb-3 text-[clamp(2.5rem,5.2vw,3.5rem)] font-semibold text-[var(--color-terracotta-dark)]">
          {field("programTitle")}
        </h2>
        <p className="text-[0.76rem] font-semibold tracking-[0.24em] text-[var(--color-terracotta)] uppercase">
          {field("programEyebrow")}
        </p>
      </header>
    ) : (
      <header className="mb-12 text-center">
        <h2 className="hw-font-serif mb-3 text-[clamp(2.1rem,4.2vw,3rem)] font-semibold text-[var(--color-terracotta-dark)]">
          {field("programTitle")}
        </h2>
        <div className="mb-3.5 flex justify-center text-[var(--color-terracotta)]">
          <LeafFlourish className="h-4 w-10 opacity-75" />
        </div>
        <p className="mx-auto max-w-[560px] text-[0.76rem] font-semibold tracking-[0.2em] text-[var(--color-terracotta)] uppercase">
          {field("programIntro", "", true)}
        </p>
      </header>
    );

  const body =
    activeLayout === "editorial" ? (
      <EditorialSchedule
        program={program}
        editing={editing}
        onCommitProgram={onCommitProgram}
        onRemoveProgram={onRemoveProgram}
      />
    ) : activeLayout === "rail" ? (
      <RailSchedule
        program={program}
        editing={editing}
        onCommitProgram={onCommitProgram}
        onRemoveProgram={onRemoveProgram}
      />
    ) : activeLayout === "botanical" ? (
      <BotanicalSchedule
        program={program}
        editing={editing}
        onCommitProgram={onCommitProgram}
        onRemoveProgram={onRemoveProgram}
      />
    ) : activeLayout === "modern" ? (
      <ModernSchedule
        program={program}
        editing={editing}
        onCommitProgram={onCommitProgram}
        onRemoveProgram={onRemoveProgram}
      />
    ) : (
      <ZigzagSchedule
        program={program}
        editing={editing}
        onCommitProgram={onCommitProgram}
        onRemoveProgram={onRemoveProgram}
      />
    );

  return (
    <section
      id="schedule"
      className={`relative z-[2] mx-auto max-w-[980px] px-6 pt-20 pb-[90px] text-[#473e37] is-layout-${activeLayout}${
        activeLayout === "rail" ? " overflow-x-visible" : ""
      }`}
    >
      {editing && onLayoutChange ? (
        <LayoutPicker
          className="hw-layout-picker mb-10"
          options={SCHEDULE_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Schedule"
        />
      ) : null}

      {header}
      {body}
      {editing ? (
        program.length >= MAX_PROGRAM_ITEMS ? (
          <ProgramLimitNote />
        ) : (
          <AddProgramButton onClick={onAddProgram} />
        )
      ) : null}
    </section>
  );
}
