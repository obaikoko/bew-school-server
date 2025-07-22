import { z } from 'zod';

const periodSchema = z.object({
  subject: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
});

export const createTimeTableSchema = z.object({
  level: z.string().min(1),
  day: z.string().min(1),
  periods: z.array(periodSchema).min(1),
});

export const updateTimeTableSchema = z.object({
  level: z.string().min(1).optional(),
  day: z.string().min(1).optional(),
  periods: z.array(periodSchema).optional(),
});

export const timeTableIdSchema = z.object({
  id: z.string().length(24, 'Invalid timetable ID'),
});
