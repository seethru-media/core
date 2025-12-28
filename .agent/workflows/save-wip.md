---
description: Save working changes to git with automated verification
---

# Save WIP (Work In Progress)

Use this workflow to commit and push working changes.

## Steps

// turbo
1. Check git status:
```bash
cd /Users/caitlineverett/dev/seethru.media && git status --short
```

2. If there are changes, create a descriptive commit:
```bash
cd /Users/caitlineverett/dev/seethru.media && git add -A && git commit -m "[describe what changed]"
```

// turbo
3. Push to origin:
```bash
cd /Users/caitlineverett/dev/seethru.media && git push
```

## Notes

- Always verify the app still works before running this workflow
- Use descriptive commit messages (e.g., "feat: add post detail page" or "fix: resolve Attribution props")
- The `// turbo` annotation means those steps can be auto-run
