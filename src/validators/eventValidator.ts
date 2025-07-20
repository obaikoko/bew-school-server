import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'Title cannot be less than 3 characters'),
  description: z
    .string()
    .min(3, 'Description cannot be less than 3 characters'),
  date: z.coerce.date(),
  imageUrl: z.string().min(1, 'Please add an image'),
});
export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  imageUrl: z.string().optional(),
});
