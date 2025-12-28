# Cursor Rules for seethru.media

**Purpose:** Rules and guidelines for Cursor and other AI agents working on the seethru.media project

---

## Project Context

seethru.media is a multi-subdomain blog platform built on Cloudflare, designed to solve modern pain points for media publications. It supports multiple blogs, multimedia content, public submissions with moderation, and payment integrations.

---

## Core Principles

### 1. Cloudflare-First Architecture
- ✅ Always consider Cloudflare Workers/Pages/D1/R2 capabilities
- ✅ Optimize for edge computing and global distribution
- ✅ Use Cloudflare's free tier efficiently, plan for paid upgrades
- ❌ Don't assume traditional server infrastructure
- ❌ Don't use technologies incompatible with Cloudflare Workers runtime

### 2. Multi-Tenant Design
- ✅ Design for subdomain isolation
- ✅ Support shared infrastructure where appropriate
- ✅ Consider per-subdomain customization (themes, features)
- ❌ Don't create tight coupling between subdomains
- ❌ Don't assume single-tenant architecture

### 3. Content-First Approach
- ✅ Version control all content changes
- ✅ Maintain audit trails for moderation and editing
- ✅ Support rollback and point-in-time recovery
- ❌ Don't allow content deletion without version history
- ❌ Don't skip backup/disaster recovery considerations

### 4. Payment Integration Flexibility
- ✅ Design payment system to be provider-agnostic
- ✅ Support multiple payment models (subscription, one-time, tips)
- ✅ Handle webhooks and async payment processing
- ❌ Don't hardcode to a single payment provider
- ❌ Don't assume synchronous payment processing

### 5. Moderation Workflow
- ✅ Design state machine for submission workflow
- ✅ Support multiple moderators/editors
- ✅ Provide clear approval/rejection feedback
- ❌ Don't allow direct publishing of user submissions
- ❌ Don't skip notification/email systems

---

## Code Standards

### TypeScript
- ✅ Always use strict TypeScript
- ✅ Prefer explicit types over `any`
- ✅ Use type guards and discriminated unions
- ❌ Never use `any` without explicit reason + TODO comment
- ❌ Don't disable TypeScript errors without justification

### File Organization
- ✅ Follow monorepo structure (apps/, packages/)
- ✅ Use path aliases (`$lib/*`, `@seethru/*`)
- ✅ Group related files together
- ❌ Don't use deep relative imports (`../../../../`)
- ❌ Don't mix concerns in single files

### Error Handling
- ✅ Use Result types or explicit error handling
- ✅ Log errors with context
- ✅ Provide user-friendly error messages
- ❌ Don't swallow errors silently
- ❌ Don't expose internal errors to users

### Testing
- ✅ Write tests for critical paths (moderation, payments, versioning)
- ✅ Use Vitest for unit tests, Playwright for E2E
- ✅ Test edge cases (large files, concurrent edits, etc.)
- ❌ Don't skip tests for payment/submission workflows
- ❌ Don't test implementation details

---

## Architecture Patterns

### Design System
- ✅ Use shared design system package (`@seethru/design-system`)
- ✅ Use design tokens (colors, spacing, typography)
- ✅ Create reusable components
- ❌ Don't use raw color values or magic numbers
- ❌ Don't duplicate UI components across apps

### Database Schema
- ✅ Use D1 (SQLite) for relational data
- ✅ Design for versioning (content_history table)
- ✅ Use soft deletes (deleted_at column)
- ✅ Index frequently queried columns
- ❌ Don't use database features not supported by SQLite
- ❌ Don't skip migration versioning

### API Design
- ✅ RESTful APIs with clear resource naming
- ✅ Use proper HTTP status codes
- ✅ Version APIs (`/api/v1/...`)
- ✅ Return consistent error formats
- ❌ Don't expose internal database structure
- ❌ Don't skip authentication/authorization

### Content Storage
- ✅ Store large files in R2 (S3-compatible)
- ✅ Store metadata in D1
- ✅ Use CDN URLs for public assets
- ✅ Implement proper file validation
- ❌ Don't store large files in database
- ❌ Don't skip file type/size validation

---

## Security Considerations

### Authentication & Authorization
- ✅ Use Cloudflare Access or similar for admin routes
- ✅ Implement RBAC (role-based access control)
- ✅ Validate permissions on every request
- ✅ Use secure session management
- ❌ Don't trust client-side permissions
- ❌ Don't skip CSRF protection

### Payment Security
- ✅ Validate webhooks with signatures
- ✅ Never store payment credentials
- ✅ Use idempotency keys for payment operations
- ✅ Log all payment-related actions
- ❌ Don't process payments without verification
- ❌ Don't expose payment API keys

### Content Security
- ✅ Sanitize user-submitted content
- ✅ Validate file uploads (type, size, content)
- ✅ Use CSP headers
- ✅ Implement rate limiting
- ❌ Don't trust user input
- ❌ Don't allow arbitrary file uploads

---

## Cloudflare-Specific Guidelines

### Workers
- ✅ Keep Workers lightweight (< 50ms CPU time on free tier)
- ✅ Use Durable Objects for stateful operations if needed
- ✅ Cache frequently accessed data in KV
- ✅ Use R2 for large file storage
- ❌ Don't do heavy computation in Workers
- ❌ Don't store large data in Workers memory

