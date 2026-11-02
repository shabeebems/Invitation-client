import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { BRAND_NAME } from "@/lib/brand";
import { SUPPORT_EMAIL } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy — ${BRAND_NAME}`,
  description: `When and how you can get a refund for an invitation on ${BRAND_NAME}.`,
};

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      intro={
        <p>
          Each {BRAND_NAME} invitation is a digital product that is published and delivered the moment your
          payment is confirmed. Because of that, payments are generally non-refundable. We do refund in the
          situations below, where something went wrong on our side.
        </p>
      }
    >
      <h2>1. When you can get a full refund</h2>
      <ul>
        <li>
          <strong>Charged, but the invitation was not published:</strong> money was taken but your invitation
          did not go live, and we cannot fix it within 2 working days of you telling us.
        </li>
        <li>
          <strong>Charged twice:</strong> you were charged more than once for the same invitation. We refund
          the extra payments.
        </li>
        <li>
          <strong>The invitation does not work:</strong> a fault in our template stops guests from viewing
          your invitation properly, and we cannot fix it within 3 working days of you telling us.
        </li>
      </ul>

      <h2>2. When refunds are not given</h2>
      <ul>
        <li>You changed your mind after the invitation was published.</li>
        <li>
          There is a mistake in the names, dates or other details. You can edit your invitation at any time
          after publishing, free of charge.
        </li>
        <li>
          The event was postponed or cancelled. You can update the date and details of your invitation
          instead.
        </li>
        <li>
          You want a different design. You can change the colour theme of your invitation; a different
          template is a new invitation.
        </li>
        <li>The request is made more than 7 days after the payment.</li>
      </ul>

      <h2>3. How to ask for a refund</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> within 7 days of your payment, from the
        email address on your {BRAND_NAME} account. Please include:
      </p>
      <ul>
        <li>The link to your invitation.</li>
        <li>
          The Razorpay payment ID (it starts with <strong>pay_</strong> and is in the payment receipt
          Razorpay sends you) or the date and amount of the payment.
        </li>
        <li>A short description of the problem, with a screenshot if you can.</li>
      </ul>
      <p>We will reply within 2 working days.</p>

      <h2>4. How refunds are paid</h2>
      <p>
        Approved refunds are sent back to the original payment method through Razorpay. Once we approve
        it, the refund usually reaches your account within <strong>5 to 7 working days</strong>, depending
        on your bank or card issuer. When we refund an invitation in full, it is unpublished.
      </p>

      <h2>5. Cancellation</h2>
      <p>
        There are no subscriptions, so there is nothing to cancel later. You can cancel any time before
        paying simply by closing the checkout. Once payment is confirmed and the invitation is published,
        the order is complete and cannot be cancelled, but the refund cases above still apply.
      </p>

      <h2>6. Failed or pending payments</h2>
      <p>
        If money left your account but the payment shows as failed, it is usually returned to you
        automatically by your bank or by Razorpay within 5 to 7 working days. If it has not arrived after
        that, email us with the details and we will help you trace it.
      </p>

      <h2>7. Delivery</h2>
      <p>
        Nothing is shipped. Your invitation is delivered online at its own link as soon as your payment is
        confirmed. See our <Link href="/terms">Terms of Service</Link> for details.
      </p>
    </LegalPage>
  );
}
