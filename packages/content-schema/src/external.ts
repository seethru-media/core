import { z } from 'zod';

/**
 * External Content Schema
 * For syndicated content from Substack, Medium, etc.
 * (Metadata only - we don't store full content for copyright reasons)
 */
export const ExternalContentSchema = z.object({
    id: z.string(),

    // Source info
    source: z.enum(['substack', 'medium', 'ghost', 'wordpress', 'rss']),
    externalUrl: z.string().url(),
    canonicalUrl: z.string().url().optional(),

    // Attribution
    authorId: z.string(), // Our internal author ID
    authorName: z.string(),
    sourceName: z.string(), // e.g., "Stratechery", "Daring Fireball"

    // Content (metadata only)
    title: z.string(),
    excerpt: z.string().max(300),
    lowDataSummary: z.string().max(500), // Our generated summary

    // Dates
    publishedAt: z.string().datetime(),
    fetchedAt: z.string().datetime(),

    // Search
    embedding: z.array(z.number()).optional(), // AI embedding for semantic search

    // Display
    coverImage: z.string().url().optional(),
});

export type ExternalContent = z.infer<typeof ExternalContentSchema>;
