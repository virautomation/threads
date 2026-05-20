# ThreadLens — App Review Screencast Script (Subtitles)

Subtitles are written in English for Meta reviewers. Each line = one on-screen caption.
Permission under review: **`threads_content_publish`** (plus existing `threads_basic`, `threads_manage_insights`).
Core point to demonstrate: **the user writes or approves every post and presses Publish — nothing is auto-posted.**

---

## 1. Landing page
- This is ThreadLens — Threads analytics and posting, built on the official Threads API.
- It helps creators understand their performance and publish their next post.
- All access is through Meta's official OAuth and Threads Graph API.

## 2. Privacy Policy
- Our Privacy Policy explains what data we access and how we use it.

## 3. Terms of Service
- Our Terms describe acceptable use of ThreadLens.

## 4. Data Deletion
- Users can request deletion of their data at any time.

## 5. Cookie Policy
- We only use essential cookies for login sessions — no third-party tracking.

## 6. Sign in
- A user signs in to ThreadLens with email and password.
- ThreadLens never asks for the Threads or Instagram password.

## 7. Dashboard
- After signing in, the user sees their analytics dashboard.
- Views, engagement rate, replies, and reposts are pulled from the Threads API.
- This is the read-only analytics side of the product.

## 8. Settings → Add account
- In Settings, the user connects a Threads account.
- Clicking "Connect Threads" opens Meta's official OAuth screen.
- Here the user grants scoped permissions, including content publishing.
- The user stays on Meta's domain to authorize — no password is shared with us.
- After approving, the account is connected and ready.

---

## 9. Compose (detailed — this is the `threads_content_publish` flow)

### 9a. Open Compose
- The user opens the Compose page to write a new post.
- They are posting as their own connected Threads account.

### 9b. Optional AI draft suggestions
- The user can optionally ask AI for draft ideas — this is optional, not required.
- They type a short brief, then click "Suggest drafts".
- AI returns a few suggestions, grounded in the user's own best-performing posts.
- These are only suggestions — the user is in full control.

### 9c. Choose and edit (human-in-the-loop)
- The user clicks a suggestion to load it into the editor.
- Now the user edits the text freely — every word is under their control.
- A character counter enforces the 500-character Threads limit.
- The user can also write a post entirely from scratch, without AI.

### 9d. Long thread (optional)
- For a longer thread, the user adds parts with "Add part".
- Each part becomes a connected reply — the comment-in-comment thread layout.

### 9e. Live preview
- A live preview shows exactly how the post will appear on Threads.
- The user can confirm the layout before anything is published.

### 9f. Publish — explicit user action
- When ready, the user clicks "Publish to Threads".
- A confirmation dialog asks the user to approve before publishing.
- The user confirms — this explicit action is required every time.
- Nothing is ever posted automatically or in the background.

### 9g. Confirmation
- The post is published successfully to the user's Threads account.
- A link lets the user open the live post.

### 9h. Verify on Threads
- We open Threads to confirm the post is now live on the user's profile.
- The published content matches exactly what the user wrote and approved.
- This completes the content-publishing flow using `threads_content_publish`.

---

## Closing
- To summarize: ThreadLens reads analytics, and publishes only posts the user writes and approves.
- Every publish is an explicit, manual action by the account owner.
- Thank you for reviewing ThreadLens.
