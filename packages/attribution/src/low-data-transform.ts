import type { LowDataContent } from './types';

/**
 * Transform content for low-bandwidth mode
 * Strips HTML, limits length, creates text-only summary
 */
export function transformToLowData(
    title: string,
    content: string,
    author: string,
    date: Date,
    url: string,
    maxLength = 500
): LowDataContent {
    // Strip HTML tags
    const textContent = content
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    // Truncate to max length
    const summary =
        textContent.length > maxLength
            ? textContent.substring(0, maxLength - 3) + '...'
            : textContent;

    return {
        title,
        summary,
        readMoreUrl: url,
        author,
        date: date.toISOString().split('T')[0],
    };
}

/**
 * Generate minimal HTML for low-data mode
 */
export function generateLowDataHtml(data: LowDataContent): string {
    return `<article>
<h1>${data.title}</h1>
<p><em>By ${data.author} · ${data.date}</em></p>
<p>${data.summary}</p>
<p><a href="${data.readMoreUrl}">Read full article →</a></p>
</article>`;
}
