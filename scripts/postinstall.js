#!/usr/bin/env node
/**
 * Post-install reminder
 * Gentle stewardship nudge after yarn install
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║  🌱 seethru.media - Open Source Stewardship                   ║
║                                                                ║
║  Remember: We care about our dependencies.                     ║
║  If you add a new package, document it in docs/DEPENDENCIES.md ║
║                                                                ║
║  Run 'yarn stewardship' to check compliance.                   ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);
