"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  createPaymentOrder,
  verifyPayment,
  type PaymentOrder,
} from "@/lib/api";
import { loadRazorpayScript } from "@/lib/useRazorpay";
import { BRAND_MARK_SRC } from "@/lib/brand";

type ModalStep = "loading" | "ready" | "paying" | "verifying" | "publishing" | "success" | "error";

interface PublishPaymentModalProps {
  open: boolean;
  templateId?: string;
  workSlug?: string;
  invitationName: string;
  onClose: () => void;
  onSuccess: (orderId?: string) => Promise<void> | void;
}

const emptySubscribe = () => () => {};

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
  const [error, setError] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!open) {
      return;
    }

    let isCancelled = false;
    void createPaymentOrder({
      templateId,
      workSlug,
      draftName: invitationName,
    })
      .then(async (newOrder) => {
        if (!isCancelled) {
          setOrder(newOrder);
          if (newOrder.alreadyPaid) {
            setStep("publishing");
            try {
              await onSuccessRef.current(newOrder.orderId);
              setStep("success");
            } catch (publishErr) {
              setError(publishErr instanceof Error ? publishErr.message : "Failed to publish updates");
              setStep("error");
            }
          } else {
            setStep("ready");
            setError("");
          }
        }
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
  }, [open, templateId, workSlug, invitationName, retryCount]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open || !mounted) {
    return null;
  }

  async function handleRealPayment() {
    if (!order) return;
    setStep("paying");
    setError("");

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Could not load Razorpay payment SDK. Please check your internet connection.");
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Save the Kath",
        image: `${window.location.origin}${BRAND_MARK_SRC}`,
        description: `Publish ${invitationName || "Invitation"}`,
        order_id: order.gatewayOrderId,
        prefill: {
          name: order.customerName || "Customer",
          email: order.customerEmail || "",
          ...(order.customerPhone ? { contact: order.customerPhone } : {}),
        },
        handler: async (res) => {
          setStep("verifying");
          try {
            await verifyPayment({
              orderId: order.orderId,
              razorpayOrderId: res.razorpay_order_id,
              razorpayPaymentId: res.razorpay_payment_id,
              razorpaySignature: res.razorpay_signature,
            });

            setStep("publishing");
            await onSuccess(order.orderId);
            setStep("success");
          } catch (verifyErr) {
            setError(
              verifyErr instanceof Error ? verifyErr.message : "Payment verification failed"
            );
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

      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open payment gateway");
      setStep("ready");
    }
  }

  async function handleSimulateSuccess() {
    if (!order) return;
    setStep("verifying");
    setError("");

    try {
      await verifyPayment({
        orderId: order.orderId,
        razorpayOrderId: order.gatewayOrderId,
        razorpayPaymentId: `pay_mock_${Date.now()}`,
        razorpaySignature: "mock_signature",
      });

      setStep("publishing");
      await onSuccess(order.orderId);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Simulation verification failed");
      setStep("error");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        className="w-full max-w-lg overflow-hidden rounded-[28px] border border-stone-200/60 bg-[#FAF8F5] p-6 text-stone-900 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#E7EBDD] px-3 py-1 text-[11px] font-semibold tracking-wider text-[#183C2C] uppercase">
              Publish & Host
            </span>
            <h2 id="payment-modal-title" className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
              Complete Payment
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200/50 hover:text-stone-700"
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

        {/* Loading state */}
        {step === "loading" && (
          <div className="my-10 flex flex-col items-center justify-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#183C2C] border-t-transparent" />
            <p className="text-sm font-medium text-stone-600">Generating secure payment order…</p>
          </div>
        )}

        {/* Verifying / Publishing state */}
        {(step === "verifying" || step === "publishing") && (
          <div className="my-10 flex flex-col items-center justify-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#183C2C] border-t-transparent" />
            <p className="text-base font-semibold text-stone-800">
              {step === "verifying" ? "Verifying signature…" : "Activating your invitation…"}
            </p>
            <p className="text-xs text-stone-500">Please do not close or refresh this tab.</p>
          </div>
        )}

        {/* Ready State */}
        {(step === "ready" || step === "paying") && order && (
          <div className="mt-5 space-y-5">
            {/* Invitation Details Card */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Invitation</span>
                <span className="max-w-[220px] truncate text-sm font-semibold text-stone-800">
                  {invitationName || "Digital Celebration"}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#183C2C]">✓</span> Lifetime digital hosting & dedicated link
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#183C2C]">✓</span> Unlimited guest visits with zero watermark
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#183C2C]">✓</span> Integrated Google Maps & Calendar (.ics)
                </li>
              </ul>
            </div>

            {/* Price Box */}
            <div className="flex items-center justify-between rounded-2xl bg-[#E7EBDD]/60 p-4">
              <div>
                <p className="text-xs font-medium text-[#183C2C]/80">Total Amount</p>
                <p className="text-xs text-stone-500">One-time payment • All features included</p>
              </div>
              <p className="text-2xl font-bold tracking-tight text-[#183C2C]">
                {order.displayAmount}
              </p>
            </div>

            {/* Mode: Mock Sandbox vs Real Razorpay */}
            {order.isMock ? (
              <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-800">
                  <span>🧪</span> Sandbox Simulation Mode
                </div>
                <p className="mt-1 leading-relaxed text-amber-800/90">
                  Razorpay credentials are currently in placeholder mode. You can simulate the complete
                  publish flow now. When production keys are added to .env, this will open the real Razorpay UPI/Cards modal.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => void handleSimulateSuccess()}
                    className="w-full rounded-full bg-[#183C2C] px-5 py-3 text-sm font-semibold text-[#F1EFE8] shadow-md transition hover:bg-[#23503B]"
                  >
                    Simulate Successful Payment ({order.displayAmount})
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleRealPayment()}
                    className="w-full rounded-full border border-[#183C2C] bg-white px-4 py-2.5 text-xs font-semibold text-[#183C2C] hover:bg-[#E7EBDD]/60"
                  >
                    Open Official Razorpay Checkout Modal anyway
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setError("Simulated payment cancellation.");
                      setStep("error");
                    }}
                    className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Simulate Payment Failure
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => void handleRealPayment()}
                  className="w-full rounded-full bg-[#183C2C] px-5 py-3.5 text-base font-semibold text-[#F1EFE8] shadow-md transition hover:bg-[#23503B]"
                >
                  Pay {order.displayAmount} via Razorpay
                </button>
                <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500">
                  <span>🔒 256-bit Encrypted</span>
                  <span>•</span>
                  <span>UPI / Cards / NetBanking</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {step === "error" && (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">Payment Could Not Complete</p>
              <p className="mt-1 text-xs text-red-700">{error || "An unexpected error occurred."}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("loading");
                  setError("");
                  setRetryCount((c) => c + 1);
                }}
                className="flex-1 rounded-full bg-[#183C2C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#23503B]"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-stone-300 px-5 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Success State */}
        {step === "success" && (
          <div className="my-8 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-stone-900">Payment Confirmed!</h3>
            <p className="text-xs text-stone-600">Your invitation is now live and published.</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
