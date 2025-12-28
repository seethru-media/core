/**
 * Search Package - Scaffold
 * AI-powered semantic search
 * Full implementation in Phase 2
 * 
 * Per Platform Charter:
 * - Privacy-first: Use Cloudflare Workers AI
 * - Hybrid: keyword + semantic
 * - No external AI unless disclosed
 */

export interface SearchResult {
    id: string;
    type: 'post' | 'external';
    title: string;
    excerpt: string;
    url: string;
    author: string;
    score: number;
    isExternal: boolean;
}

export interface SearchOptions {
    query: string;
    limit?: number;
    offset?: number;
    subdomain?: string;
    dateRange?: { start: Date; end: Date };
    includeExternal?: boolean;
}

// Placeholder (Phase 2)
export async function search(_options: SearchOptions): Promise<SearchResult[]> {
    // TODO: Implement hybrid search
    return [];
}

// Placeholder for embedding generation
export async function generateEmbedding(_text: string): Promise<number[]> {
    // TODO: Use Cloudflare Workers AI
    return [];
}
