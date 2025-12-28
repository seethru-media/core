# Agent Guidelines - seethru.media

**Purpose:** General guidelines for AI agents (Cursor, GitHub Copilot, etc.) working on seethru.media

---

## Project Context

seethru.media is a multi-subdomain blog platform built on Cloudflare. It's designed to solve modern pain points for media publications with features like:

- Multiple subdomains (different blogs)
- Central searchable aggregation site
- Multimedia content support
- Public submissions with moderation
- Payment integrations (Substack, Patreon, PayPal, Zelle)
- Version control and backups
- Multi-author collaboration

---

## Key Architectural Constraints

### Cloudflare-First
- **Runtime:** Cloudflare Workers (V8 isolates, not Node.js)
- **Database:** Cloudflare D1 (SQLite, not PostgreSQL/MySQL)
- **Storage:** Cloudflare R2 (S3-compatible)
- **Caching:** Cloudflare KV
- **Hosting:** Cloudflare Pages

**Implications:**
- No Node.js APIs (fs, path, etc.) in Workers
- SQLite syntax only (no PostgreSQL features)
- Edge-first architecture
- Global distribution by default

### Multi-Tenant Design
- Subdomains are isolated blogs
- Shared infrastructure (database, storage)
- Per-subdomain customization (themes, features)
- Central aggregation site

### Content-First
- All content changes are versioned
- Audit trails for moderation/editing
- Rollback capabilities
- Backup/disaster recovery built-in

---

## Code Generation Guidelines

### When Creating New Code

1. **Check Architecture Docs First**
   - Read `architecture-discussions/` for relevant decisions
   - Check `CURSOR_RULES.md` for specific patterns
   - Review existing code for patterns

2. **Follow Cloudflare Constraints**
   - Use Workers-compatible APIs only
   - Use D1 (SQLite) syntax
   - Consider edge computing limitations
   - Optimize for cold starts

3. **Consider Multi-Tenancy**
   - Is this feature subdomain-specific?
   - Does it need subdomain isolation?
   - Should it be customizable per subdomain?

4. **Plan for Versioning**
   - Will this change content? → needs versioning
   - Will this change metadata? → needs audit trail
   - Can this be rolled back? → needs version history

5. **Think About Payments**
   - Does this touch payment flow? → needs idempotency
   - Does this handle webhooks? → needs signature verification
   - Does this process money? → needs logging/auditing

### When Modifying Existing Code

1. **Preserve Version History**
   - Don't break version compatibility
   - Maintain audit trail format
   - Keep rollback capability

2. **Maintain Subdomain Isolation**
   - Don't leak data between subdomains
   - Preserve permission boundaries
   - Keep customization working

3. **Update Tests**
   - Add tests for new behavior
   - Update tests for changed behavior
   - Don't skip edge cases

4. **Update Documentation**
   - Update architecture docs if significant
   - Update API docs if endpoints change
   - Update README if setup changes

---

## Common Patterns

### Subdomain Detection
```typescript
// Always check subdomain in Workers
const url = new URL(request.url);
const subdomain = url.hostname.split('.')[0];
const blog = await getBlogBySubdomain(subdomain);
if (!blog) {
  return new Response('Blog not found', { status: 404 });
}
```

### Version Creation
```typescript
// Always create version when updating content
async function updateContent(id: string, newContent: string, userId: string) {
  const current = await db.select().from(content).where(eq(content.id, id)).get();
  const nextVersion = current.current_version + 1;
  
  await db.transaction(async (tx) => {
    // Create version entry
    await tx.insert(content_versions).values({
      content_id: id,
      version: nextVersion,
      content: newContent,
      author_id: userId,
      created_at: new Date(),
    });
    
    // Update current version
    await tx.update(content)
      .set({ 
        current_version: nextVersion,
        updated_at: new Date(),
      })
      .where(eq(content.id, id));
  });
}
```

### Permission Check
```typescript
// Always check permissions
async function canEditContent(userId: string, contentId: string): Promise<boolean> {
  const content = await getContent(contentId);
  const user = await getUser(userId);
  
  // Owner can always edit
  if (content.author_id === userId) return true;
  
  // Check role permissions
  const role = await getUserRole(userId, content.blog_id);
  return role.permissions.includes('edit_content');
}
```

