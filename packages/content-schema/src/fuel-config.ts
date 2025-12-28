import { z } from 'zod';

/**
 * Fuel Config Schema
 * Configuration for subdomain content repositories
 * (seethru.config.json in each Fuel repo)
 */
export const FuelConfigSchema = z.object({
    // Required
    name: z.string(),
    subdomain: z.string(),

    // Theme overrides
    theme: z.object({
        primaryHue: z.number().min(0).max(360).optional(),
        primarySaturation: z.number().min(0).max(100).optional(),
        logo: z.string().optional(),
        favicon: z.string().optional(),
    }).optional(),

    // Content settings
    content: z.object({
        defaultCategory: z.string().optional(),
        requiredTags: z.array(z.string()).optional(),
    }).optional(),

    // Maintainers
    maintainers: z.array(z.object({
        name: z.string(),
        github: z.string().optional(),
        email: z.string().email().optional(),
    })).optional(),

    // License
    license: z.string().default('CC BY-SA 4.0'),
});

export type FuelConfig = z.infer<typeof FuelConfigSchema>;
