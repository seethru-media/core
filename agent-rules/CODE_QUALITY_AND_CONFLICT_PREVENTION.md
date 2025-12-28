# Code Quality & Conflict Prevention Rules

**Purpose:** Rules to prevent errors, conflicts, and maintain system integrity  
**Status:** 🟡 **Planning Phase**

---

## Core Principles

### 1. System-First Design
- ✅ All new code must fit existing system architecture
- ✅ Follow established patterns
- ✅ Use existing infrastructure
- ❌ Don't create parallel systems
- ❌ Don't bypass established patterns

### 2. Conflict Prevention
- ✅ Check for namespace conflicts before creating new code
- ✅ Use descriptive, unique names
- ✅ Follow package naming conventions
- ❌ Don't create duplicate functionality
- ❌ Don't use generic names that might conflict

### 3. No Temporary Fixes
- ✅ Implement proper solutions
- ✅ Document system changes
- ❌ Avoid temporary fixes
- ❌ If temporary fix is necessary:
  - Must have `@temp` tag
  - Must have TODO with deadline
  - Must be tracked in `planning/TEMP_FIXES.md`

### 4. Quality Gates
- ✅ All code must pass quality gates
- ✅ Type safety is mandatory
- ✅ Tests required for critical paths
- ❌ Don't bypass quality gates
- ❌ Don't commit code that fails checks

---

## Namespace Conflict Prevention

### Before Creating New Code

**Always check:**
1. Existing exports in same package
2. Existing exports in other packages
3. Type names across codebase
4. Function names in scope
5. Variable names in scope

### Naming Conventions

#### Package Exports
```typescript
// ✅ Good: Package-scoped naming
// In @seethru/payments-core
export class PaymentProcessor { ... }
export type PaymentResult = { ... }
export function processPayment() { ... }

// ❌ Bad: Generic names
export class Processor { ... }  // Too generic
export type Result = { ... }    // Too generic
```

#### App-Specific Code
```typescript
// ✅ Good: App-scoped, descriptive
// In apps/admin
export function AdminPaymentForm() { ... }
export type AdminUser = { ... }

// ❌ Bad: Generic names that might conflict
export function PaymentForm() { ... }  // Might conflict with other apps
```

#### Types
```typescript
// ✅ Good: Descriptive, namespaced
type PaymentProcessorConfig = { ... }
type BlogContentVersion = { ... }

// ❌ Bad: Generic
type Config = { ... }  // Too generic
type Version = { ... }  // Too generic
```

### Conflict Detection Rules

**When creating new code, Cursor/agents must:**

1. **Check existing exports**
   ```typescript
   // Before creating:
   export class PaymentHandler { ... }
   
   // Check: Does PaymentHandler exist?
   // - In same file? → Rename
   // - In same package? → Rename or extend
   // - In other package? → Consider namespace prefix
   ```

2. **Suggest alternatives if conflict detected**
   ```typescript
   // If conflict detected:
   // ⚠️  'PaymentHandler' conflicts with existing export in @seethru/payments-core
   // Suggested alternatives:
   // - PaymentHandlerV2
   // - PaymentService
   // - PaymentManager
   ```

3. **Use package prefixes for shared concepts**
   ```typescript
   // ✅ Good: Package-prefixed
   export type PaymentUser = { ... }  // In payments package
   export type BlogUser = { ... }      // In blog package
   
   // ❌ Bad: Generic
   export type User = { ... }  // Too generic, might conflict
   ```

---

## Dependency Management Rules

### Before Adding Dependencies

**Always:**
1. Check if existing dependency can be used
2. Document why new dependency is needed
3. Check for alternatives
4. Verify license compatibility
5. Check security vulnerabilities
6. Update `docs/DEPENDENCIES.md`

### Dependency Documentation Format

```markdown
## package-name

**Version:** 1.2.3
**Purpose:** Payment processing
**Used in:** @seethru/payments-core

**Why we chose it:**
- Cloudflare Workers compatible
- TypeScript support
- Active maintenance

**Alternatives considered:**
- alternative-package: Rejected (not Workers compatible)

**Known issues:**
- None currently

**Migration notes:**
- N/A (new dependency)
```

### Dependency Validation

**Before commit, check:**
- ✅ Dependency is documented
- ✅ No duplicate functionality
- ✅ Version conflicts resolved
- ✅ Security vulnerabilities addressed
- ✅ License is compatible

---

## System Design Rules

### Architecture Compliance

**When creating new code:**

1. **Check architecture docs**
   - Read `architecture-discussions/ARCHITECTURAL_DECISIONS.md`
   - Follow established patterns
   - Use existing infrastructure

2. **Follow package structure**
   ```typescript
   // ✅ Good: Uses existing package
   import { PaymentProcessor } from '@seethru/payments-core';
   
   // ❌ Bad: Creates parallel system
   // Don't create new payment system if one exists
   ```

