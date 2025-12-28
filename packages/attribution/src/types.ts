/**
 * Attribution Types
 */

export interface AttributionData {
    authorId: string;
    authorName: string;
    authorUrl?: string;
    source: string;
    sourceUrl?: string;
    publishedAt: Date;
    license?: string;
    aiDisclosure?: 'none' | 'ai-assisted' | 'ai-generated';
}

export interface ContentFingerprint {
    contentId: string;
    hash: string;
    algorithm: 'sha256';
    createdAt: Date;
}

export interface LowDataContent {
    title: string;
    summary: string;
    readMoreUrl: string;
    author: string;
    date: string;
}
