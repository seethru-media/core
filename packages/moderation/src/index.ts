// Moderation Package - Scaffold
// Full implementation in Phase 2

export type {
    RedLineViolation,
    FlagReason,
    ContentFlag,
    JuryDecision,
    Juror,
    JurySelectionCriteria,
} from './types';

// Placeholder exports for future implementation
export const RED_LINES: readonly string[] = [
    'csam',
    'direct-incitement',
    'doxxing',
    'fraud-impersonation',
] as const;

export function isRedLineViolation(reason: string): boolean {
    return RED_LINES.includes(reason);
}