### Payment Idempotency
```typescript
// Always use idempotency keys for payments
async function processPayment(data: PaymentData) {
  const idempotencyKey = data.idempotencyKey || crypto.randomUUID();
  
  // Check if already processed
  const existing = await db.select()
    .from(payments)
    .where(eq(payments.idempotency_key, idempotencyKey))
    .get();
  
  if (existing) {
    return existing; // Return existing result
  }
  
  // Process payment
  const result = await actualPaymentProcessing(data);
  
  // Store with idempotency key
  await db.insert(payments).values({
    idempotency_key: idempotencyKey,
    ...result,
  });
  
  return result;
}
```

### Moderation State Machine
```typescript
// Use state machine for moderation
type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'published';

const validTransitions: Record<SubmissionStatus, SubmissionStatus[]> = {
  pending: ['approved', 'rejected'],
  approved: ['published', 'pending'], // Can un-approve
  rejected: ['pending'], // Can resubmit
  published: [], // Final state
};

function canTransition(from: SubmissionStatus, to: SubmissionStatus): boolean {
  return validTransitions[from]?.includes(to) ?? false;
}
```

---

## Testing Requirements

### Must Test
- ✅ Subdomain isolation
- ✅ Permission checks
- ✅ Version creation/rollback
- ✅ Payment idempotency
- ✅ Moderation state transitions
- ✅ File upload validation

### Should Test
- ✅ Error handling
- ✅ Edge cases (empty data, large files, etc.)
- ✅ Concurrent operations
- ✅ Performance (large datasets)

### Test Structure
```typescript
describe('Feature Name', () => {
  describe('happy path', () => {
    it('should work correctly', () => { ... });
  });
  
  describe('error cases', () => {
    it('should handle errors', () => { ... });
  });
  
  describe('edge cases', () => {
    it('should handle edge cases', () => { ... });
  });
});
```

---

## Documentation Requirements

### When Adding Features
- Update `architecture-discussions/` if architectural decision
- Update `planning/PLANNING_TODO.md` when complete
- Add JSDoc comments to public APIs
- Update README if setup changes

### When Making Decisions
- Create timestamped discussion file
- Document alternatives considered
- Explain rationale
- Update `ARCHITECTURAL_DECISIONS.md` (when created)

---

## Error Handling

### Always
- Log errors with context
- Return user-friendly messages
- Don't expose internal errors
- Use proper HTTP status codes

### Example
```typescript
try {
  const result = await riskyOperation();
  return Response.json(result);
} catch (error) {
  // Log with context
  console.error('Operation failed', {
    error: error.message,
    userId,
    subdomain,
    timestamp: new Date().toISOString(),
  });
  
  // Return user-friendly error
  return Response.json(
    { error: 'Operation failed. Please try again.' },
    { status: 500 }
  );
}
```

---

## Security Considerations

### Always Validate
- User input (sanitize, validate)
- File uploads (type, size, content)
- Permissions (check on every request)
- Webhook signatures (verify before processing)

### Never
- Trust client-side data
- Expose internal errors
- Skip authentication/authorization
- Store sensitive data unencrypted

---

## Performance Guidelines

### Cloudflare Workers
- Keep CPU time < 50ms (free tier)
- Use KV for caching
- Use R2 for large files
- Minimize external API calls

### Database
- Index frequently queried columns
- Use transactions for multi-step operations
- Batch operations when possible
- Avoid N+1 queries

### Frontend
- Code split by route
- Lazy load heavy components
- Optimize images (WebP, responsive)
- Use CDN for static assets

---

## Questions to Ask

Before implementing a feature, consider:

1. **Does this affect multiple subdomains?**
   - If yes, ensure proper isolation

2. **Does this change content?**
   - If yes, needs versioning

3. **Does this handle money?**
   - If yes, needs idempotency, logging, verification

4. **Does this allow user input?**
   - If yes, needs validation, sanitization

5. **Does this need real-time updates?**
   - If yes, consider WebSockets or polling strategy

6. **Is this compatible with Cloudflare Workers?**
   - If no, find alternative approach

---

## References

- **Architecture:** `architecture-discussions/`
- **Cursor Rules:** `agent-rules/CURSOR_RULES.md`
- **Planning:** `planning/PLANNING_TODO.md`
- **Design System:** `design-system/`
- **Cloudflare Docs:** https://developers.cloudflare.com/

---

**Last Updated:** 2025-12-26

