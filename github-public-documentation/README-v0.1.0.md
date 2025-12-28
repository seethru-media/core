# seethru.media

> **Version 0.1.0** — Initial Scaffold  
> **Date:** 2025-12-28

**A trust-first news platform.** No outrage optimization. No hidden algorithms. No cookies.

---

## What We're Building

seethru.media is an open-source news platform designed for radical transparency:

| Traditional Media | seethru.media |
|---|---|
| Optimizes for engagement | Optimizes for understanding |
| Hidden algorithms | [Open-source ranking](./docs/ALGORITHM_TRANSPARENCY.md) |
| Anonymous moderation | [Public jury decisions](./docs/MODERATION_GUIDELINES.md) |
| Unclear funding | [Public finances](./docs/FUNDING_REGISTRY.md) |
| Tracks everything | No cookies. No fingerprinting. |

## Core Principles

1. **Geographic Daily Briefs** — News organized by your neighborhood, city, country, then world. Not by what makes you angry.

2. **Visible Attribution** — Every piece of content shows who made it, who funded it, and whether AI was involved.

3. **Liberal Moderation** — We don't auto-censor "toxicity." Only 4 absolute red lines: CSAM, direct incitement, doxxing, fraud. Everything else goes to a [community jury](./docs/juror-training/README.md).

4. **Forkable Governance** — Don't like how we run things? All governance documents are [open source](./docs/AMENDMENT_PROCESS.md) and [CC-BY-SA licensed](./LICENSE). Fork us.

5. **Privacy by Default** — No cookies. Server-side sessions only when you opt in. [See what we track](./docs/DATA_POLICY.md).

## Architecture

```
seethru-core/          ← You are here (the "Engine")
├── apps/
│   ├── web/           ← Reader experience (Astro, zero JS by default)
│   ├── author/        ← Content creation (Next.js)
│   └── admin/         ← Moderation & finances (Next.js)
├── packages/
│   ├── design-system/ ← Shared UI components
│   ├── content-schema/← Zod schemas for content
│   ├── attribution/   ← Watermarking & credit
│   ├── moderation/    ← Jury system types
│   └── ...
└── docs/              ← Governance documents
```

Content lives in separate repositories ("Fuel"):
- Each subdomain has its own content repo
- Content is MDX + assets, no code
- Authors don't need to understand the infrastructure

## Getting Started

```bash
git clone https://github.com/seethru-media/seethru-core.git
cd seethru-core
yarn install
yarn dev
```

- **Reader:** http://localhost:4321
- **Author:** http://localhost:3001
- **Admin:** http://localhost:3002

## Governance

We believe platform governance should be as transparent as the content.

| Document | What It Covers |
|---|---|
| [Trust Principles](./docs/TRUST_PRINCIPLES.md) | Our commitments to readers |
| [Moderation Guidelines](./docs/MODERATION_GUIDELINES.md) | How we handle content |
| [Ombudsman](./docs/OMBUDSMAN.md) | Independent oversight |
| [DM Policy](./docs/DM_POLICY.md) | Honest about what we can't see |
| [Funding Registry](./docs/FUNDING_REGISTRY.md) | Who funds us |
| [Amendment Process](./docs/AMENDMENT_PROCESS.md) | How rules change |

## Status (v0.1.0)

- [x] Monorepo scaffold
- [x] Design system (tokens, components)
- [x] Content schemas (Zod)
- [x] Governance docs (12 documents)
- [x] Astro web app (zero JS by default)
- [x] Next.js author/admin apps
- [x] Low-bandwidth mode
- [ ] Dynamic content loading
- [ ] User accounts
- [ ] Jury system
- [ ] Live deployment

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

- **Code:** MIT
- **Governance Documents:** CC-BY-SA 4.0

---

*Built with distrust of easy answers and hope for better ones.*
