# Development Workflow & Quality Gates - seethru.media

**Created:** 2025-12-26 23:00  
**Purpose:** Comprehensive development workflow, commit automation, and quality gate strategy  
**Status:** 🟡 **Planning Phase**

---

## Philosophy: Session-Proof, Not Fully Automated

**Core Principle:** We want to make it **very difficult to forget important changes** while **preventing errors from entering the codebase**. We achieve this through:

1. **Automated reminders and staging** (not auto-commit)
2. **Strict quality gates** (prevent bad code)
3. **Session recovery** (capture work even if forgotten)
4. **Conflict prevention** (detect issues before they happen)

---

## Commit Strategy: Safe Automation

### ❌ What We DON'T Do

- **No auto-commit on push** - Too risky, could commit errors
- **No auto-merge to main** - Requires human review
- **No silent commits** - All commits require explicit approval

### ✅ What We DO

1. **Auto-staging with reminders**
   - Periodically remind about uncommitted changes
   - Auto-stage files that pass quality gates
   - Require explicit commit message

2. **Session snapshots**
   - Auto-create "WIP" commits at session end
   - Tag with session metadata
   - Easy to review/clean up later

3. **Quality gates before commit**
   - Pre-commit hooks run automatically
   - Must pass lint, typecheck, tests
   - Can't commit if gates fail

4. **Pre-push validation**
   - Full validation before push
   - Prevents pushing broken code
   - Can be bypassed only with explicit flag

---

## Implementation: Git Hooks & Automation

### Pre-Commit Hook (Automatic)

**Location:** `.husky/pre-commit`

**Runs:**
1. Format code (Prettier)
2. Lint changed files (ESLint)
3. Type check affected apps
4. Run affected tests
5. Check for namespace conflicts
6. Validate dependencies

**Behavior:**
- ✅ Auto-fixes what it can (formatting, simple lint issues)
- ❌ Blocks commit if errors remain
- 📝 Shows what was fixed vs what needs attention

**Example Output:**
```
🔍 Pre-commit checks...
✅ Formatted 3 files
✅ Fixed 2 lint issues
❌ Type error in src/api/payments.ts:42
❌ Namespace conflict: 'PaymentProcessor' already exists in @seethru/payments-core
```

### Pre-Push Hook (Automatic)

**Location:** `.husky/pre-push`

**Runs:**
1. Full typecheck across all apps
2. Full lint check
3. Full test suite
4. Build all apps
5. Dependency validation
6. Namespace conflict check

**Behavior:**
- ❌ Blocks push if any check fails
- ✅ Shows summary of what passed/failed
- 🔄 Can retry after fixes

### Session Snapshot Script (Optional)

**Location:** `scripts/session-snapshot.sh`

**Runs:** Manually or via cron/automation

**Creates:**
- WIP commit with timestamp
- Tags with session metadata
- Pushes to `wip/[timestamp]` branch (optional)

**Usage:**
```bash
# Manual snapshot
yarn session:snapshot

# Auto-snapshot every 2 hours (if uncommitted changes)
# Set up in cron or use system scheduler
```

**Commit Message Format:**
```
WIP: Session snapshot [2025-12-26 23:00]

Uncommitted changes:
- Modified: src/api/payments.ts
- Added: src/components/PaymentForm.tsx
- Modified: tests/payments.test.ts

Status: All quality gates passed
```

---

## Quality Gates: Preventing Bad Code

### Gate 1: Type Safety

**Tool:** TypeScript strict mode

**Checks:**
- No `any` types (unless explicitly allowed with TODO)
- No implicit any
- Strict null checks
- No unused variables
- Proper type exports

**Action:** Blocks commit if type errors exist

### Gate 2: Linting

**Tool:** ESLint with strict rules

**Checks:**
- Code style consistency
- Potential bugs
- Security issues
- Best practices
- Import organization

**Action:** Auto-fixes what it can, blocks commit for remaining issues

### Gate 3: Testing

**Tool:** Vitest (unit) + Playwright (E2E)

**Checks:**
- All tests pass
- Coverage thresholds met (80% minimum)
- No flaky tests

**Action:** Blocks commit if tests fail

### Gate 4: Namespace Conflicts

**Tool:** Custom script (`scripts/check-namespaces.js`)

**Checks:**
- Duplicate exports across packages
- Variable name conflicts
- Type name conflicts
- Function name conflicts

**Action:** Blocks commit if conflicts detected, suggests alternatives

### Gate 5: Dependency Validation

**Tool:** Custom script (`scripts/check-dependencies.js`)

