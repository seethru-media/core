# Development Workflow Summary - seethru.media

**Quick Reference:** This document summarizes the development workflow, quality gates, and conflict prevention strategies.

---

## 🎯 Core Philosophy

**Session-Proof, Not Fully Automated**

We make it **very difficult to forget important changes** while **preventing errors from entering the codebase** through:

1. ✅ **Automated reminders and staging** (not auto-commit)
2. ✅ **Strict quality gates** (prevent bad code)
3. ✅ **Session recovery** (capture work even if forgotten)
4. ✅ **Conflict prevention** (detect issues before they happen)

---

## 🔒 Quality Gates

### Pre-Commit (Automatic)
- Formats code (Prettier)
- Lints changed files (ESLint)
- Type checks affected apps
- Runs affected tests
- Checks for namespace conflicts
- Validates dependencies

**Result:** Blocks commit if errors remain

### Pre-Push (Automatic)
- Full typecheck across all apps
- Full lint check
- Full test suite
- Build all apps
- Dependency validation
- Namespace conflict check

**Result:** Blocks push if any check fails

---

## 🛡️ Conflict Prevention

### Namespace Conflict Detection

**Before creating new code:**
1. Check existing exports in same package
2. Check existing exports in other packages
3. Check type names across codebase
4. Check function names in scope
5. Check variable names in scope

**If conflict detected:**
- Warn user immediately
- Suggest alternatives
- Require explicit approval for override

### Dependency Management

**Before adding dependency:**
1. Check if existing dependency can be used
2. Document why new dependency is needed
3. Check for alternatives
4. Verify license compatibility
5. Check security vulnerabilities
6. Update `docs/DEPENDENCIES.md`

---

## 📝 Session-Proof Development

### Auto-Staging
- File watcher auto-stages files that pass quality gates
- Reminds every 30 minutes if uncommitted changes

### Session Snapshots
- Auto-creates WIP commits at session end (if uncommitted changes)
- Tagged with timestamp and session info
- Easy to review and clean up

### Recovery Tools
```bash
yarn session:list      # List recent WIP commits
yarn session:review    # Review a WIP commit
yarn session:cleanup   # Clean up WIP commits
```

---

## 🏗️ System Design Principles

### System-First Design
- ✅ All new code must fit existing system architecture
- ✅ Follow established patterns
- ✅ Use existing infrastructure
- ❌ No temporary fixes (unless properly documented)

### No Temporary Fixes
If temporary fix is absolutely necessary:
1. Must have `@temp` tag in code
2. Must have TODO with deadline
3. Must be tracked in `planning/TEMP_FIXES.md`
4. Must be reviewed monthly

### System Changes
When changing system architecture:
1. Create architecture discussion document
2. Document current system & proposed change
3. Document alternatives considered
4. Get approval
5. Implement with tests
6. Update documentation

---

## 📚 Key Documents

### Development Workflow
- **`architecture-discussions/25-12-26-2300-DEVELOPMENT_WORKFLOW_AND_QUALITY_GATES.md`**
  - Complete development workflow
  - Git hooks configuration
  - Session-proofing strategies
  - Quality gate implementation

### Code Quality Rules
- **`agent-rules/CODE_QUALITY_AND_CONFLICT_PREVENTION.md`**
  - Namespace conflict prevention
  - System design compliance
  - Quality gate checklist
  - Modern best practices

### Modern Best Practices
- **`agent-rules/MODERN_BEST_PRACTICES.md`**
  - Type safety strategies
  - Testing approaches
  - Error handling patterns
  - Performance considerations
  - Security best practices

### Agent Rules
- **`agent-rules/CURSOR_RULES.md`** - Cursor-specific rules
- **`agent-rules/AGENT_GUIDELINES.md`** - General agent guidelines

---

## 🚀 Quick Start

### 1. Set Up Development Environment
```bash
# Install dependencies
yarn install

# Set up git hooks
yarn prepare  # Sets up Husky hooks

# Start development with watch mode
yarn dev:watch
```

### 2. Development Workflow
```bash
# Make changes...
# (Auto-staged as you go if they pass quality gates)

# Commit when ready
git commit -m "feat: Add feature"

# Pre-commit hook runs automatically
# - Formats code
# - Lints
# - Type checks
# - Checks namespaces
# - Runs tests

# Push when ready
git push

# Pre-push hook runs automatically
# - Full validation
# - All tests
# - Build check
```

### 3. Session Recovery
```bash
# If you forgot to commit
yarn session:list      # See WIP commits
yarn session:review   # Review changes
yarn session:cleanup  # Clean up after proper commits
```

---

## ✅ Quality Checklist

Before committing, verify:
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

## 🔧 Tools & Scripts

### Required Tools
- **Husky** - Git hooks
- **lint-staged** - Staged file linting
- **TypeScript** - Type safety
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Playwright** - E2E testing

### Custom Scripts (To Be Implemented)
- `scripts/check-namespaces.js` - Namespace conflict detection
- `scripts/check-dependencies.js` - Dependency validation
- `scripts/session-snapshot.sh` - Session snapshots
- `scripts/recover-session.sh` - Session recovery
- `scripts/watch-and-remind.sh` - Real-time reminders

---

## 📖 Full Documentation

For complete details, see:
- **Development Workflow:** `architecture-discussions/25-12-26-2300-DEVELOPMENT_WORKFLOW_AND_QUALITY_GATES.md`
- **Code Quality Rules:** `agent-rules/CODE_QUALITY_AND_CONFLICT_PREVENTION.md`
- **Modern Best Practices:** `agent-rules/MODERN_BEST_PRACTICES.md`
- **Planning TODO:** `planning/PLANNING_TODO.md`

---

**Last Updated:** 2025-12-26

