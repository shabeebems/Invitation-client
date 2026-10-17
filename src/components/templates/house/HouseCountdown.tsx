"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import {
  CalendarIcon,
  ClockIcon,
  CornerVine,
  LeafFlourish,
  TripleLeaf,
} from "@/components/templates/house/HouseIcons";
import {
  HOUSE_COUNTDOWN_LAYOUT_ALIASES,
  HOUSE_COUNTDOWN_LAYOUTS,
  type HouseCountdownLayout,
} from "@/components/templates/house/house-layouts";
import {
  EVENT_DATE_TOO_SOON_MESSAGE,
  isEventDateAllowed,
  minDatetimeLocal,
  partsFromEventDate,
  toDatetimeLocal,
} from "@/lib/event-date";

type Countdown = { days: number; hours: number; minutes: number; seconds: number; live: boolean };
type Unit = { label: string; value: number };

function useCountdown(iso: string): Countdown {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const target = new Date(iso).getTime();
  if (!iso || Number.isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true };
  }

  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    live: diff <= 0,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/** Keeps a single horizontal row; scrolls on every viewport when needed. */
function HScroll({
  children,
  className = "",
  contentClassName = "",
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={`hw-countdown-scroll w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] ${className}`.trim()}
    >
      <div className={`mx-auto flex w-max max-w-none flex-nowrap items-center justify-center ${contentClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}

function MetaChip({
  icon,
  children,
  onClick,
  isEditable = false,
}: {
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  isEditable?: boolean;
}) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-linen-surface)_88%,white)] px-3.5 py-2 text-[0.8rem] font-medium text-[var(--color-terracotta-dark)] shadow-[0_1px_0_#ffffff80] sm:px-4 sm:py-2.5 sm:text-[0.88rem] ${
        isEditable
          ? "cursor-pointer transition-colors hover:border-[var(--color-terracotta)] hover:bg-[color-mix(in_srgb,var(--color-linen-surface)_96%,white)]"
          : ""
      }`.trim()}
      title={isEditable ? "Tap to change event date & time" : undefined}
    >
      <span className="text-[var(--color-terracotta)]">{icon}</span>
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}

function TapToChangeButton({
  dateInputRef,
  minDateTime,
  eventDateIso,
  onEventDateChange,
  setDateError,
  openDatePicker,
}: {
  dateInputRef: React.RefObject<HTMLInputElement | null>;
  minDateTime: string;
  eventDateIso?: string;
  onEventDateChange?: (value: string) => void;
  setDateError: (err: string) => void;
  openDatePicker: () => void;
}) {
  return (
    <label
      onClick={(e) => {
        e.stopPropagation();
        openDatePicker();
      }}
      className="relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_14%,var(--color-linen-surface))] px-3 py-1.5 text-[0.74rem] font-semibold tracking-wider text-[var(--color-terracotta-dark)] uppercase shadow-[0_1px_2px_#87361b14] transition-all hover:border-[var(--color-terracotta)] hover:bg-[color-mix(in_srgb,var(--color-terracotta)_22%,var(--color-linen-surface))] active:scale-[0.98] sm:px-3.5 sm:py-2 sm:text-[0.78rem]"
      title="Tap to change event date & time"
    >
      <span className="relative z-[1] select-none">Tap to change</span>
      <input
        ref={dateInputRef}
        type="datetime-local"
        className="absolute inset-0 z-[2] h-full w-full cursor-pointer opacity-[0.011]"
        min={minDateTime}
        value={toDatetimeLocal(eventDateIso)}
        onChange={(event) => {
          const next = event.target.value;
          if (next && !isEventDateAllowed(next)) {
            setDateError(EVENT_DATE_TOO_SOON_MESSAGE);
            return;
          }
          setDateError("");
          onEventDateChange?.(next);
        }}
        onClick={(event) => {
          event.stopPropagation();
          openDatePicker();
        }}
        aria-label="Choose event date and time"
      />
    </label>
  );
}

function MetaPills({
  dateNode,
  timeNode,
  editTrigger,
  onChipClick,
  isEditable = false,
}: {
  dateNode: ReactNode;
  timeNode: ReactNode;
  editTrigger?: ReactNode;
  onChipClick?: () => void;
  isEditable?: boolean;
}) {
  return (
    <HScroll className="mb-7 sm:mb-8" contentClassName="gap-2.5 px-1 sm:gap-3.5 items-center">
      <MetaChip
        icon={<CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        onClick={onChipClick}
        isEditable={isEditable}
      >
        {dateNode}
      </MetaChip>
      <MetaChip
        icon={<ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        onClick={onChipClick}
        isEditable={isEditable}
      >
        {timeNode}
      </MetaChip>
      {editTrigger}
    </HScroll>
  );
}

function MetaBare({
  dateNode,
  timeNode,
  editTrigger,
  onChipClick,
  isEditable = false,
  framed = false,
}: {
  dateNode: ReactNode;
  timeNode: ReactNode;
  editTrigger?: ReactNode;
  onChipClick?: () => void;
  isEditable?: boolean;
  framed?: boolean;
}) {
  const items = [
    { icon: <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, node: dateNode },
    { icon: <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, node: timeNode },
  ];

  const row = (
    <HScroll contentClassName="gap-0 items-center">
      {items.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          {index > 0 ? (
            <span className="mx-2.5 h-4 w-px shrink-0 bg-[color-mix(in_srgb,var(--color-terracotta)_35%,transparent)] sm:mx-3.5 sm:h-5" />
          ) : null}
          <span
            onClick={onChipClick}
            className={`inline-flex shrink-0 items-center gap-2 px-1 text-[0.8rem] font-medium text-[var(--color-terracotta-dark)] sm:text-[0.9rem] ${
              isEditable ? "cursor-pointer hover:text-[var(--color-terracotta)]" : ""
            }`}
            title={isEditable ? "Tap to change event date & time" : undefined}
          >
            <span className="text-[var(--color-terracotta)]">{item.icon}</span>
            <span className="whitespace-nowrap">{item.node}</span>
          </span>
        </span>
      ))}
      {editTrigger ? (
        <span className="inline-flex items-center">
          <span className="mx-2.5 h-4 w-px shrink-0 bg-[color-mix(in_srgb,var(--color-terracotta)_35%,transparent)] sm:mx-3.5 sm:h-5" />
          <span className="px-1">{editTrigger}</span>
        </span>
      ) : null}
    </HScroll>
  );

  if (framed) {
    return (
      <div className="mb-7 flex justify-center px-1 sm:mb-8">
        <div className="inline-flex max-w-full items-center rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-linen-surface)_90%,white)] px-3 py-2.5 sm:px-5 sm:py-3">
          {row}
        </div>
      </div>
    );
  }

  return <div className="mb-7 sm:mb-8">{row}</div>;
}

function ArrowFlourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 56 12"
      className={`h-2.5 w-10 shrink-0 text-[var(--color-terracotta)] sm:h-3 sm:w-14 ${flip ? "-scale-x-100" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 6h40" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path
        d="M38 2.2c2.2 1.2 4.6 2.6 8 3.8-3.4 1.2-5.8 2.6-8 3.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M44 3.5c1.2 1.2 1.2 3.8 0 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

function HeadingBlock({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "arrows" | "lines" | "leaves";
}) {
  const text = (
    <span className="hw-font-serif min-w-0 max-w-[18ch] text-center text-[clamp(0.95rem,3.4vw,1.35rem)] leading-snug font-semibold tracking-[0.1em] text-[var(--color-terracotta-dark)] uppercase sm:max-w-none sm:tracking-[0.12em]">
      {children}
    </span>
  );

  if (variant === "arrows") {
    return (
      <div className="mb-8 flex items-center justify-center gap-2.5 px-1 sm:mb-9 sm:gap-4">
        <ArrowFlourish />
        {text}
        <ArrowFlourish flip />
      </div>
    );
  }

  if (variant === "leaves") {
    return (
      <div className="mb-8 flex items-center justify-center gap-2.5 px-1 sm:mb-9 sm:gap-3.5">
        <LeafFlourish className="h-4 w-8 shrink-0 text-[var(--color-terracotta)] sm:h-5 sm:w-10" />
        {text}
        <LeafFlourish className="h-4 w-8 shrink-0 text-[var(--color-terracotta)] sm:h-5 sm:w-10" flip />
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-center justify-center gap-3 px-1 sm:mb-9 sm:gap-5">
      <span className="h-px w-8 shrink-0 bg-[color-mix(in_srgb,var(--color-terracotta)_55%,transparent)] sm:w-16" />
      {text}
      <span className="h-px w-8 shrink-0 bg-[color-mix(in_srgb,var(--color-terracotta)_55%,transparent)] sm:w-16" />
    </div>
  );
}

/** Layout 1 — outlined rings with partial accent arc; label inside. */
function OutlineTimer({ units }: { units: Unit[] }) {
  const size = 104;
  const stroke = 2.4;
  const r = (size - stroke * 2) / 2;
  const c = 2 * Math.PI * r;
  const arc = c * 0.72;

  return (
    <HScroll contentClassName="gap-3 px-1 sm:gap-5 md:gap-6">
      {units.map((unit, index) => {
        const rotate = -90 + index * 18;
        return (
          <div
            key={unit.label}
            className="relative flex h-[5.4rem] w-[5.4rem] shrink-0 flex-col items-center justify-center sm:h-[6.5rem] sm:w-[6.5rem]"
          >
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="color-mix(in srgb, var(--color-terracotta) 22%, transparent)"
                strokeWidth={stroke}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="var(--color-terracotta-dark)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${arc} ${c - arc}`}
                transform={`rotate(${rotate} ${size / 2} ${size / 2})`}
              />
            </svg>
            <span className="relative z-[1] text-[clamp(1.55rem,4vw,2.15rem)] font-bold leading-none text-[var(--color-terracotta-dark)]">
              {pad(unit.value)}
            </span>
            <p className="relative z-[1] mt-1 text-[0.58rem] font-semibold tracking-[0.16em] text-[var(--color-terracotta)] uppercase sm:text-[0.62rem]">
              {unit.label}
            </p>
          </div>
        );
      })}
    </HScroll>
  );
}

