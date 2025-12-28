/**
 * Moderation Types
 * Per Platform Charter: 4 Red Lines, Jury System
 */

// Red lines - immediate removal, no jury
export type RedLineViolation = 'csam' | 'direct-incitement' | 'doxxing' | 'fraud-impersonation';

// Flag types for jury review
export type FlagReason =
    | 'misinformation'
    | 'hate-speech'
    | 'harassment'
    | 'spam'
    | 'copyright'
    | 'other';

export interface ContentFlag {
    id: string;
    contentId: string;
    contentType: 'post' | 'comment' | 'dm-report';
    flaggedBy: string;
    reason: FlagReason;
    details?: string;
    createdAt: Date;
    status: 'pending' | 'jury-review' | 'resolved';
}

export interface JuryDecision {
    id: string;
    flagId: string;
    jurorIds: string[]; // anonymized
    votes: {
        keep: number;
        remove: number;
        restrict: number;
    };
    decision: 'keep' | 'remove' | 'restrict';
    rationale: string;
    deliberationSummary: string;
    decidedAt: Date;
}

export interface Juror {
    id: string;
    userId: string;
    trainedAt: Date;
    decisionsCount: number;
    overturnsCount: number;
    status: 'active' | 'suspended' | 'banned';
    eligibleUntil?: Date;
}

/**
 * Select jurors for a case
 * Per Charter: balanced by geography, political leaning, account age
 */
export interface JurySelectionCriteria {
    flagId: string;
    poolSize: number; // typically 5-7
    excludeUserIds: string[]; // reporter, content author
}
