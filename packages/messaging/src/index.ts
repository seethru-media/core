/**
 * Messaging Package - Scaffold
 * E2E Encrypted DMs
 * Full implementation in Phase 2
 * 
 * Per Platform Charter (DM Policy):
 * - E2E encrypted - we CANNOT read messages
 * - We CAN act on user reports
 * - Rate limiting applied
 * - 30-day retention only
 */

export interface DirectMessage {
    id: string;
    threadId: string;
    senderId: string;
    recipientId: string;
    encryptedContent: string; // We never see plaintext
    createdAt: Date;
    expiresAt: Date; // 30 days from creation
}

export interface MessageThread {
    id: string;
    participantIds: [string, string];
    createdAt: Date;
    lastMessageAt: Date;
    status: 'active' | 'blocked' | 'reported';
}

// Placeholder (Phase 2)
export function canInitiateDM(
    _senderId: string,
    _recipientId: string
): { allowed: boolean; reason?: string } {
    // TODO: Check mutual follow, rate limits, blocks
    return { allowed: false, reason: 'DMs not yet implemented' };
}