/** Layout 2 — single cream capsule with internal dividers. */
function CapsuleTimer({ units }: { units: Unit[] }) {
  return (
    <div className="mx-auto w-full max-w-[720px] px-1">
      <HScroll>
        <div className="flex min-w-0 flex-nowrap items-stretch overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-linen-surface)_92%,white)] px-1 py-3 shadow-[0_2px_10px_#87361b12] sm:px-2 sm:py-4">
          {units.map((unit, index) => (
            <div
              key={unit.label}
              className={`flex w-[4.75rem] shrink-0 flex-col items-center justify-center px-2 py-1 sm:w-[7.5rem] sm:px-4 ${
                index > 0 ? "border-l border-[color-mix(in_srgb,var(--color-terracotta)_22%,transparent)]" : ""
              }`}
            >
              <span className="text-[clamp(1.45rem,3.8vw,2.1rem)] font-bold leading-none text-[var(--color-terracotta-dark)]">
                {pad(unit.value)}
              </span>
              <p className="mt-1.5 text-[0.58rem] font-semibold tracking-[0.14em] text-[var(--color-terracotta)] uppercase sm:mt-2 sm:text-[0.64rem]">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </HScroll>
    </div>
  );
}

/** Layout 3 — soft cards with folded bottom tab + notch. */
function TabsTimer({ units }: { units: Unit[] }) {
  return (
    <HScroll contentClassName="gap-3.5 px-1 pb-2 sm:gap-4 md:gap-5">
      {units.map((unit) => (
        <div key={unit.label} className="relative w-[4.7rem] shrink-0 sm:w-[5.9rem]">
          <div className="overflow-hidden rounded-[1.2rem] border border-[color-mix(in_srgb,var(--color-terracotta)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-linen-surface)_96%,white)] shadow-[0_6px_18px_#87361b14]">
            <div className="flex items-center justify-center px-2 pt-4 pb-3 sm:pt-5 sm:pb-3.5">
              <span className="text-[clamp(1.45rem,3.8vw,2.05rem)] font-bold leading-none text-[var(--color-terracotta-dark)]">
                {pad(unit.value)}
              </span>
            </div>
            <div className="relative bg-[color-mix(in_srgb,var(--color-terracotta)_12%,var(--color-linen-surface))] px-2 pt-2.5 pb-3">
              <span
                className="absolute top-0 left-1/2 h-0 w-0 -translate-x-1/2 -translate-y-full border-x-[7px] border-b-[7px] border-x-transparent border-b-[color-mix(in_srgb,var(--color-terracotta)_12%,var(--color-linen-surface))]"
                aria-hidden="true"
              />
              <p className="text-[0.58rem] font-semibold tracking-[0.14em] text-[var(--color-terracotta-dark)] uppercase sm:text-[0.64rem]">
                {unit.label}
              </p>
            </div>
          </div>
          <span
            className="absolute bottom-[-6px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[7px] border-x-transparent border-t-[color-mix(in_srgb,var(--color-terracotta)_18%,var(--color-linen-surface))]"
            aria-hidden="true"
          />
        </div>
      ))}
    </HScroll>
  );
}

/** Layout 4 — open typography with tall vertical rules. */
function DividersTimer({ units }: { units: Unit[] }) {
  return (
    <HScroll contentClassName="gap-0 px-1">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-stretch">
          {index > 0 ? (
            <span className="mx-3 w-px self-stretch bg-[color-mix(in_srgb,var(--color-terracotta)_40%,transparent)] sm:mx-6 md:mx-8" />
          ) : null}
          <div className="flex w-[4.25rem] shrink-0 flex-col items-center justify-center py-1 sm:w-[5.5rem]">
            <span className="text-[clamp(1.55rem,4vw,2.25rem)] font-bold leading-none text-[var(--color-terracotta-dark)]">
              {pad(unit.value)}
            </span>
            <p className="mt-2 text-[0.58rem] font-semibold tracking-[0.14em] text-[var(--color-terracotta)] uppercase sm:text-[0.64rem]">
              {unit.label}
            </p>
          </div>
        </div>
      ))}
    </HScroll>
  );
}

