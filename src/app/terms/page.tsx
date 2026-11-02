import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { BRAND_NAME } from "@/lib/brand";
import { SUPPORT_EMAIL } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Terms of Service — ${BRAND_NAME}`,
  description: `The terms for creating, paying for and publishing invitations on ${BRAND_NAME}.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={
        <p>
          These terms apply when you use <strong>savethekath.com</strong> ({BRAND_NAME}, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;). By creating an account, publishing an invitation or making a payment, you agree
          to them. If you do not agree, please do not use the service.
        </p>
      }
    >
      <h2>1. The service</h2>
      <p>
        {BRAND_NAME} provides ready-made digital invitation templates for weddings, housewarmings and
        other occasions. You choose a template, fill in your details and photos, and publish it as a web
        page with its own link that you can share with your guests, for example on WhatsApp.
      </p>

      <h2>2. Your account</h2>
      <ul>
        <li>You must be at least 18 years old to create an account or make a payment.</li>
        <li>
          Give us accurate details and keep your email address up to date, because we use it for
          verification, password resets and refunds.
        </li>
        <li>
          You are responsible for keeping your password safe and for everything done through your
          account. Tell us straight away if you think someone else has access to it.
        </li>
        <li>You need a verified email address before you can edit and publish invitations.</li>
      </ul>

      <h2>3. Creating and publishing invitations</h2>
      <ul>
        <li>
          While you edit, your unpublished invitation is kept in your browser tab. If you close the tab
          before publishing, those changes may be lost.
        </li>
        <li>
          Each invitation is published with a <strong>one-time payment</strong>. After payment it goes live
          straight away at its own link.
        </li>
        <li>
          After publishing you can keep editing the text, photos, sections and colour theme of your
          invitation at no extra cost. Switching to a different template means creating and paying for a
          new invitation.
        </li>
        <li>
          Anyone with the link can view a published invitation. See our{" "}
          <Link href="/privacy">Privacy Policy</Link> for what that means for the details you include.
        </li>
      </ul>

      <h2>4. Prices and payment</h2>
      <ul>
        <li>
          Prices are in Indian Rupees and are shown on each template and again at checkout before you pay.
          A price is per invitation, not per guest or per view.
        </li>
        <li>
          Payments are processed securely by Razorpay using UPI, cards, net banking or the other methods
          Razorpay offers. Razorpay&rsquo;s own terms also apply to your payment.
        </li>
        <li>
          We may change our prices or run offers at any time. A change never affects an invitation you have
          already paid for.
        </li>
        <li>
          There are no subscriptions or automatic renewals. You are charged only when you choose to pay.
        </li>
      </ul>
      <p>
        Refunds and cancellations are covered by our{" "}
        <Link href="/refund">Refund &amp; Cancellation Policy</Link>.
      </p>

      <h2>5. Delivery</h2>
      <p>
        {BRAND_NAME} is a digital service and nothing is shipped. Your invitation is delivered online as soon
        as your payment is confirmed, usually within a minute. If it is not live within 30 minutes of a
        successful payment, email us and we will sort it out.
      </p>

      <h2>6. Your content</h2>
      <ul>
        <li>
          You keep ownership of the names, text and photos you add. You give us permission to store,
          process and display them only so that we can provide your invitation to you and your guests.
        </li>
        <li>
          You must have the right to use everything you upload, and the consent of the people whose names,
          photos or contact details appear in your invitation.
        </li>
        <li>
          Do not use {BRAND_NAME} for anything unlawful, hateful, obscene, harassing, misleading or
          fraudulent, to impersonate someone, or to infringe anyone else&rsquo;s rights.
        </li>
      </ul>
      <p>
        We may remove content or suspend accounts that break these rules, or when the law requires us to.
        We will tell you if we do, unless the law prevents us.
      </p>

      <h2>7. Our designs</h2>
      <p>
        The templates, artwork, layouts, code and branding on {BRAND_NAME} belong to us or our licensors.
        Paying for an invitation gives you the right to use that design for your own event through our
        website. You may not copy, resell or redistribute the designs, or use them outside {BRAND_NAME}.
      </p>

      <h2>8. Availability</h2>
      <p>
        We work to keep {BRAND_NAME} and your invitation online, but we cannot promise the service will
        always be uninterrupted or error-free. It may occasionally be unavailable for maintenance or for
        reasons outside our control, such as outages at our hosting or payment providers.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        The service is provided &ldquo;as is&rdquo;. To the extent the law allows, we are not liable for
        indirect or consequential losses, such as a guest not seeing an invitation in time. Our total
        liability to you for any invitation is limited to the amount you paid for it.
      </p>

      <h2>10. Closing your account</h2>
      <p>
        You can stop using {BRAND_NAME} at any time and ask us to delete your account by emailing{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Deleting your account also takes down your
        published invitations.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms as the service changes. We will update the date at the top of this page
        and, for significant changes, let you know by email or on the website. Continuing to use the
        service after a change means you accept the updated terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of India, and any dispute will be handled by the courts of
        India. Before going to court, please email us so we can try to resolve the issue together.
      </p>

      <h2>13. Contact</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with any question about these terms.
      </p>
    </LegalPage>
  );
}
