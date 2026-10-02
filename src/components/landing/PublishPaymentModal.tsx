"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Step = "pay" | "result" | "working" | "failed";

export default function PublishPaymentModal({
  open,
  invitationName,
  onClose,
  onSuccess,
}: {
  open: boolean;
  invitationName: string;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}) {
  const [step, setStep] = useState<Step>("pay");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    setStep("pay");
    setError("");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !mounted) {
    return null;
  }

  async function confirmSuccess() {
    setStep("working");
    setError("");

    try {
      await onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish invitation");
      setStep("failed");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100200] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-pay-title"
        className="w-full max-w-md rounded-[28px] bg-[#faf6ee] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        {step === "pay" ? (
          <>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#8a7048] uppercase">
              Publish invitation
            </p>
            <h2 id="publish-pay-title" className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
              Pay and continue
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Complete payment to publish{" "}
              <span className="font-semibold text-zinc-800">{invitationName}</span> and get a
              guest-ready link.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setStep("result")}
                className="rounded-full bg-[#143027] px-5 py-3 text-sm font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
              >
                Pay and continue
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
              >
                Cancel
              </button>
            </div>
          </>
        ) : null}

        {step === "result" ? (
          <>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#8a7048] uppercase">
              Payment result
            </p>
            <h2 id="publish-pay-title" className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
              Did the payment go through?
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Choose the payment result to continue. Success will create your invitation.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => void confirmSuccess()}
                className="rounded-full bg-[#143027] px-5 py-3 text-sm font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
              >
                Success
              </button>
              <button
                type="button"
                onClick={() => {
                  setError("Payment failed. You can try again when you are ready.");
                  setStep("failed");
                }}
                className="rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:border-red-300"
              >
                Failure
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-3 text-sm font-semibold text-zinc-500 hover:text-zinc-800"
              >
                Cancel
              </button>
            </div>
          </>
        ) : null}

        {step === "working" ? (
          <>
            <h2 id="publish-pay-title" className="text-2xl font-bold tracking-tight text-zinc-900">
              Publishing…
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Creating your invitation and guest link. This only takes a moment.
            </p>
          </>
        ) : null}

        {step === "failed" ? (
          <>
            <h2 id="publish-pay-title" className="text-2xl font-bold tracking-tight text-zinc-900">
              Could not finish
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {error || "Something went wrong. Try again or cancel for now."}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setStep("pay");
                }}
                className="rounded-full bg-[#143027] px-5 py-3 text-sm font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 hover:border-zinc-500"
              >
                Cancel
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