/** Layout 5 — solid filled circles, inverted type, leaf accents. */
function FloraTimer({ units }: { units: Unit[] }) {
  return (
    <div className="relative flex items-center justify-center gap-2 sm:gap-3">
      <TripleLeaf className="hidden h-5 w-5 shrink-0 text-[var(--color-terracotta)] opacity-70 sm:block md:h-6 md:w-6" />
      <HScroll contentClassName="gap-2.5 sm:gap-4 md:gap-5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex h-[5.1rem] w-[5.1rem] shrink-0 flex-col items-center justify-center rounded-full bg-[var(--color-terracotta-dark)] text-[var(--color-linen-card)] shadow-[0_8px_20px_#87361b33] sm:h-[6.25rem] sm:w-[6.25rem]"
          >
            <span className="text-[clamp(1.4rem,3.8vw,2rem)] font-bold leading-none">
              {pad(unit.value)}
            </span>
            <p className="mt-1.5 text-[0.56rem] font-semibold tracking-[0.14em] text-[color-mix(in_srgb,var(--color-linen-card)_88%,transparent)] uppercase sm:text-[0.62rem]">
              {unit.label}
            </p>
          </div>
        ))}
      </HScroll>
      <TripleLeaf className="hidden h-5 w-5 shrink-0 text-[var(--color-terracotta)] opacity-70 sm:block md:h-6 md:w-6" />
    </div>
  );
}

