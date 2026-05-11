import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";

export const metadata = {
  title: "Data Deletion Status — ThreadLens",
};

export default function DataDeletionStatusPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  return (
    <LegalShell
      title={
        <>
          Data Deletion <em>Confirmed</em>
        </>
      }
      meta={
        <>
          <span className="pill">Processed via Meta callback</span>
          <span className="sep"></span>
          <span>Permanent &amp; irreversible</span>
        </>
      }
    >
      <div className="status-panel">
        <div className="status-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8.5l3 3 6-6.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h2>Your data has been deleted</h2>
          <p>
            We received and processed a data deletion request from Meta. All posts, insights, analysis history, and the
            encrypted access token associated with the matching Threads account have been permanently removed from our
            database.
          </p>
          <p>
            If you want to reconnect a Threads account in the future, you can register and authorize it again at any
            time from the home page.
          </p>
          {searchParams.code ? (
            <div className="status-code">
              <span className="k">Confirmation code</span>
              <code>{searchParams.code}</code>
            </div>
          ) : null}
        </div>
      </div>

      <h2>
        <span className="num">01</span>What this confirms
      </h2>
      <ul>
        <li>The Threads access token for the revoked account has been deleted.</li>
        <li>All synced posts, media URLs, permalinks, and timestamps have been removed.</li>
        <li>All synced per-post and account-level insights have been removed.</li>
        <li>All AI analysis history generated for that account has been removed.</li>
      </ul>

      <h2>
        <span className="num">02</span>Need to verify?
      </h2>
      <p>
        Email <a href="mailto:bhskindatabase@gmail.com">bhskindatabase@gmail.com</a> with your confirmation code and we
        will respond with the deletion status on record. For the full process, see our{" "}
        <Link href="/data-deletion">data deletion instructions</Link>.
      </p>
    </LegalShell>
  );
}