3. **Use design system**
   ```typescript
   // ✅ Good: Uses design system
   import { Button } from '@seethru/design-system';
   
   // ❌ Bad: Creates custom component
   // Don't create custom button if design system has one
   ```

### Temporary Fixes (Rare)

**If temporary fix is absolutely necessary:**

```typescript
// @temp: Using setTimeout instead of proper queue system
// TODO: Replace with Cloudflare Queue when available (2025-01-15)
// Issue: https://github.com/seethru/issues/123
// Tracked in: planning/TEMP_FIXES.md
setTimeout(() => processPayment(data), 1000);
```

**Requirements:**
1. `@temp` tag in code
2. TODO with:
   - Why it's temporary
   - What proper fix should be
   - Deadline for fix
3. Issue/ticket reference
4. Entry in `planning/TEMP_FIXES.md`

### System Changes

**When changing system architecture:**

1. **Create architecture discussion**
   - Document current system
   - Document proposed change
   - Document alternatives
   - Document migration plan

2. **Get approval**
   - Review architecture discussion
   - Get consensus
   - Update `ARCHITECTURAL_DECISIONS.md`

3. **Implement with tests**
   - Write tests first
   - Implement change
   - Update documentation

---

## Code Quality Rules

### Type Safety

**Always:**
- ✅ Use strict TypeScript
- ✅ Explicit types (no `any` without reason)
- ✅ Type guards for runtime validation
- ✅ Proper error types

**Never:**
- ❌ Use `any` without explicit reason + TODO
- ❌ Disable TypeScript errors without justification
- ❌ Skip type definitions

### Error Handling

**Always:**
- ✅ Handle all errors explicitly
- ✅ Use Result types or proper error handling
- ✅ Log errors with context
- ✅ Return user-friendly messages

**Never:**
- ❌ Swallow errors silently
- ❌ Expose internal errors to users
- ❌ Skip error handling

### Testing

**Always test:**
- ✅ Critical paths (payments, moderation, versioning)
- ✅ Error cases
- ✅ Edge cases
- ✅ Integration points

**Test structure:**
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

## Agent-Specific Rules

### When Generating Code

**Before generating, check:**
1. Existing patterns in codebase
2. Namespace conflicts
3. Dependency availability
4. Architecture compliance
5. Design system components

### When Suggesting Changes

**Always:**
- ✅ Suggest alternatives if conflict detected
- ✅ Reference existing patterns
- ✅ Use established infrastructure
- ✅ Follow naming conventions

**Never:**
- ❌ Create duplicate functionality
- ❌ Bypass quality gates
- ❌ Suggest temporary fixes without proper documentation
- ❌ Violate architecture boundaries

### Conflict Detection

**When creating new code, automatically:**
1. Check for namespace conflicts
2. Suggest alternatives if conflict found
3. Warn about potential issues
4. Require explicit approval for conflicts

**Example:**
```
⚠️  Potential namespace conflict detected:
   - New: 'PaymentProcessor' in src/api/payments.ts
   - Existing: 'PaymentProcessor' in @seethru/payments-core/src/index.ts
   
   Suggested alternatives:
   - PaymentProcessorV2
   - PaymentHandler
   - PaymentService
   
   Choose alternative or confirm override (not recommended).
```

---

## Quality Gate Checklist

**Before committing, verify:**
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] All tests pass
- [ ] No namespace conflicts
- [ ] Dependencies documented
- [ ] Follows architecture patterns
- [ ] Uses design system (if UI)
- [ ] Error handling in place
- [ ] No temporary fixes (or properly documented)

---

## Modern Best Practices

### 1. Type-Safe Everything
- Strict TypeScript
- Runtime validation (Zod)
- Type-safe APIs
- Type-safe database queries

### 2. Incremental Adoption
- New patterns in new code
- Migrate old code gradually
- Don't break existing functionality

### 3. Documentation as Code
- JSDoc for all public APIs
- README for all packages
- Architecture docs for changes
- Examples for complex patterns

### 4. Automated Quality
- Pre-commit hooks (mandatory)
- Pre-push validation (mandatory)
- CI/CD checks (mandatory)
- Real-time conflict detection

### 5. Conflict Prevention
- Namespace validation (pre-commit)
- Dependency documentation (pre-commit)
- Architecture linting (pre-commit)
- Real-time IDE warnings

---

## References

- Development Workflow: `architecture-discussions/25-12-26-2300-DEVELOPMENT_WORKFLOW_AND_QUALITY_GATES.md`
- Architecture Decisions: `architecture-discussions/ARCHITECTURAL_DECISIONS.md` (when created)
- Cursor Rules: `agent-rules/CURSOR_RULES.md`
- Agent Guidelines: `agent-rules/AGENT_GUIDELINES.md`

---

**Last Updated:** 2025-12-26

