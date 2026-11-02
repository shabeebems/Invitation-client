import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { BRAND_NAME } from "@/lib/brand";
import { SUPPORT_EMAIL } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Privacy Policy — ${BRAND_NAME}`,
  description: `How ${BRAND_NAME} collects, uses, stores and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <>
          <p>
            {BRAND_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) lets you design digital invitations for
            weddings, housewarmings and other celebrations, publish them, and share them with your guests
            through a single link. This policy explains what information we collect when you use{" "}
            <strong>savethekath.com</strong>, why we need it, who we share it with, and the choices you have.
          </p>
          <p>
            We only collect what we need to run the service. We do not sell your information, and we do not
            use advertising or analytics trackers.
          </p>
        </>
      }
    >
      <h2>1. Information we collect</h2>

      <h3>Account information</h3>
      <ul>
        <li>Your name and email address when you sign up.</li>
        <li>
          Your password, which we store only as a one-way hash. We never see or store your actual password.
        </li>
        <li>A phone number, if you add one to your profile.</li>
        <li>
          If you sign in with Google, we receive your name, email address, a Google account identifier and
          whether Google has verified your email. We do not get access to your Google contacts, Drive,
          Gmail or any other Google data.
        </li>
      </ul>

      <h3>Invitation content</h3>
      <p>
        Everything you type or upload into an invitation: names of the hosts, couple and family members,
        event dates and times, venue names, addresses and map links, a contact mobile number, your
        messages and stories, and photos. Photos are stored with our image hosting provider.
      </p>

      <h3>Payment information</h3>
      <p>
        Payments are processed by <strong>Razorpay</strong>. Your card, UPI or bank details are entered
        directly on Razorpay&rsquo;s checkout and never reach our servers. From each payment we keep the
        amount, the currency, the payment status, Razorpay&rsquo;s order and payment references, the email
        and phone number linked to the order, and the IP address and browser used at checkout (for fraud
        prevention and to resolve disputes).
      </p>

      <h3>Sign-in and security information</h3>
      <p>
        When you sign in we record the IP address, browser and device type, and the time of each session.
        You can see and sign out of these sessions from your profile page.
      </p>

      <h3>Emails</h3>
      <p>
        We send emails that are needed to run your account: email verification, a welcome message and
        password reset links. We do not send marketing emails.
      </p>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To create and secure your account and keep you signed in.</li>
        <li>To build, save, display and publish your invitations.</li>
        <li>To process payments, confirm them and publish the invitation you paid for.</li>
        <li>To send account emails such as verification and password reset.</li>
        <li>To prevent fraud and abuse, for example by limiting repeated sign-in attempts.</li>
        <li>To answer your support requests and handle refunds.</li>
        <li>To meet our legal, tax and accounting obligations.</li>
      </ul>

      <h2>3. Published invitations are public</h2>
      <div className="lg-callout">
        <p>
          Once published, an invitation is available at its own link (for example
          <strong> savethekath.com/your-names</strong>). <strong>Anyone who has the link can open it</strong>{" "}
          without signing in, and it shows everything you put in it, including names, photos, the venue
          address and any phone number.
        </p>
        <p>
          Only include details you are comfortable sharing with your guests, and think twice before posting
          the link somewhere public, where people you did not invite (or search engines) could find it.
        </p>
      </div>

      <h2>4. Who we share information with</h2>
      <p>
        We share information only with the service providers we use to run {BRAND_NAME}, and only what
        each one needs:
      </p>
      <table className="lg-table">
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">What it does for us</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Razorpay</td>
            <td>Processes payments.</td>
          </tr>
          <tr>
            <td>Google</td>
            <td>&ldquo;Continue with Google&rdquo; sign-in, and sending our account emails through Gmail.</td>
          </tr>
          <tr>
            <td>Cloudinary</td>
            <td>Stores and serves the photos in invitations.</td>
          </tr>
          <tr>
            <td>MongoDB Atlas</td>
            <td>Hosts our database.</td>
          </tr>
          <tr>
            <td>Amazon Web Services</td>
            <td>Runs our application server, located in Mumbai, India.</td>
          </tr>
          <tr>
            <td>Vercel</td>
            <td>Hosts and delivers the website.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Some of these providers may store or process data outside India. Each of them is bound by its own
        security and privacy commitments.
      </p>
      <p>
        We may also disclose information if the law requires it, for example in response to a valid
        request from a court or government authority, or to protect the rights and safety of our users.
      </p>

      <h2>5. Cookies and browser storage</h2>
      <p>We use only what is strictly needed for the site to work:</p>
      <ul>
        <li>
          Two sign-in cookies that keep you logged in: a short-lived one (15 minutes) and a refresh one
          (7 days). They cannot be read by scripts on the page.
        </li>
        <li>
          Your browser&rsquo;s session storage, to hold an invitation you are editing until you publish it.
          This is cleared when you close the tab.
        </li>
      </ul>
      <p>
        On the sign-in pages Google&rsquo;s sign-in script loads, and at checkout Razorpay&rsquo;s script
        loads. These providers may set their own cookies under their own privacy policies. We do not use
        analytics, advertising or tracking cookies.
      </p>

      <h2>6. How long we keep information</h2>
      <ul>
        <li>Account information and invitations are kept while your account is active.</li>
        <li>
          Published invitations currently have no fixed expiry date. If that changes, we will email you
          before your invitation is taken down.
        </li>
        <li>
          Records of past sign-in sessions are kept while your account is active, to help spot suspicious
          activity.
        </li>
        <li>
          Payment records are kept for as long as Indian tax and accounting laws require, even if you
          delete your account.
        </li>
      </ul>

      <h2>7. Your choices and rights</h2>
      <ul>
        <li>
          <strong>View and correct:</strong> you can see your details on your profile and edit your
          invitations at any time.
        </li>
        <li>
          <strong>Delete:</strong> to delete your account or an invitation, email us from your registered
          email address. We will remove your account, your invitations and their photos within 30 days,
          apart from records we must keep by law.
        </li>
        <li>
          <strong>Sessions:</strong> you can sign out of any device from your profile page.
        </li>
        <li>
          <strong>Withdraw consent:</strong> you can stop using the service and ask us to delete your
          data at any time.
        </li>
      </ul>

      <h2>8. How we protect your information</h2>
      <p>
        All traffic to our website and server is encrypted with HTTPS. Passwords are hashed, sign-in
        cookies are HTTP-only and secure, sign-in and password reset attempts are rate-limited, and access
        to our systems is restricted. No method of storage or transmission is completely secure, but we
        work to protect your information and will notify you if a breach affects your data.
      </p>

      <h2>9. Children</h2>
      <p>
        {BRAND_NAME} is meant for people aged 18 and over. We do not knowingly collect information from
        children. If you think a child has given us their information, please contact us and we will
        delete it.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        If we change this policy we will update the date at the top of this page. If the change is
        significant, we will also let you know by email or on the website.
      </p>

      <h2>11. Contact and grievances</h2>
      <p>
        For any question, request or complaint about your privacy, email our grievance contact at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We aim to reply within 7 days and to
        resolve complaints within 30 days.
      </p>
      <p>
        See also our <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/refund">Refund &amp; Cancellation Policy</Link>.
      </p>
    </LegalPage>
  );
}
