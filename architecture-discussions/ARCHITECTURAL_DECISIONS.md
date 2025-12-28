# Architectural Decisions - seethru.media

**Status:** ✅ FINALIZED  
**Date:** 2025-12-28  

---

## 🏗️ 1. Infrastructure: "Engine & Fuel" Separation

To solve the conflict between **Code Reusability** (Monorepo) and **Secure Collaboration** (Sandboxing), we will adopt an Engine/Fuel architecture.

### The Engine (Core Repository)
**Repo:** `seethru-media-core` (Private)
**Access:** Core Team Only (You + CTO Agent)
**Contents:**
*   **Infrastructure:** Cloudflare Pages/Workers configuration, D1 Database triggers.
*   **Frontend Apps:**
    *   `apps/web`: The unified renderer. It dynamically routes `subdomain.seethru.media` to the correct content source.
    *   `apps/admin`: The moderation and platform management interface.
*   **Packages:**
    *   `packages/design-system`: Shared UI components (Typography, Cards, Nav).
    *   `packages/core-logic`: Shared TypeScript types, validation logic, and API clients.

### The Fuel (Content Repositories)
**Repo:** `seethru-[subdomain-name]` (Private or Public)
**Access:** Collaborators + Content Creators
**Contents:**
*   **Content:** MDX files, Images/Assets.
*   **Metadata:** `seethru.config.json` (Theme choices, navigation structure).
*   **No Application Code:** Collaborators cannot break the site build, only their content.

### The Bridge: "Pre-flight" Reviews
Collaborators cannot run `apps/web` locally. Instead:
1.  Collaborator opens a Pull Request in `seethru-molecule-every-day`.
2.  **GitHub Action** triggers.
3.  The Action sends the PR content to a standardized "Preview Environment" (or builds a lightweight preview).
4.  Bot comments on the PR with a `preview.seethru.media/...` link.

---

## 💾 2. Data Strategy: Hybrid & Transactional

### Content Storage
*   **Source of Truth:** Git Repositories (The "Fuel").
*   **Delivery Layer:** Cloudflare D1 (Database).
*   **Sync:** A "Content Ingestion" worker listens for webhook events from GitHub. When a "Fuel" repo is updated, it parses the MDX and updates the D1 Database. This makes the live site blazing fast (SQL queries) without parsing files on every request.

### Transactional Integrity (D1)
For the `submissions` and `moderation` queues (where human concurrency exists):
*   **Optimistic Locking:** Tables will have a `version` column. Updates checks `WHERE id=X AND version=Y`. If the version doesn't match, the UI tells the user "Someone else modified this," preventing race conditions.

---

## 🤖 3. The "Agentic" Workflow

### Session Context
We reject fragile "auto-snapshot" background scripts. Instead, we use a **Protocol**:
*   **Session Start:** Agent reads `planning/session_log.md`.
*   **Session End:** Agent writes a cheap update to `planning/session_log.md` (Open files, Next steps).

### Quality Gates
*   **Type Safety:** Strict TypeScript in the Engine.
*   **Content Safety:** Zod schema validation for all incoming "Fuel" (content). If a collaborator writes bad Frontmatter, the Ingestion Worker rejects it and posts an error to their PR.

---

## 🚀 4. Next Steps (Build Order)

1.  **Scaffold Core Monorepo:** Initialize `apps/web` (Astro/Next.js) and `packages/design-system`.
2.  **Define Content Types:** Write the Zod schemas for the "Fuel."
3.  **Build Ingestion Pipeline:** Create the worker that syncs Git -> D1.
