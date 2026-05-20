import Link from "next/link";
import { getSession } from "@/lib/session";
import "./page.css";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const session = await getSession();
  const primaryHref = session ? "/dashboard" : "/register";
  const dashboardHref = session ? "/dashboard" : "/login";

  return (
    <div className="tl-lp">
      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8s2.91 6.5 6.5 6.5S14.5 11.59 14.5 8c0-2.06-.96-3.9-2.46-5.08" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="8" cy="8" r="2" fill="currentColor" />
              </svg>
            </span>
            ThreadLens
          </Link>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#security">Security</a>
            <a href="#compliance">Compliance</a>
            <Link href="/privacy-policy">Docs</Link>
          </div>
          <div className="nav-cta">
            {session ? (
              <Link className="btn btn-primary btn-sm" href="/dashboard">
                Open Dashboard
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : (
              <>
                <Link className="btn btn-ghost" href="/login">Sign in</Link>
                <Link className="btn btn-primary btn-sm" href="/register">
                  Open Dashboard
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-pill">
              <span className="hero-pill-tag">Live</span>
              Built on the official Threads API
            </div>
            <h1>
              The analytics<br />
              layer for <em>Threads.</em>
            </h1>
            <p className="lede">
              ThreadLens turns your Threads account into a clean, exportable performance dashboard. Track engagement, surface what&apos;s working, get AI-assisted recommendations — then draft and publish your next post, all through Meta&apos;s official Threads API.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary btn-icon-trail" href={primaryHref}>Connect Threads </Link>
              <Link className="btn btn-secondary" href={dashboardHref}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 13V3M6 13V7M10 13V9M14 13V5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Open Dashboard
              </Link>
            </div>
            <div className="micro-trust">
              <span className="micro-trust-item">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l5.5 2.5v4.6c0 3.2-2.2 6.1-5.5 7.1-3.3-1-5.5-3.9-5.5-7.1V3.5L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M5.5 8l1.8 1.8L10.8 6.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                OAuth 2.0 — no password collected
              </span>
              <span className="micro-trust-item">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="2.5" y="7" width="11" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Encrypted tokens, TLS 1.3
              </span>
              <span className="micro-trust-item">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5.6 8.2l1.7 1.7L10.6 6.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Disconnect any time
              </span>
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="preview-shell" aria-hidden="true">
            <div className="preview-chrome">
              <div className="chrome-dots"><span></span><span></span><span></span></div>
              <div className="chrome-url">
                <span className="chrome-url-inner">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  app.threadlens.io/overview
                </span>
              </div>
              <div style={{ width: 48 }}></div>
            </div>
            <div className="dash">
              <div className="dash-row">
                <div className="dash-title">
                  <div className="dash-avatar">A</div>
                  <div className="dash-name"><b>@andrea.makes</b><span>Creator · 28.4K followers</span></div>
                </div>
                <div className="dash-tabs">
                  <span className="active">Overview</span><span>Posts</span><span>Insights</span>
                </div>
              </div>

              <div className="kpi-row">
                <div className="kpi"><div className="kpi-label">Views (30d)</div><div className="kpi-value">412,908</div><div className="kpi-delta">▲ 18.3%</div></div>
                <div className="kpi"><div className="kpi-label">Engagement</div><div className="kpi-value">6.42%</div><div className="kpi-delta">▲ 1.1pp</div></div>
                <div className="kpi"><div className="kpi-label">Replies</div><div className="kpi-value">3,128</div><div className="kpi-delta">▲ 9.4%</div></div>
                <div className="kpi"><div className="kpi-label">Reposts</div><div className="kpi-value">847</div><div className="kpi-delta down">▼ 2.1%</div></div>
              </div>

              <div className="chart-card">
                <div className="chart-head">
                  <span className="t">Engagement rate · last 30 days</span>
                  <span className="sub">Apr 12 — May 11</span>
                </div>
                <svg className="chart-svg" viewBox="0 0 320 110" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke="#ececec" strokeWidth="1">
                    <line x1="0" y1="22" x2="320" y2="22" />
                    <line x1="0" y1="55" x2="320" y2="55" />
                    <line x1="0" y1="88" x2="320" y2="88" />
                  </g>
                  <path d="M0,82 L16,76 32,80 48,68 64,72 80,60 96,64 112,52 128,58 144,46 160,50 176,38 192,46 208,32 224,40 240,26 256,34 272,22 288,30 304,18 320,24 L320,110 L0,110 Z" fill="url(#g1)" />
                  <path d="M0,82 L16,76 32,80 48,68 64,72 80,60 96,64 112,52 128,58 144,46 160,50 176,38 192,46 208,32 224,40 240,26 256,34 272,22 288,30 304,18 320,24" fill="none" stroke="#0a0a0a" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                  <circle cx="320" cy="24" r="3" fill="#0a0a0a" />
                  <circle cx="320" cy="24" r="6" fill="#0a0a0a" fillOpacity="0.12" />
                </svg>
              </div>

              <div className="post-table">
                <div className="row head">
                  <span>Top posts</span>
                  <span style={{ textAlign: "right" }}>Views</span>
                  <span style={{ textAlign: "right" }}>ER</span>
                  <span style={{ textAlign: "right" }}>Trend</span>
                </div>
                <div className="row">
                  <div className="post"><span className="dot"></span><span className="txt">A short thread on the cost of context-switching…</span></div>
                  <span className="num views">48.2K</span><span className="num">9.1%</span>
                  <span className="num"><svg width="46" height="14" viewBox="0 0 46 14"><polyline points="0,10 8,8 16,9 24,5 32,6 40,3 46,4" fill="none" stroke="#15803d" strokeWidth="1.5" /></svg></span>
                </div>
                <div className="row">
                  <div className="post"><span className="dot"></span><span className="txt">Tools I quit using in 2026 (and what replaced them)</span></div>
                  <span className="num views">32.7K</span><span className="num">7.8%</span>
                  <span className="num"><svg width="46" height="14" viewBox="0 0 46 14"><polyline points="0,9 8,7 16,8 24,6 32,5 40,4 46,3" fill="none" stroke="#15803d" strokeWidth="1.5" /></svg></span>
                </div>
                <div className="row">
                  <div className="post"><span className="dot"></span><span className="txt">Reply-guy energy is a finite resource — here&apos;s…</span></div>
                  <span className="num views">21.4K</span><span className="num">6.3%</span>
                  <span className="num"><svg width="46" height="14" viewBox="0 0 46 14"><polyline points="0,7 8,8 16,6 24,7 32,5 40,6 46,5" fill="none" stroke="#737373" strokeWidth="1.5" /></svg></span>
                </div>
              </div>

              <div className="insight-card">
                <div className="ic-icon">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5l1.6 4.4 4.4 1.6-4.4 1.6L8 13.5l-1.6-4.4L2 7.5l4.4-1.6L8 1.5z" fill="currentColor" />
                  </svg>
                </div>
                <div className="ic-body">
                  <b>AI-assisted insight</b>
                  <span>Threads posted <b style={{ color: "var(--ink)" }}>Tue 8–10am</b> get 2.4× more replies. Consider scheduling your next questions during that window.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="wrap trust-strip-inner">
          <h4>Built on standards</h4>
          <div className="trust-list">
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l5.5 2.5v4.6c0 3.2-2.2 6.1-5.5 7.1-3.3-1-5.5-3.9-5.5-7.1V4L8 1.5z" stroke="currentColor" strokeWidth="1.4" /></svg>
              Official Threads API
            </div>
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="7" width="11" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" /><path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" /></svg>
              OAuth 2.0
            </div>
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.4" /><path d="M3 8h10M8 2c1.6 1.7 2.5 3.8 2.5 6S9.6 14.3 8 16M8 2C6.4 3.7 5.5 5.8 5.5 8S6.4 14.3 8 16" stroke="currentColor" strokeWidth="1.4" /></svg>
              TLS 1.3 in transit
            </div>
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M5.5 8.5l1.8 1.8 3.4-3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              AES-256 at rest
            </div>
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.4" /><path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              SOC 2-aligned controls
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow">Features</div>
              <h2 style={{ marginTop: 16, maxWidth: "18ch" }}>Everything you need to understand — and grow — your Threads presence.</h2>
            </div>
            <p className="lede" style={{ margin: 0 }}>Built for creators, brands, and businesses who want a calmer, deeper view of their content — beyond what the native app surfaces.</p>
          </div>
        </div>
        <div className="wrap" style={{ padding: "0 32px" }}>
          <div className="features">
            <div className="feature">
              <span className="feature-tag">01</span>
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="2" y="9" width="2.5" height="5" rx=".5" fill="currentColor" /><rect x="6.75" y="5" width="2.5" height="9" rx=".5" fill="currentColor" /><rect x="11.5" y="2" width="2.5" height="12" rx=".5" fill="currentColor" /></svg>
              </div>
              <h3>Threads post analytics</h3>
              <p>Per-post views, likes, replies, reposts, quotes, and shares — pulled directly from the official Threads API.</p>
            </div>
            <div className="feature">
              <span className="feature-tag">02</span>
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2.5 11c1.5-3 4-4.5 5.5-4.5s4 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="8" cy="6.5" r="1.5" fill="currentColor" /></svg>
              </div>
              <h3>Engagement insights</h3>
              <p>Engagement rate, reach curves, and audience response patterns — visualized over days, weeks, and months.</p>
            </div>
            <div className="feature">
              <span className="feature-tag">03</span>
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.6 4.4 4.4 1.6-4.4 1.6L8 13.5l-1.6-4.4L2 7.5l4.4-1.6L8 1.5z" fill="currentColor" /></svg>
              </div>
              <h3>AI-assisted analysis</h3>
              <p>Plain-language summaries of what&apos;s working, why, and what to try next — generated from your own data.</p>
            </div>
            <div className="feature">
              <span className="feature-tag">04</span>
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10.5 2.5l3 3L6 13l-3.2.7.7-3.2 7-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
              </div>
              <h3>Compose &amp; publish</h3>
              <p>Draft a single post or a full thread — with optional AI suggestions in your own voice — preview the Threads layout, then publish in one click. You write or approve every post; nothing is auto-posted.</p>
            </div>
            <div className="feature">
              <span className="feature-tag">05</span>
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </div>
              <h3>Historical metrics</h3>
              <p>Keep a clean, long-term archive of your performance — well beyond the rolling window the native app exposes.</p>
            </div>
            <div className="feature">
              <span className="feature-tag">06</span>
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-2.5-2.5M8 10l2.5-2.5M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3>CSV export</h3>
              <p>Pipe any view into a CSV in one click — for reports, board decks, or your own data warehouse.</p>
            </div>
            <div className="feature">
              <span className="feature-tag">07</span>
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.6" /></svg>
              </div>
              <h3>Secure OAuth login</h3>
              <p>Sign in through Meta&apos;s standard OAuth flow. We never see or store your Threads password.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="section-tight" id="compliance">
        <div className="wrap">
          <div className="compliance">
            <div className="compliance-head">
              <div className="eyebrow">Trust &amp; compliance</div>
              <h2 style={{ marginTop: 18 }}>A platform Meta reviewers can verify in minutes.</h2>
              <p className="lede" style={{ marginTop: 18 }}>ThreadLens is built within Meta&apos;s developer policies. We use the official Threads API to read the account owner&apos;s own data, and to publish a post only when the user writes or approves it and presses Publish — nothing happens automatically or without an explicit action.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
                <Link className="btn btn-secondary btn-sm" href="/privacy-policy">Read our data use policy</Link>
                <Link className="btn btn-ghost btn-sm" href="/privacy-policy">App review summary →</Link>
              </div>
            </div>
            <ul className="compliance-list">
              <li>
                <div className="check"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div><b>Uses Meta&apos;s official Threads API</b><span>All metrics are sourced through Meta&apos;s Threads Graph API. No scraping, no third-party data brokers.</span></div>
              </li>
              <li>
                <div className="check"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div><b>OAuth-based authentication</b><span>Users authorize ThreadLens through Meta&apos;s standard OAuth flow with granular, revocable scopes.</span></div>
              </li>
              <li>
                <div className="check"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div><b>No passwords ever collected</b><span>We never see, request, or store your Threads or Instagram password. There&apos;s no field for it anywhere.</span></div>
              </li>
              <li>
                <div className="check"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div><b>Encrypted in transit and at rest</b><span>TLS 1.3 in transit. AES-256 at rest. Access tokens stored in a managed secret vault, scoped per user.</span></div>
              </li>
              <li>
                <div className="check"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div><b>User-controlled access</b><span>Disconnect any time from your account settings. Revocation purges tokens and triggers data deletion.</span></div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="wrap">
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow">How ThreadLens works</div>
            <h2 style={{ marginTop: 16, maxWidth: "18ch" }}>From connect to insight in under a minute.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">Step</div>
              <h3>Connect Threads, securely</h3>
              <p>Sign in through Meta&apos;s official OAuth flow. You stay on Meta&apos;s domain to grant scoped, revocable access — no password ever leaves it.</p>
              <div className="step-illu">
                <svg width="100%" height="100%" viewBox="0 0 220 80" preserveAspectRatio="xMidYMid meet">
                  <rect x="20" y="14" width="180" height="52" rx="8" fill="#fff" stroke="#e3e3e3" />
                  <circle cx="42" cy="40" r="9" fill="#0a0a0a" />
                  <rect x="60" y="30" width="80" height="6" rx="3" fill="#1a1a1a" />
                  <rect x="60" y="42" width="50" height="5" rx="2.5" fill="#cfcfcf" />
                  <rect x="156" y="32" width="34" height="16" rx="4" fill="#0a0a0a" />
                  <text x="173" y="43" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Geist Mono, monospace">ALLOW</text>
                </svg>
              </div>
            </div>
            <div className="step">
              <div className="step-num">Step</div>
              <h3>Sync posts and insights</h3>
              <p>We pull your post history and engagement metrics from the Threads API — and keep them fresh on the schedule you choose.</p>
              <div className="step-illu">
                <svg width="100%" height="100%" viewBox="0 0 220 80" preserveAspectRatio="xMidYMid meet">
                  <g stroke="#e3e3e3">
                    <rect x="20" y="14" width="180" height="52" rx="8" fill="#fff" />
                    <line x1="20" y1="32" x2="200" y2="32" />
                    <line x1="20" y1="50" x2="200" y2="50" />
                  </g>
                  <g fill="#0a0a0a">
                    <rect x="32" y="23" width="42" height="5" rx="2.5" />
                    <rect x="32" y="41" width="58" height="5" rx="2.5" />
                    <rect x="32" y="59" width="34" height="5" rx="2.5" />
                  </g>
                  <g fill="#cfcfcf">
                    <rect x="160" y="23" width="28" height="5" rx="2.5" />
                    <rect x="160" y="41" width="28" height="5" rx="2.5" />
                    <rect x="160" y="59" width="28" height="5" rx="2.5" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="step">
              <div className="step-num">Step</div>
              <h3>Analyze engagement</h3>
              <p>Slice by post, day, or week. Spot top and bottom performers, audience patterns, and the rhythm of your replies.</p>
              <div className="step-illu">
                <svg width="100%" height="100%" viewBox="0 0 220 80" preserveAspectRatio="xMidYMid meet">
                  <rect x="20" y="14" width="180" height="52" rx="8" fill="#fff" stroke="#e3e3e3" />
                  <polyline points="32,58 56,46 80,52 104,34 128,42 152,22 176,30 196,18" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="196" cy="18" r="3" fill="#0a0a0a" />
                  <g stroke="#ececec">
                    <line x1="20" y1="35" x2="200" y2="35" />
                    <line x1="20" y1="55" x2="200" y2="55" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="step">
              <div className="step-num">Step</div>
              <h3>Get recommendations, then post</h3>
              <p>ThreadLens summarizes patterns in your data and drafts your next post or thread in your voice. You edit, preview the Threads layout, and publish in one click — without leaving the app.</p>
              <div className="step-illu">
                <svg width="100%" height="100%" viewBox="0 0 220 80" preserveAspectRatio="xMidYMid meet">
                  <rect x="20" y="14" width="180" height="52" rx="8" fill="#fff" stroke="#e3e3e3" />
                  <path d="M40 28l1.5 3.6 3.6 1.4-3.6 1.4L40 38l-1.5-3.6L35 33l3.5-1.4L40 28z" fill="#0a0a0a" />
                  <rect x="52" y="24" width="130" height="5" rx="2.5" fill="#1a1a1a" />
                  <rect x="52" y="34" width="100" height="5" rx="2.5" fill="#cfcfcf" />
                  <rect x="40" y="48" width="60" height="14" rx="4" fill="#0a0a0a" />
                  <text x="70" y="58" textAnchor="middle" fill="#fff" fontSize="7.5" fontFamily="Geist Mono, monospace">TRY THIS</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="section-tight" id="security">
        <div className="wrap">
          <div className="security">
            <div>
              <div className="eyebrow">Security &amp; privacy</div>
              <h2 style={{ marginTop: 18, maxWidth: "14ch" }}>Your data is yours. We just make it legible.</h2>
              <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, maxWidth: "50ch" }}>ThreadLens only acts when you tell it to. We publish a post solely when you write or approve the content and press Publish — we never auto-post, message, follow, like, or interact with anyone on your behalf. We don&apos;t sell or share data with third parties.</p>
              <ul>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Access tokens encrypted with AES-256 and rotated automatically.
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Authentication through Meta&apos;s official OAuth — never a password.
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  One-click disconnect. Revoke access and we purge your data within 24h.
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Granular scopes — analytics permissions plus content-publishing, so you can post from the app and nothing more.
                </li>
              </ul>
            </div>
            <div className="security-card" aria-hidden="true">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: "1px dashed rgba(255,255,255,.16)", marginBottom: 6 }}>
                <span style={{ color: "#fff", fontWeight: 500 }}>session.token</span>
                <span className="sec-badge green">active</span>
              </div>
              <div className="sec-row"><span>scope</span><span>threads_basic, threads_manage_insights, threads_content_publish</span></div>
              <div className="sec-row"><span>auth_method</span><span>oauth2 / meta</span></div>
              <div className="sec-row"><span>encryption</span><span>aes-256-gcm</span></div>
              <div className="sec-row"><span>transport</span><span>tls 1.3</span></div>
              <div className="sec-row"><span>storage</span><span>scoped vault, per-user</span></div>
              <div className="sec-row"><span>revoke</span><span>1-click → purge ≤ 24h</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="closer">
        <div className="wrap-narrow">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Ready when you are</div>
          <h2 style={{ marginTop: 18 }}>
            Connect your Threads account.<br />
            <span className="serif-it" style={{ color: "#444" }}>See what&apos;s actually working.</span>
          </h2>
          <p className="lede" style={{ textAlign: "center" }}>Free to try. You approve every post. Disconnect any time. No password required.</p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary btn-icon-trail" href={primaryHref}>Connect Threads </Link>
            <Link className="btn btn-secondary" href={dashboardHref}>Open Dashboard</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot">
            <div className="foot-brand">
              <Link className="brand" href="/">
                <span className="brand-mark" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8s2.91 6.5 6.5 6.5S14.5 11.59 14.5 8c0-2.06-.96-3.9-2.46-5.08" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="8" cy="8" r="2" fill="currentColor" />
                  </svg>
                </span>
                ThreadLens
              </Link>
              <p>Threads analytics for creators, brands, and businesses — built on Meta&apos;s official Threads API.</p>
              <p style={{ marginTop: 18 }}>
                <span className="mono" style={{ fontSize: 11.5, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--muted-2)" }}>Operated by</span>
                <br />
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>Indo Berkah Solution</b>
                <br />
                <a href="mailto:bhskindatabase@gmail.com" style={{ color: "var(--muted)", fontSize: 13.5 }}>bhskindatabase@gmail.com</a>
              </p>
            </div>
            <div>
              <h5>Product</h5>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how">How it works</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#compliance">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h5>Account</h5>
              <ul>
                {session ? (
                  <>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/posts">Posts</Link></li>
                    <li><Link href="/analysis">Analysis</Link></li>
                    <li><Link href="/settings">Settings</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/register">Get started</Link></li>
                    <li><Link href="/login">Sign in</Link></li>
                    <li><a href="mailto:bhskindatabase@gmail.com">Contact</a></li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h5>Legal</h5>
              <ul>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/data-deletion">Data Deletion</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="wrap" style={{ padding: 0 }}>
            <div className="foot-bottom">
              <div>© {new Date().getFullYear()} Indo Berkah Solution. All rights reserved. Threads™ is a trademark of Meta Platforms, Inc. ThreadLens is not affiliated with or endorsed by Meta.</div>
              <div className="foot-meta">
                <span>v1.0</span><span className="sep"></span><span>built on threads api</span><span className="sep"></span><span>made in jakarta</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