export default function HouseCountdown({
  field,
  editing,
  eventDateIso,
  weekday,
  day,
  monthYear,
  time,
  layout,
  onLayoutChange,
  onEventDateChange,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  eventDateIso?: string;
  weekday?: string;
  day?: string;
  monthYear?: string;
  time?: string;
  layout?: string;
  onLayoutChange?: (layout: HouseCountdownLayout) => void;
  onEventDateChange?: (value: string) => void;
}) {
  const countdown = useCountdown(eventDateIso || "");
  const [dateError, setDateError] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const minDateTime = minDatetimeLocal();
  const canEditDate = Boolean(editing && onEventDateChange);

  function openDatePicker() {
    const input = dateInputRef.current;
    if (!input) return;
    try {
      if (typeof input.showPicker === "function") {
        void input.showPicker();
        return;
      }
    } catch {
      // Fall through to focus/click for browsers that block showPicker.
    }
    input.focus();
    input.click();
  }

  const activeLayout = normalizeLayoutId(
    layout,
    HOUSE_COUNTDOWN_LAYOUTS,
    "outline",
    HOUSE_COUNTDOWN_LAYOUT_ALIASES
  );

  const units: Unit[] = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  const fallbackParts = eventDateIso ? partsFromEventDate(eventDateIso, "house") : null;
  const displayWeekday = weekday || fallbackParts?.weekday || "";
  const displayDay = day || fallbackParts?.day || "";
  const displayMonthYear = monthYear || fallbackParts?.monthYear || "";
  const displayTime = time || fallbackParts?.time || "";

  const dateNode = (
    <span>
      {displayWeekday ? `${displayWeekday}, ` : ""}
      {displayDay} {displayMonthYear}
    </span>
  );
  const timeNode = <span>{displayTime}</span>;
  const heading = countdown.live ? field("countdownLiveLabel") : field("countdownHeading");

  const editTrigger = canEditDate ? (
    <TapToChangeButton
      dateInputRef={dateInputRef}
      minDateTime={minDateTime}
      eventDateIso={eventDateIso}
      onEventDateChange={onEventDateChange}
      setDateError={setDateError}
      openDatePicker={openDatePicker}
    />
  ) : null;

  const meta =
    activeLayout === "capsule" || activeLayout === "dividers" ? (
      <MetaBare
        dateNode={dateNode}
        timeNode={timeNode}
        editTrigger={editTrigger}
        onChipClick={canEditDate ? openDatePicker : undefined}
        isEditable={canEditDate}
      />
    ) : activeLayout === "flora" ? (
      <MetaBare
        dateNode={dateNode}
        timeNode={timeNode}
        editTrigger={editTrigger}
        onChipClick={canEditDate ? openDatePicker : undefined}
        isEditable={canEditDate}
        framed
      />
    ) : (
      <MetaPills
        dateNode={dateNode}
        timeNode={timeNode}
        editTrigger={editTrigger}
        onChipClick={canEditDate ? openDatePicker : undefined}
        isEditable={canEditDate}
      />
    );

  const title =
    activeLayout === "outline" ? (
      <HeadingBlock variant="arrows">{heading}</HeadingBlock>
    ) : activeLayout === "tabs" ? (
      <HeadingBlock variant="leaves">{heading}</HeadingBlock>
    ) : (
      <HeadingBlock variant="lines">{heading}</HeadingBlock>
    );

  const timer =
    activeLayout === "capsule" ? (
      <CapsuleTimer units={units} />
    ) : activeLayout === "tabs" ? (
      <TabsTimer units={units} />
    ) : activeLayout === "dividers" ? (
      <DividersTimer units={units} />
    ) : activeLayout === "flora" ? (
      <FloraTimer units={units} />
    ) : (
      <OutlineTimer units={units} />
    );

  return (
    <section
      id="countdown"
      className={`relative z-[2] mx-auto w-full max-w-[940px] px-4 pt-3 pb-10 text-center sm:px-6 sm:pt-4 sm:pb-12 is-layout-${activeLayout}`}
    >
      {editing && onLayoutChange ? (
        <LayoutPicker
          className="hw-layout-picker relative z-[2] mb-7 w-full max-w-[820px] sm:mb-8"
          options={HOUSE_COUNTDOWN_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Countdown"
        />
      ) : null}

      <div className="relative z-[1]">
        {meta}
        {dateError ? (
          <p className="mt-[-1rem] mb-6 text-center text-[0.78rem] font-medium text-rose-700 sm:text-[0.84rem]">
            {dateError}
          </p>
        ) : null}
        {title}

        {activeLayout === "flora" ? (
          <div className="relative py-1 sm:py-2">
            <CornerVine className="pointer-events-none absolute bottom-0 left-[-4px] h-24 w-24 text-[color-mix(in_srgb,var(--color-terracotta)_55%,#c4b5a4)] opacity-80 sm:left-0 sm:h-36 sm:w-36 md:h-44 md:w-44" />
            <CornerVine
              className="pointer-events-none absolute right-[-4px] bottom-0 h-24 w-24 text-[color-mix(in_srgb,var(--color-terracotta)_55%,#c4b5a4)] opacity-80 sm:right-0 sm:h-36 sm:w-36 md:h-44 md:w-44"
              flip
            />
            <div className="relative z-[1] px-6 py-3 sm:px-12 sm:py-5 md:px-16">{timer}</div>
          </div>
        ) : (
          timer
        )}
      </div>
    </section>
  );
}
