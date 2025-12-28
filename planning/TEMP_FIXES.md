# Temporary Fixes Tracker

**Purpose:** Track all temporary fixes (`@temp` tags) in the codebase  
**Status:** 🟡 **Planning Phase**

---

## Policy

Temporary fixes are **rare and must be well-documented**. All temporary fixes must:

1. Have `@temp` tag in code
2. Have TODO with deadline
3. Be tracked in this file
4. Be reviewed monthly
5. Have a plan for proper fix

---

## Active Temporary Fixes

_None currently. This file will be updated as temporary fixes are added._

---

## Format

When adding a temporary fix, use this format:

```markdown
## [Date] - [Brief Description]

**Location:** `path/to/file.ts:line`
**Tag:** `@temp`
**Issue:** [Link to issue or description]
**Why Temporary:** [Explanation]
**Proper Fix:** [What the proper fix should be]
**Deadline:** [YYYY-MM-DD]
**Status:** Active | Resolved | Overdue

**Code:**
```typescript
// @temp: [Brief description]
// TODO: [Proper fix description] ([Deadline])
// Issue: [Link]
[code snippet]
```
```

---

## Review Schedule

- **Monthly Review:** First Monday of each month
- **Action Items:**
  - Review all active temporary fixes
  - Check if deadlines are met
  - Plan proper fixes for overdue items
  - Remove resolved items

---

**Last Updated:** 2025-12-26

