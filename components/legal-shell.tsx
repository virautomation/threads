import Link from "next/link";
import { getSession } from "@/lib/session";
import "./legal-shell.css";

type LegalShellProps = {
  eyebrow?: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
};

export async function LegalShell({ eyebrow = "Legal", title, meta, children }: LegalShellProps) {
  const session = await getSession();

  return (
    <div className="tl-legal">
      <nav className="nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8s2.91 6.5 6.5 6.5S14.5 11.59 14.5 8c0-2.06-.96-3.9-2.46-5.08"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="8" r="2" fill="currentColor" />
              </svg>
            </span>
            ThreadLens
          </Link>
          <div className="nav-links">
            <Link href="/#features">Features</Link>
            <Link href="/#how">How it works</Link>
            <Link href="/#security">Security</Link>
            <Link href="/#compliance">Compliance</Link>
          </div>
          <div className="nav-cta">
            {session ? (
              <Link className="btn btn-primary btn-sm" href="/dashboard">
                Open Dashboard
              </Link>
            ) : (
              <>
                <Link className="btn btn-ghost" href="/login">
                  Sign in
                </Link>
                <Link className="btn btn-primary btn-sm" href="/register">
                  Open Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="doc-hero">
        <div className="wrap-doc">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          {meta ? <div className="doc-meta">{meta}</div> : null}
        </div>
      </section>

      <section className="doc">
        <div className="wrap-doc">{children}</div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-row">
            <Link className="back" href="/">
              ← Back to home
            </Link>
            <div className="foot-links">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/data-deletion">Data deletion</Link>
              <Link href="/cookies">Cookies</Link>
            </div>
            <div>© {new Date().getFullYear()} ThreadLens · Indo Berkah Solution</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
