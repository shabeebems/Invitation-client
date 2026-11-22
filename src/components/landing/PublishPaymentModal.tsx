"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  createPaymentOrder,
  verifyPayment,
  type PaymentOrder,
  type PaymentVerifyResult,
} from "@/lib/api";
import { loadRazorpayScript } from "@/lib/useRazorpay";
import { BRAND_MARK_SRC } from "@/lib/brand";

type ModalStep =
  | "loading"
  | "ready"
  | "paying"
  | "verifying"
  | "publishing"
  | "fulfill"
  | "success"
  | "error";

interface PublishPaymentModalProps {
  open: boolean;
  templateId?: string;
  workSlug?: string;
  invitationName: string;
  onClose: () => void;
  /** Create/link the invitation after payment. Return the live work slug when known. */
  onSuccess: (orderId?: string) => Promise<string | undefined | void> | string | undefined | void;
}

const emptySubscribe = () => () => {};

const BUSY_STEPS: ModalStep[] = ["loading", "paying", "verifying", "publishing"];

function razorpayLogoUrl(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const host = window.location.hostname;
  const isLoopback =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".local") ||
    /^(10|127|169\.254|192\.168|172\.(1[6-9]|2\d|3[0-1]))\./.test(host);

  if (isLoopback) {
    return undefined;
  }

  return `${window.location.origin}${BRAND_MARK_SRC}`;
}