**Checks:**
- All dependencies documented
- No duplicate dependencies
- Version conflicts resolved
- Missing peer dependencies

**Action:** Warns on commit, blocks push if critical issues

### Gate 6: System Design Compliance

**Tool:** Custom lint rules + architecture checks

**Checks:**
- Follows established patterns
- No temporary fixes without `@temp` tag
- Proper error handling
- Version control for content changes

**Action:** Warns on commit, requires justification for violations

---

## Session-Proof Workflow

### Problem: Creative Sessions & Forgotten Changes

**Solution:** Multi-layered capture system

### Layer 1: Real-Time Monitoring

**Tool:** File watcher + auto-staging

**Behavior:**
- Watches for file changes
- Auto-stages files that pass quality gates
- Reminds every 30 minutes if uncommitted staged changes

**Script:** `scripts/watch-and-remind.sh`

```bash
# Runs in background during dev
yarn dev:watch
```

### Layer 2: Session End Snapshot

**Tool:** Session snapshot script

**Triggers:**
- Manual: `yarn session:snapshot`
- Automatic: On terminal close (if configured)
- Scheduled: Every 2 hours (optional)

**Creates:**
- WIP commit with all changes
- Tagged with timestamp and session info
- Pushed to `wip/` branch (optional, configurable)

### Layer 3: Recovery Tools

**Tool:** `scripts/recover-session.sh`

**Usage:**
```bash
# List recent WIP commits
yarn session:list

# Review a WIP commit
yarn session:review wip/2025-12-26-2300

# Clean up WIP commits (after proper commits)
yarn session:cleanup
```

---

## Conflict Prevention System

### Namespace Conflict Detection

**Goal:** Make it **very difficult** to create conflicts

### Implementation

#### 1. Pre-Commit Check

**Script:** `scripts/check-namespaces.js`

**Checks:**
- All exports across all packages
- Variable names in scope
- Type names
- Function names

**Output:**
```
⚠️  Potential conflict detected:
   - New export: 'PaymentProcessor' in src/api/payments.ts
   - Existing: 'PaymentProcessor' in @seethru/payments-core/src/index.ts
   
   Suggested alternatives:
   - PaymentProcessorV2
   - PaymentHandler
   - PaymentService
```

#### 2. Real-Time Warnings (IDE Integration)

**Tool:** TypeScript + ESLint custom rules

**Behavior:**
- Warns when creating new exports
- Suggests alternatives if conflict detected
- Auto-complete shows existing names

#### 3. Dependency Documentation

**Tool:** Auto-generated dependency map

**Location:** `docs/DEPENDENCY_MAP.md` (auto-updated)

**Contains:**
- All package exports
- All public APIs
- All type definitions
- Import paths

**Usage:**
- Check before creating new exports
- Reference when naming new code
- Updated automatically on commit

### Namespace Rules

1. **Package-scoped exports**
   - All exports must be prefixed with package name concept
   - Example: `@seethru/payments-core` → `Payment*` exports

2. **App-scoped code**
   - App code should not export to other apps
   - Use packages for shared code

3. **Type naming**
   - Types should be descriptive and unique
   - Use namespace prefixes for common names

---

## System Design Principles

### Principle 1: System-First Design

**Rule:** All new code must fit the existing system architecture

**Enforcement:**
- Architecture lint rules
- Pre-commit architecture check
- Code review checklist

**Exceptions:**
- System changes require architecture discussion
- Documented in `architecture-discussions/`
- Approved before implementation

### Principle 2: No Temporary Fixes

**Rule:** Temporary fixes are rare and must be well-documented

**Requirements for `@temp` fixes:**
1. Must have `@temp` tag in code
2. Must have TODO with:
   - Why it's temporary
   - What the proper fix should be
   - When it will be fixed (deadline)
3. Must be tracked in `planning/TEMP_FIXES.md`
4. Must be reviewed monthly

**Example:**
```typescript
// @temp: Using setTimeout instead of proper queue system
// TODO: Replace with Cloudflare Queue when available (2025-01-15)
// Issue: https://github.com/seethru/issues/123
setTimeout(() => processPayment(data), 1000);
```

### Principle 3: Calculated System Changes

**Rule:** System changes are intentional, not accidental

**Process:**
1. Create architecture discussion document
2. Document current system
3. Document proposed change
4. Document alternatives considered
5. Document migration plan
6. Get approval
7. Implement with tests
8. Update documentation

---

## Dependency Management

### Dependency Documentation

**Requirement:** All dependencies must be documented

**Location:** `docs/DEPENDENCIES.md` (auto-generated + manual)

