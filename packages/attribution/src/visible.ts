import type { AttributionData } from './types';

/**
 * Generate visible attribution string
 * Platform Charter: Every content display MUST include visible attribution
 */
export function generateAttributionString(data: AttributionData): string {
    const parts = [
        `By ${data.authorName}`,
        data.source,
        formatDate(data.publishedAt),
    ];

    if (data.license) {
        parts.push(`Licensed under ${data.license}`);
    }

    return parts.join(' · ');
}

/**
 * Generate attribution HTML for embedding
 */
export function generateAttributionHtml(data: AttributionData): string {
    const authorLink = data.authorUrl
        ? `<a href="${data.authorUrl}">${data.authorName}</a>`
        : data.authorName;

    const sourceLink = data.sourceUrl
        ? `<a href="${data.sourceUrl}">${data.source}</a>`
        : data.source;

    return `<div class="seethru-attribution">
  By ${authorLink} · ${sourceLink} · ${formatDate(data.publishedAt)}
</div>`;
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
