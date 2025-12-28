# Initial Architecture Discussion - seethru.media

**Created:** 2025-12-26 22:32  
**Purpose:** Initial architecture discussion and requirements gathering  
**Status:** 🟡 **In Progress**

---

## Project Overview

seethru.media is a multi-subdomain blog platform designed to solve modern pain points for media publications. It will host multiple blogs, support multimedia content, enable public submissions with moderation, and integrate with payment platforms.

---

## Core Requirements

### 1. Multi-Subdomain Architecture

**Requirement:** Multiple subdomains (different blogs) that can be published to a central, searchable site.

**Considerations:**
- Each subdomain is essentially an independent blog
- Central aggregation site (seethru.media) provides unified search
- Subdomains may have different themes, content types, and access controls
- Need to support dynamic subdomain routing

**Questions:**
- How many subdomains initially? (affects architecture complexity)
- Do subdomains share user accounts or are they isolated?
- What's the relationship between subdomain content and central site?
- Should subdomains be able to opt-in/opt-out of central aggregation?

### 2. Content Types

#### A. Multimedia Blog Pieces (Modeling & Simulation)
- Rich media support (videos, 3D models, interactive content)
- Scientific/technical content focus
- Potentially large file sizes
- May need specialized rendering/viewing capabilities

#### B. "Molecule-Every-Day" Blog
- Public submission workflow:
  - Users can import models, videos, photos of molecules
  - Users can write short pieces about molecules
  - Submissions sent for consideration
  - Moderation workflow before public posting
- Multiple moderators/editors
- Version control for submissions
- Attribution and licensing considerations

**Questions:**
- What file formats for molecular models? (PDB, CIF, MOL, etc.)
- How large are typical submissions?
- What's the expected submission volume?
- Do we need real-time collaboration or async workflow?

### 3. Payment Integration

**Requirement:** Meaningful integration with:
- Substack (export/link)
- Patreon
- PayPal
- Zelle

**Considerations:**
- Substack: Export content, link to Substack posts, potentially sync
- Patreon: Membership tiers, paywalled content
- PayPal/Zelle: Direct payment processing
- Need flexible payment model (per-post, subscription, one-time, etc.)

**Questions:**
- Primary payment model? (subscription, per-post, tips, etc.)
- Do all subdomains share payment infrastructure or separate?
- How to handle refunds, cancellations?
- Tax reporting requirements?

### 4. Access Control & Multi-Author Support

**Requirement:** Multiple people with access to editing and curation.

**Considerations:**
- Role-based access control (RBAC)
- Granular permissions (edit, publish, moderate, admin)
- Per-subdomain permissions
- Audit trail for all changes
- Version control and rollback capabilities

**Questions:**
- What roles are needed? (author, editor, moderator, admin)
- Can users have different roles on different subdomains?
- How to handle ownership/transfer of content?
- What's the approval workflow?

### 5. Version Management & Backups

**Requirement:** Robust version management, backups, and disaster recovery.

**Considerations:**
- Git-like versioning for content
- Automated backups
- Point-in-time recovery
- Content migration/export capabilities
- Disaster recovery plan

**Questions:**
- How far back should version history go?
- What's the backup frequency?
- Where are backups stored? (Cloudflare R2, external?)
- What's the RTO/RPO requirements?

### 6. Hosting & Infrastructure

**Requirement:** Cloudflare hosting (free plan initially, upgrade when necessary).

**Considerations:**
- Cloudflare Pages for static sites
- Cloudflare Workers for serverless functions
- Cloudflare R2 for object storage
- Cloudflare D1 for database (SQLite-based, free tier)
- Cloudflare KV for edge caching
- Subdomain routing via Cloudflare Workers

**Questions:**
- What's the expected traffic volume?
- Do we need edge computing for search?
- How to handle large file uploads?
- What's the database size expectations?

---

## Architectural Decisions Needed

### 1. Monorepo vs Multi-Repo
- **Option A:** Monorepo (like steamco, careerGPT)
  - Pros: Shared code, unified tooling, easier refactoring
  - Cons: Larger repo, potential coupling
