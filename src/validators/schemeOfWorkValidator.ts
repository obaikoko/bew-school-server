import { z } from 'zod';

const topicSchema = z.object({
  week: z.number(),
  topic: z.string().array(),
});
export const createSchemeSchema = z.object({
  subject: z.string().min(1, 'Subject Required'),
  level: z.string().min(1, 'level Required'),
  term: z.string().min(1, 'Term Required'),
  topics: z.array(topicSchema),
});

export const updateSchemeSchema = z.object({
  subject: z.string().min(2).optional(),
  level: z.string().min(2).optional(),
  term: z.string().min(2).optional(),
  topics: z.array(topicSchema).optional(),
});

export const schemeIdSchema = z.object({
  id: z.string().length(24, 'Invalid ID'),
});
