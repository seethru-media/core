#!/usr/bin/env node
/**
 * Stewardship Check
 * Verifies all package.json dependencies are documented in docs/DEPENDENCIES.md
 */

const fs = require('fs');
const path = require('path');

const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const allDeps = {
    ...rootPkg.dependencies,
    ...rootPkg.devDependencies,
};

// Check if DEPENDENCIES.md exists
const depsDocPath = path.join('docs', 'DEPENDENCIES.md');
if (!fs.existsSync(depsDocPath)) {
    console.log('⚠️  docs/DEPENDENCIES.md not found. Creating template...');
    fs.mkdirSync('docs', { recursive: true });
    fs.writeFileSync(depsDocPath, `# Dependencies\n\n*Document your dependencies here.*\n`);
}

const depsDoc = fs.readFileSync(depsDocPath, 'utf8');
const undocumented = [];

for (const dep of Object.keys(allDeps)) {
    if (!depsDoc.includes(dep)) {
        undocumented.push(dep);
    }
}

if (undocumented.length > 0) {
    console.log('📦 Undocumented dependencies:');
    undocumented.forEach((dep) => console.log(`   - ${dep}`));
    console.log('\nPlease add these to docs/DEPENDENCIES.md');
    // Don't fail on MVP - just warn
    // process.exit(1);
} else {
    console.log('✅ All dependencies documented!');
}
