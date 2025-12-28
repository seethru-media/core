#!/usr/bin/env node
/**
 * Prototype Check
 * Finds expired prototype components
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const prototypePattern = /PROTOTYPE:\s*Expires?\s*(\d{4}-\d{2}-\d{2})/gi;

function findPrototypes(dir) {
    const results = [];

    try {
        const files = execSync(`find ${dir} -name "_prototypes" -type d`, { encoding: 'utf8' })
            .trim()
            .split('\n')
            .filter(Boolean);

        for (const protoDir of files) {
            const protoFiles = fs.readdirSync(protoDir);
            for (const file of protoFiles) {
                const filePath = path.join(protoDir, file);
                if (fs.statSync(filePath).isFile()) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const match = prototypePattern.exec(content);
                    if (match) {
                        results.push({
                            file: filePath,
                            expires: new Date(match[1]),
                        });
                    }
                }
            }
        }
    } catch (e) {
        // No prototype directories found
    }

    return results;
}

const prototypes = findPrototypes('apps');
const now = new Date();
const expired = prototypes.filter((p) => p.expires < now);

if (expired.length > 0) {
    console.log('⚠️  Expired prototypes found:');
    expired.forEach((p) => {
        console.log(`   - ${p.file} (expired ${p.expires.toISOString().split('T')[0]})`);
    });
    console.log('\nPlease systemize or delete these components.');
} else {
    console.log('✅ No expired prototypes.');
}