- **Option B:** Multi-repo (separate repos per subdomain)
  - Pros: Isolation, independent deployment
  - Cons: Code duplication, harder to share infrastructure

**Recommendation:** Start with monorepo, extract if needed.

### 2. Content Storage
- **Option A:** Git-based (content in repo, versioned)
  - Pros: Built-in versioning, easy backups, familiar workflow
  - Cons: Slower for large files, requires git knowledge
- **Option B:** Database + Object Storage (Cloudflare D1 + R2)
  - Pros: Fast queries, scalable, good for large files
  - Cons: Need custom versioning, more complex backups
- **Option C:** Hybrid (metadata in DB, content in git)
  - Pros: Best of both worlds
  - Cons: More complex, potential sync issues

**Recommendation:** Hybrid approach - metadata in D1, content in R2, git for versioning.

### 3. Search Architecture
- **Option A:** Cloudflare Workers + D1 (SQLite full-text search)
  - Pros: Free tier, fast, integrated
  - Cons: Limited search features, scale limits
- **Option B:** External search service (Algolia, Typesense, etc.)
  - Pros: Advanced features, better scalability
  - Cons: Cost, external dependency
- **Option C:** Build-time indexing (static search index)
  - Pros: Fast, no runtime cost
  - Cons: Requires rebuild for new content, limited real-time

**Recommendation:** Start with D1 full-text search, upgrade to external service if needed.

### 4. Admin Interface
- **Option A:** Separate admin app (like steamco)
  - Pros: Clear separation, can be private subdomain
  - Cons: More code to maintain
- **Option B:** Integrated admin routes in main app
  - Pros: Simpler, shared code
  - Cons: Security concerns, harder to isolate

**Recommendation:** Separate admin app at `admin.seethru.media` with shared design system.

### 5. Design System
- **Option A:** Shared design system package (like steamco)
  - Pros: Consistency, reusable components
  - Cons: Need to maintain package
- **Option B:** Per-app design systems
  - Pros: Flexibility, no coupling
  - Cons: Inconsistency, duplication

**Recommendation:** Shared design system package from day one.

---

## Technology Stack (Initial Thoughts)

### Frontend
- **Framework:** Astro (like caitlineverett.com) or Next.js
  - Astro: Great for content sites, excellent performance
  - Next.js: More flexibility, better for complex interactions
- **UI Framework:** React or Svelte
  - React: Larger ecosystem, more components
  - Svelte: Better performance, smaller bundle
- **Design System:** Custom (tokens + components)

### Backend/API
- **Runtime:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2 (S3-compatible)
- **Caching:** Cloudflare KV

### Infrastructure
- **Hosting:** Cloudflare Pages
- **CDN:** Cloudflare (automatic)
- **DNS:** Cloudflare
- **Monitoring:** Cloudflare Analytics + custom

### Development
- **Monorepo:** Yarn workspaces (like steamco)
- **TypeScript:** Strict mode
- **Testing:** Vitest (unit), Playwright (E2E)
- **CI/CD:** GitHub Actions → Cloudflare Pages

---

## Next Steps

1. **Finalize core architecture decisions** (monorepo structure, content storage, search)
2. **Design system planning** (tokens, components, admin interface patterns)
3. **Content model design** (database schema, versioning strategy)
4. **Payment integration architecture** (API design, webhook handling)
5. **Moderation workflow design** (state machine, notifications)
6. **Test strategy** (unit, integration, E2E, performance)

---

## Open Questions

1. **Subdomain isolation:** How isolated should subdomains be? Shared users? Shared payments?
2. **Content ownership:** Who owns content? Platform or authors?
3. **Licensing:** What licenses for user-submitted content?
4. **Monetization:** Revenue share model? Platform fees?
5. **Scaling:** When to upgrade from free tier? What are the limits?
6. **Migration:** How to migrate from other platforms? Import tools?

---

**Next Discussion:** Design system and admin interface architecture

