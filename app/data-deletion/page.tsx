import { LegalShell } from "@/components/legal-shell";

export const metadata = {
  title: "Data Deletion Instructions — ThreadLens",
};

export default function DataDeletionPage() {
  return (
    <LegalShell
      title={
        <>
          Data <em>Deletion</em> Instructions
        </>
      }
      meta={
        <>
          <span className="pill">Effective · April 20, 2026</span>
          <span className="sep"></span>
          <span>Three ways to remove your data</span>
        </>
      }
    >
      <p>
        ThreadLens gives you full control over your data. You can remove all data we hold about you at any time using
        one of the three methods below. Whichever path you choose, deletion is permanent and irreversible.
      </p>

      <div className="options">
        <div className="option">
          <span className="badge">Option A · Fastest</span>
          <h3>Disconnect from Settings</h3>
          <p>
            Sign in, go to <b>Settings → Connected accounts</b>, and click <b>Disconnect</b> next to the Threads account
            you want removed. All posts, insights, and analysis history for that account are deleted immediately.
          </p>
          <span className="time">Instant</span>
        </div>
        <div className="option">
          <span className="badge">Option B · Full account</span>
          <h3>Delete ThreadLens account</h3>
          <p>
            Email{" "}
            <a href="mailto:bhskindatabase@gmail.com?subject=Delete%20account">bhskindatabase@gmail.com</a> from the
            address on file, with the subject <b>&ldquo;Delete account&rdquo;</b>. We confirm, then remove your account
            and all linked data.
          </p>
          <span className="time">Within 7 days</span>
        </div>
        <div className="option">
          <span className="badge">Option C · From Threads</span>
          <h3>Revoke from Meta</h3>
          <p>
            Open Threads → <b>Settings → Apps and websites</b> and remove ThreadLens. Meta sends a signed Data Deletion
            request to our endpoint, and we delete the matching account automatically.
          </p>
          <span className="time">Within 24 h</span>
        </div>
      </div>

      <h2>
        <span className="num">01</span>What gets deleted
      </h2>
      <p>Every deletion path above removes:</p>
      <ul>
        <li>Your Threads access token (which is encrypted at rest).</li>
        <li>Your Threads profile metadata (user ID, username, display name, profile picture URL).</li>
        <li>All synced post content — text, media URLs, permalinks, timestamps.</li>
        <li>All synced insights — per-post and account-level metrics.</li>
        <li>All AI analysis history generated for that account.</li>
      </ul>
      <p>
        For <b>Option B (full account deletion)</b>, we additionally remove your ThreadLens email and password hash.
      </p>

      <h2>
        <span className="num">02</span>How to revoke from Threads / Meta
      </h2>
      <ul>
        <li>
          Open Threads, tap your profile, and go to <b>Settings</b>.
        </li>
        <li>
          Tap <b>Account → Apps and websites</b>.
        </li>
        <li>
          Find <b>ThreadLens</b> in the list of authorized apps.
        </li>
        <li>
          Tap <b>Remove</b> and confirm.
        </li>
      </ul>
      <p>
        Meta will then send a signed deletion request to our Data Deletion Callback endpoint. Our system processes it
        automatically — no further action is required from you.
      </p>

      <h2>
        <span className="num">03</span>Data Deletion Callback (for Meta reviewers)
      </h2>
      <p>
        ThreadLens implements Meta&apos;s Data Deletion Callback as required by the Platform Terms. When Meta sends a
        signed request for a given Threads user ID, we:
      </p>
      <ul>
        <li>Verify the request signature using our app secret.</li>
        <li>Locate the matching connection in our database.</li>
        <li>Delete all stored posts, insights, analysis history, and the access token.</li>
        <li>Return a confirmation URL and a tracking code.</li>
      </ul>
      <div className="endpoint" aria-label="Endpoint">
        <span className="m">POST</span>
        {"  "}
        <span className="v">https://threadlens.io/api/data-deletion</span>
        {"\n"}
        <span className="k">content-type:</span>
        {"  "}
        <span className="v">application/x-www-form-urlencoded</span>
        {"\n"}
        <span className="k">signed_request:</span>
        {"  "}
        <span className="v">&lt;signed payload from Meta&gt;</span>
        {"\n\n"}
        <span className="k">→</span>
        {"  "}
        <span className="v">
          {`{ url: "https://threadlens.io/data-deletion-status?code=<id>", confirmation_code: "<id>" }`}
        </span>
      </div>

      <h2>
        <span className="num">04</span>Track a deletion
      </h2>
      <p>
        After deletion is triggered, you can confirm completion by visiting the status URL returned in the callback
        response, or by emailing <a href="mailto:bhskindatabase@gmail.com">bhskindatabase@gmail.com</a> with your
        confirmation code.
      </p>

      <h2>
        <span className="num">05</span>Backups
      </h2>
      <p>
        Encrypted database backups are retained for up to 30 days for disaster recovery. Deleted records will be purged
        from those backups within that window. We will not restore your data from backups after deletion has been
        confirmed.
      </p>

      <h2>
        <span className="num">06</span>Contact
      </h2>
      <p>For any deletion-related question:</p>
      <p>
        <a href="mailto:bhskindatabase@gmail.com">bhskindatabase@gmail.com</a>
        <br />
        Indo Berkah Solution · Jakarta, Indonesia
      </p>
    </LegalShell>
  );
}
