import { z } from 'zod';

export const postCreateSchema = z.object({
    title: z.string().max(20, { message: 'Title must be less than 20 characters' }),
    content: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    slug: z.string(),
    keywords: z.string(),
    description: z.string(),
    published: z.boolean(),
    author: z.string(),
});

export const postUpdateSchema = z.object({
    id: z.number(),
    title: z.string().max(20, { message: 'Title must be less than 20 characters' }),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    slug: z.string().optional(),
    keywords: z.string().optional(),
    description: z.string().optional(),
    published: z.boolean().optional(),
    author: z.string().optional(),
});