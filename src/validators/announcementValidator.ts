import { z } from 'zod';

export const createAnnouncementSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
  target: z.string(),
});

export const updateAnnouncementSchema = z.object({
  title: z.string().min(3).optional(),
  message: z.string().min(5).optional(),
  target: z.string(),
});

export const announcementIdSchema = z.object({
  id: z.string().length(24, 'Invalid ID'),
});
