/**
 * Attribution Component
 * 
 * PLATFORM CHARTER REQUIREMENT:
 * Every content display component MUST include visible attribution.
 * There is no "hide author" option.
 */

export interface AttributionProps {
    /** Author display name */
    author: string;
    /** Link to author profile */
    authorUrl?: string;
    /** Source platform (e.g., "seethru.media", "silly.digital") */
    source?: string;
    /** Link to source platform */
    sourceUrl?: string;
    /** Publication date */
    date: Date | string;
    /** License (e.g., "CC BY-SA 4.0") */
    license?: string;
    /** Content verification badges */
    badges?: Array<'verified' | 'ai-assisted' | 'ai-generated'>;
    /** Additional CSS class */
    className?: string;
}

function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

const badgeLabels: Record<string, string> = {
    verified: '✓ Verified',
    'ai-assisted': '🤖 AI-Assisted',
    'ai-generated': '🤖 AI-Generated',
};

export function Attribution({
    author,
    authorUrl,
    source,
    sourceUrl,
    date,
    license,
    badges = [],
    className = '',
}: AttributionProps) {
    return (
        <div className={`attribution ${className}`.trim()}>
            <span className="attribution__author">
                By{' '}
                {authorUrl ? (
                    <a href={authorUrl}>{author}</a>
                ) : (
                    author
                )}
            </span>

            {source && (
                <span className="attribution__source">
                    {sourceUrl ? (
                        <a href={sourceUrl}>{source}</a>
                    ) : (
                        source
                    )}
                </span>
            )}

            <span className="attribution__date">{formatDate(date)}</span>

            {license && (
                <span className="attribution__license">{license}</span>
            )}

            {badges.map((badge) => (
                <span
                    key={badge}
                    className={`attribution__badge attribution__badge--${badge}`}
                >
                    {badgeLabels[badge]}
                </span>
            ))}
        </div>
    );
}