### D1 Database
- ✅ Use migrations for schema changes
- ✅ Index columns used in WHERE clauses
- ✅ Use transactions for multi-step operations
- ✅ Consider connection pooling for high traffic
- ❌ Don't use SQLite features not supported by D1
- ❌ Don't skip database backups

### R2 Storage
- ✅ Use presigned URLs for private content
- ✅ Set appropriate cache headers
- ✅ Use R2 lifecycle policies for cleanup
- ✅ Implement proper access controls
- ❌ Don't store sensitive data without encryption
- ❌ Don't skip file validation

---

## Development Workflow

### Before Making Changes
1. ✅ Read relevant architecture documentation
2. ✅ Check existing patterns in codebase
3. ✅ Consider impact on multi-tenant architecture
4. ✅ Think about versioning/backup implications

### When Creating New Features
1. ✅ Design for Cloudflare Workers runtime
2. ✅ Consider subdomain isolation
3. ✅ Plan for version control
4. ✅ Add tests
5. ✅ Update documentation

### When Fixing Bugs
1. ✅ Understand root cause
2. ✅ Check if issue affects other subdomains
3. ✅ Consider version history impact
4. ✅ Add regression tests
5. ✅ Document fix in architecture notes if significant

---

## Common Patterns

### Subdomain Routing
```typescript
// Use Cloudflare Workers to route by subdomain
const subdomain = request.headers.get('host')?.split('.')[0];
const blog = await getBlogBySubdomain(subdomain);
```

### Version Control
```typescript
// Always create version entry when updating content
await db.transaction(async (tx) => {
  await tx.insert(content_versions).values({
    content_id: id,
    version: nextVersion,
    content: newContent,
    author_id: userId,
  });
  await tx.update(content).set({ current_version: nextVersion });
});
```

### Payment Processing
```typescript
// Use idempotency keys for payment operations
const idempotencyKey = crypto.randomUUID();
await processPayment({ ...paymentData, idempotencyKey });
```

### Moderation Workflow
```typescript
// State machine for submission workflow
type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'published';
await updateSubmission(id, { status: 'approved', moderator_id: userId });
```

---

## Testing Requirements

### Must Test
- ✅ Payment webhook processing
- ✅ Moderation workflow state transitions
- ✅ Content versioning and rollback
- ✅ Subdomain routing and isolation
- ✅ File upload validation
- ✅ Permission checks

### Performance Testing
- ✅ Large file uploads
- ✅ Concurrent edits
- ✅ Search performance
- ✅ Edge caching effectiveness

---

## Documentation Requirements

### When Adding Features
- ✅ Update architecture discussions if significant
- ✅ Document API changes
- ✅ Add usage examples
- ✅ Update README if needed

### When Making Architectural Decisions
- ✅ Create timestamped discussion file
- ✅ Document decision rationale
- ✅ Update ARCHITECTURAL_DECISIONS.md
- ✅ Note alternatives considered

---

## Code Quality & Conflict Prevention

**CRITICAL:** Before creating any new code, check for conflicts and follow quality gates.

### Namespace Conflict Detection
- ✅ Always check for existing exports before creating new code
- ✅ Use descriptive, package-scoped names
- ✅ Warn user if conflict detected, suggest alternatives
- ❌ Never create duplicate functionality
- ❌ Never use generic names that might conflict

### System Design Compliance
- ✅ All code must fit existing system architecture
- ✅ Follow established patterns
- ✅ Use existing infrastructure
- ❌ No temporary fixes (unless properly documented with `@temp` tag)
- ❌ No system changes without architecture discussion

### Quality Gates (Mandatory)
- ✅ TypeScript strict mode (no `any` without reason)
- ✅ All tests pass
- ✅ No lint errors
- ✅ No namespace conflicts
- ✅ Dependencies documented
- ❌ Cannot commit if gates fail

**See:** `agent-rules/CODE_QUALITY_AND_CONFLICT_PREVENTION.md` for complete rules

---

## Modern Best Practices

### 1. Type-Safe Everything
- Strict TypeScript configuration
- Runtime validation with Zod or similar
- Type-safe API contracts
- Type-safe database queries

### 2. Conflict Prevention
- Real-time namespace checking
- Dependency validation
- Architecture linting
- Pre-commit conflict detection

### 3. Incremental Adoption
- New patterns in new code first
- Gradual migration of old code
- Don't break existing functionality
- Document migration paths

### 4. Documentation as Code
- JSDoc for all public APIs
- README for all packages
- Architecture docs for system changes
- Examples for complex patterns

### 5. Session-Proof Development
- Auto-staging of files that pass quality gates
- Session snapshots for forgotten work
- Real-time reminders
- Recovery tools for WIP commits

### 6. No Temporary Fixes
- Implement proper solutions
- If temporary fix is necessary:
  - Must have `@temp` tag
  - Must have TODO with deadline
  - Must be tracked in `planning/TEMP_FIXES.md`
  - Must be reviewed monthly

---

## References

- Architecture discussions: `architecture-discussions/`
- Planning TODO: `planning/PLANNING_TODO.md`
- Design system: `design-system/`
- Development Workflow: `architecture-discussions/25-12-26-2300-DEVELOPMENT_WORKFLOW_AND_QUALITY_GATES.md`
- Code Quality Rules: `agent-rules/CODE_QUALITY_AND_CONFLICT_PREVENTION.md`
- Cloudflare docs: https://developers.cloudflare.com/

---

**Last Updated:** 2025-12-26

