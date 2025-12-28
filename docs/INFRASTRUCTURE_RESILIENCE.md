# Infrastructure Resilience

## Cloudflare Dependency

We use Cloudflare for:
- Database (D1)
- Object storage (R2)
- Hosting (Pages)
- DNS
- AI (Workers AI)

## Exit Plan

If Cloudflare becomes unavailable or terminates our account:

| Layer | Backup Location | Recovery Time |
|---|---|---|
| Database | Daily export to Backblaze B2 | 24-48 hours |
| Media | Daily sync to Backblaze B2 | 24-48 hours |
| Hosting | Vercel or Fly.io | 4-8 hours |
| DNS | Secondary nameserver | 1-4 hours |

## Targets

- **RPO (data loss):** < 24 hours
- **RTO (recovery):** < 72 hours

## Annual Drill

We test recovery once per year and publish results.

---

*Documented per Platform Charter advisory board recommendation.*