export default function PublishPaymentModal({
  open,
  templateId = "",
  workSlug,
  invitationName,
  onClose,
  onSuccess,
}: PublishPaymentModalProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [step, setStep] = useState<ModalStep>("loading");
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [liveSlug, setLiveSlug] = useState("");
  const [copied, setCopied] = useState(false);
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setPaymentConfirmed(false);
    setLiveSlug("");
    setCopied(false);
    setError("");
    setStep("loading");
    setOrder(null);

    let isCancelled = false;
    void createPaymentOrder({
      templateId,
      workSlug,
      draftName: invitationName,
    })
      .then(async (newOrder) => {
        if (isCancelled) {
          return;
        }

        setOrder(newOrder);

        if (newOrder.alreadyPaid) {
          setPaymentConfirmed(true);
          await fulfillInvitation(newOrder.orderId);
          return;
        }

        setStep("ready");
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Failed to prepare payment order");
          setStep("error");
        }
      });

    return () => {
      isCancelled = true;
    };
    // fulfillInvitation is stable enough via refs; retryCount restarts order creation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, templateId, workSlug, invitationName, retryCount]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  async function fulfillInvitation(orderId: string, verified?: PaymentVerifyResult) {
    setStep("publishing");
    setError("");

    try {
      const publishedSlug = (await onSuccessRef.current(orderId)) || verified?.workSlug || "";
      if (publishedSlug) {
        setLiveSlug(publishedSlug);
      } else if (verified?.publishedUrl?.startsWith("/")) {
        setLiveSlug(verified.publishedUrl.slice(1));
      }
      setStep("success");
    } catch (publishErr) {
      setError(
        publishErr instanceof Error
          ? publishErr.message
          : "Payment went through, but we could not finish publishing."
      );
      setStep("fulfill");
    }
  }

  async function handleRealPayment() {
    if (!order) return;
    setStep("paying");
    setError("");

    try {
      if (order.gatewayOrderId.startsWith("order_mock_") && !order.isMock) {
        setStep("loading");
        setRetryCount((count) => count + 1);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Could not load Razorpay payment SDK. Please check your internet connection.");
      }

      const logo = razorpayLogoUrl();
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Save the Kath",
        description: `Publish ${invitationName || "Invitation"}`,
        order_id: order.gatewayOrderId,
        ...(logo ? { image: logo } : {}),
        prefill: {
          name: order.customerName || "Customer",
          email: order.customerEmail || "",
          ...(order.customerPhone ? { contact: order.customerPhone } : {}),
        },
        handler: async (res) => {
          setStep("verifying");
          try {
            const verified = await verifyPayment({
              orderId: order.orderId,
              razorpayOrderId: res.razorpay_order_id || order.gatewayOrderId,
              razorpayPaymentId: res.razorpay_payment_id || `pay_mock_${Date.now()}`,
              razorpaySignature: order.isMock ? "mock_signature" : res.razorpay_signature,
            });

            setPaymentConfirmed(true);
            await fulfillInvitation(order.orderId, verified);
          } catch (verifyErr) {
            setError(verifyErr instanceof Error ? verifyErr.message : "Payment verification failed");
            setStep("error");
          }
        },
        modal: {
          ondismiss: () => {
            setStep("ready");
          },
        },
        theme: {
          color: "#183C2C",
        },
      });

      rzp.on("payment.failed", (response) => {
        const failed = response as { error?: { description?: string } };
        setError(failed.error?.description || "Payment failed");
        setStep("error");
      });

      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open payment gateway");
      setStep("ready");
    }
  }

  function requestClose() {
    if (BUSY_STEPS.includes(step)) {
      return;
    }
    onClose();
  }

  const livePath = liveSlug ? `/${liveSlug}` : "";
  const liveUrl = livePath && typeof window !== "undefined" ? `${window.location.origin}${livePath}` : livePath;

  async function copyLiveLink() {
    if (!liveUrl) return;
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100200] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={requestClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        className="my-auto w-full max-w-lg max-h-[min(92vh,52rem)] overflow-y-auto rounded-[28px] border border-stone-200/60 bg-[#FAF8F5] p-6 text-stone-900 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#E7EBDD] px-3 py-1 text-[11px] font-semibold tracking-wider text-[#183C2C] uppercase">
              Publish & Host
            </span>
            <h2 id="payment-modal-title" className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
              {step === "fulfill"
                ? "Payment received"
                : step === "success"
                  ? "You're live"
                  : "Complete Payment"}
            </h2>
          </div>
          <button
            type="button"
            onClick={requestClose}
            disabled={BUSY_STEPS.includes(step)}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200/50 hover:text-stone-700 disabled:opacity-40"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {step === "loading" && (
          <div className="my-10 flex flex-col items-center justify-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#183C2C] border-t-transparent" />
            <p className="text-sm font-medium text-stone-600">Generating secure payment order…</p>
          </div>
        )}

        {(step === "verifying" || step === "publishing") && (
          <div className="my-10 flex flex-col items-center justify-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#183C2C] border-t-transparent" />
            <p className="text-base font-semibold text-stone-800">
              {step === "verifying" ? "Verifying signature…" : "Activating your invitation…"}
            </p>
            <p className="text-xs text-stone-500">Please do not close or refresh this tab.</p>
          </div>
        )}

        {(step === "ready" || step === "paying") && order && (
          <div className="mt-5 space-y-5">
            <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Invitation</span>
                <span className="max-w-[220px] truncate text-sm font-semibold text-stone-800">
                  {invitationName || "Digital Celebration"}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#183C2C]">✓</span> Unlimited guest visits with zero watermark
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#183C2C]">✓</span> WhatsApp sharing with a custom message
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#183C2C]">✓</span> Integrated Google Maps & Calendar (.ics)
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#E7EBDD]/60 p-4">
              <div>
                <p className="text-xs font-medium text-[#183C2C]/80">Total Amount</p>
                <p className="text-xs text-stone-500">One-time payment • All features included</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tracking-tight text-[#183C2C]">{order.displayAmount}</p>
                {order.actualDisplayAmount ? (
                  <s className="text-xs text-stone-500">{order.actualDisplayAmount}</s>
                ) : null}
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                disabled={step === "paying"}
                onClick={() => void handleRealPayment()}
                className="w-full rounded-full bg-[#183C2C] px-5 py-3.5 text-base font-semibold text-[#F1EFE8] shadow-md transition hover:bg-[#23503B] disabled:opacity-70"
              >
                {step === "paying" ? "Opening Razorpay…" : `Pay ${order.displayAmount} via Razorpay`}
              </button>
              <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500">
                <span>🔒 256-bit Encrypted</span>
                <span>•</span>
                <span>UPI / Cards / NetBanking</span>
              </div>
              <p className="text-center text-[11px] leading-relaxed text-stone-500">
                By paying, you agree to our{" "}
                <a href="/terms" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-stone-700">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/refund" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-stone-700">
                  Refund Policy
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">
                {paymentConfirmed ? "Could not finish publishing" : "Payment Could Not Complete"}
              </p>
              <p className="mt-1 text-xs text-red-700">{error || "An unexpected error occurred."}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (paymentConfirmed && order) {
                    void fulfillInvitation(order.orderId);
                    return;
                  }
                  setStep("loading");
                  setError("");
                  setRetryCount((c) => c + 1);
                }}
                className="flex-1 rounded-full bg-[#183C2C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#23503B]"
              >
                {paymentConfirmed ? "Finish setup" : "Try Again"}
              </button>
              <button
                type="button"
                onClick={requestClose}
                className="rounded-full border border-stone-300 px-5 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {step === "fulfill" && order && (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <p className="font-semibold">Your payment went through</p>
              <p className="mt-1 text-xs text-amber-900/80">
                We could not finish creating your live invitation. Tap finish setup — you will not be charged
                again.
              </p>
              {error ? <p className="mt-2 text-xs text-amber-900/70">{error}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => void fulfillInvitation(order.orderId)}
              className="w-full rounded-full bg-[#183C2C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#23503B]"
            >
              Finish setup
            </button>
            <button
              type="button"
              onClick={requestClose}
              className="w-full rounded-full border border-stone-300 px-5 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              Close for now
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="my-6 flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-600">
              ✓
            </div>
            <h3 className="text-xl font-bold text-stone-900">Payment Confirmed!</h3>
            <p className="text-xs text-stone-600">Your invitation is live and ready to share.</p>
            {livePath ? (
              <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
                <Link
                  href={`/user/published/${liveSlug}`}
                  className="flex-1 rounded-full bg-[#183C2C] px-4 py-2.5 text-center text-xs font-semibold text-white hover:bg-[#23503B]"
                >
                  View invitation
                </Link>
                <button
                  type="button"
                  onClick={() => void copyLiveLink()}
                  className="flex-1 rounded-full border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
                >
                  {copied ? "Copied" : "Copy guest link"}
                </button>
              </div>
            ) : (
              <Link
                href="/user/invitations"
                className="mt-2 rounded-full bg-[#183C2C] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#23503B]"
              >
                Go to My invitations
              </Link>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