**Contains:**
- Package name and version
- Purpose/usage
- Why we chose it
- Alternatives considered
- Known issues
- Migration notes (if applicable)

### Dependency Validation

**Script:** `scripts/check-dependencies.js`

**Checks:**
- All dependencies have documentation
- No duplicate functionality
- Version conflicts resolved
- Security vulnerabilities
- License compatibility

### Adding New Dependencies

**Process:**
1. Check if existing dependency can be used
2. Document why new dependency is needed
3. Add to `docs/DEPENDENCIES.md`
4. Install and test
5. Update dependency map

---

## Modern Best Practices

### 1. Type-Safe Everything

- Strict TypeScript
- Runtime type validation (Zod, etc.)
- Type-safe APIs
- Type-safe database queries

### 2. Test-Driven Development

- Write tests first (when possible)
- Test critical paths always
- Test edge cases
- Test error handling

### 3. Incremental Adoption

- New patterns in new code
- Migrate old code gradually
- Don't break existing functionality
- Document migration path

### 4. Documentation as Code

- JSDoc for all public APIs
- README for all packages
- Architecture docs for system changes
- Examples for complex patterns

### 5. Automated Quality

- Pre-commit hooks (mandatory)
- Pre-push validation (mandatory)
- CI/CD checks (mandatory)
- Automated dependency updates (optional)

### 6. Conflict Prevention

- Namespace validation
- Dependency documentation
- Architecture linting
- Real-time warnings

---

## Recommended Tools & Scripts

### Required Tools

1. **Husky** - Git hooks
2. **lint-staged** - Run linters on staged files
3. **TypeScript** - Type safety
4. **ESLint** - Code quality
5. **Prettier** - Code formatting
6. **Vitest** - Unit testing
7. **Playwright** - E2E testing

### Custom Scripts Needed

1. `scripts/check-namespaces.js` - Namespace conflict detection
2. `scripts/check-dependencies.js` - Dependency validation
3. `scripts/session-snapshot.sh` - Session snapshots
4. `scripts/recover-session.sh` - Session recovery
5. `scripts/watch-and-remind.sh` - Real-time reminders
6. `scripts/generate-dependency-map.js` - Auto-generate dependency docs

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Set up Husky
- [ ] Configure lint-staged
- [ ] Set up pre-commit hook
- [ ] Set up pre-push hook
- [ ] Configure TypeScript strict mode
- [ ] Set up ESLint with strict rules

### Phase 2: Quality Gates
- [ ] Implement namespace conflict detection
- [ ] Implement dependency validation
- [ ] Set up test coverage thresholds
- [ ] Create architecture lint rules
- [ ] Set up dependency documentation system

### Phase 3: Session-Proofing
- [ ] Create session snapshot script
- [ ] Set up file watcher with reminders
- [ ] Create session recovery tools
- [ ] Document workflow

### Phase 4: Documentation
- [ ] Create dependency map generator
- [ ] Set up auto-documentation
- [ ] Create developer guide
- [ ] Document all scripts

---

## Example Workflow

### Normal Development Session

```bash
# Start development
yarn dev

# Make changes...
# (File watcher auto-stages files that pass quality gates)

# Every 30 minutes: Reminder if uncommitted changes
# "You have 5 staged files ready to commit"

# Commit when ready
git commit -m "feat: Add payment processing"

# Pre-commit hook runs:
# ✅ Formats code
# ✅ Lints
# ✅ Type checks
# ✅ Checks namespaces
# ✅ Runs tests

# If all pass: Commit succeeds
# If any fail: Commit blocked, shows errors

# Push when ready
git push

# Pre-push hook runs:
# ✅ Full validation
# ✅ All tests
# ✅ Build check

# If all pass: Push succeeds
# If any fail: Push blocked
```

### Creative Session (Forgetful)

```bash
# Start development
yarn dev:watch  # Includes reminder system

# Make lots of changes...
# (Auto-staged as you go)

# Forget to commit...
# (Reminder every 30 min)

# End session without committing
# (Session snapshot script runs automatically)

# Creates: WIP commit with all changes
# Tagged: wip/2025-12-26-2300

# Next session:
yarn session:list
# Shows: wip/2025-12-26-2300

yarn session:review wip/2025-12-26-2300
# Review changes, create proper commits

yarn session:cleanup
# Remove WIP commits after proper commits
```

---

## Next Steps

1. **Implement git hooks** (Husky + lint-staged)
2. **Create namespace conflict detection** script
3. **Create dependency validation** script
4. **Set up session snapshot** system
5. **Document all dependencies**
6. **Create developer guide**

---

**Last Updated:** 2025-12-26

