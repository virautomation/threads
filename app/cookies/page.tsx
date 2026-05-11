import { LegalShell } from "@/components/legal-shell";

export const metadata = {
  title: "Cookie Policy — ThreadLens",
};

export default function CookiePolicyPage() {
  return (
    <LegalShell
      title={
        <>
          Cookie <em>Policy</em>
        </>
      }
      meta={
        <>
          <span className="pill">Effective · April 20, 2026</span>
          <span className="sep"></span>
          <span>Essential cookies only · no tracking</span>
        </>
      }
    >
      <h2>
        <span className="num">01</span>Summary
      </h2>
      <p>
        ThreadLens uses only <b>essential cookies</b> required to keep you signed in and to make the service work. We do
        not use analytics cookies, advertising cookies, or any third-party tracking cookies. There is no consent banner
        because no non-essential cookies are set.
      </p>
      <div className="callout">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <b>No tracking. No third-party advertising.</b>
          <p>We do not embed Google Analytics, Meta Pixel, Hotjar, or any similar tracker on this domain.</p>
        </div>
      </div>

      <h2>
        <span className="num">02</span>What is a cookie?
      </h2>
      <p>
        A cookie is a small text file that a website stores in your browser. Cookies let the site remember information
        between page loads — for example, that you are signed in. Cookies are either <b>essential</b> (required for the
        service to work) or <b>non-essential</b> (analytics, marketing, personalization). ThreadLens only uses essential
        cookies.
      </p>

      <h2>
        <span className="num">03</span>The cookies we set
      </h2>
      <table className="cookie-table" aria-label="Cookies">
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Type</th>
            <th>Expires</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>threadlens_session</td>
            <td>Maintains your signed-in session. Stored as an httpOnly, secure, signed JWT.</td>
            <td>
              <span className="type">Essential</span>
            </td>
            <td>7 days</td>
          </tr>
          <tr>
            <td>threadlens_active_account</td>
            <td>Remembers which Threads account is currently selected in the account switcher.</td>
            <td>
              <span className="type">Essential</span>
            </td>
            <td>30 days</td>
          </tr>
          <tr>
            <td>threads_oauth_state</td>
            <td>
              A short-lived value used to verify the OAuth <code>state</code> parameter and prevent CSRF on the Threads
              sign-in flow.
            </td>
            <td>
              <span className="type">Essential</span>
            </td>
            <td>10 minutes</td>
          </tr>
        </tbody>
      </table>

      <h2>
        <span className="num">04</span>Local storage
      </h2>
      <p>
        In addition to cookies above, we use your browser&apos;s <b>localStorage</b> to remember non-sensitive UI
        preferences — for example, your preferred date range, sort order, or whether the sidebar is collapsed. These
        values never leave your browser and are not transmitted to our servers.
      </p>

      <h2>
        <span className="num">05</span>Third-party services
      </h2>
      <p>
        The Threads sign-in window is hosted by Meta on their own domains; cookies set there are governed by{" "}
        <a href="https://www.facebook.com/policy.php" rel="noopener" target="_blank">
          Meta&apos;s cookie policy
        </a>
        , not ours. Our application is hosted on Vercel and our database is hosted on Supabase, neither of which set
        cookies on your browser through ThreadLens.
      </p>

      <h2>
        <span className="num">06</span>Managing or disabling cookies
      </h2>
      <ul>
        <li>You can clear or block cookies in your browser settings at any time.</li>
        <li>
          Disabling the cookies listed above will sign you out and prevent ThreadLens from working correctly — there is
          no anonymous mode for the dashboard.
        </li>
        <li>To clear the OAuth state cookie specifically, simply close the sign-in tab; it expires within 10 minutes
          anyway.</li>
      </ul>

      <h2>
        <span className="num">07</span>Changes to this policy
      </h2>
      <p>
        If we ever introduce additional cookies — for example, if we add an opt-in analytics tool — we will update this
        page and require explicit consent before any non-essential cookie is set.
      </p>

      <h2>
        <span className="num">08</span>Contact
      </h2>
      <p>
        <a href="mailto:bhskindatabase@gmail.com">bhskindatabase@gmail.com</a>
        <br />
        Indo Berkah Solution · Jakarta, Indonesia
      </p>
    </LegalShell>
  );
}
