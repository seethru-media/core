import type { ContentFingerprint } from './types';

/**
 * Generate SHA-256 fingerprint of content
 * Used for content provenance and copyright protection
 */
export async function generateFingerprint(
    contentId: string,
    content: string
): Promise<ContentFingerprint> {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return {
        contentId,
        hash,
        algorithm: 'sha256',
        createdAt: new Date(),
    };
}

/**
 * Verify content matches fingerprint
 */
export async function verifyFingerprint(
    content: string,
    expectedHash: string
): Promise<boolean> {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const actualHash = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    return actualHash === expectedHash;
}
