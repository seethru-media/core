import { z } from 'zod';

/**
 * Author Schema
 * Represents a content creator on the platform
 */
export const AuthorSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    bio: z.string().optional(),
    avatar: z.string().url().optional(),
    profileUrl: z.string().url().optional(),

    // External links
    links: z.object({
        twitter: z.string().optional(),
        substack: z.string().optional(),
        website: z.string().url().optional(),
    }).optional(),

    // Verification status
    verified: z.boolean().default(false),
    verifiedAt: z.string().datetime().optional(),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export type Author = z.infer<typeof AuthorSchema>;
