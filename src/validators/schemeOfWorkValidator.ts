import { z } from 'zod';

export const createSchemeSchema = z.object({
  subject: z.string().min(1, 'Subject Required'),
  level: z.string().min(1, 'level Required'),
  term: z.string().min(1, 'Term Required'),
  topics: z.array(z.string().min(1, 'Topic Required')),
});

export const updateSchemeSchema = z.object({
  subject: z.string().min(2).optional(),
  level: z.string().min(2).optional(),
  term: z.string().min(2).optional(),
  topics: z.array(z.string().min(1)).optional(),
});

export const schemeIdSchema = z.object({
  id: z.string().length(24, 'Invalid ID'),
});
