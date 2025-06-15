import { z } from 'zod';

export const createResultSchema = z.object({
  session: z.string().min(3, 'session cannot be less than 3 characters'),
  level: z.string().min(3, 'level cannot be less than 3 characters'),
  term: z.string().min(3, 'term cannot be less than 3 characters'),
});

export const updateResultSchema = z.object({
  subject: z.string().optional(),
  test: z.coerce
    .string()
    .max(30, 'test score cannot be more than 30')
    .optional()
    .nullable(),
  exam: z.coerce
    .string()
    .max(70, 'exam score cannot be more than 30')
    .optional()
    .nullable(),
  grade: z.string().optional(),

  affectiveAssessments: z
    .array(
      z.object({
        aCategory: z.string(),
        grade: z.string(),
      })
    )
    .optional(),

  psychomotorAssessments: z
    .array(
      z.object({
        pCategory: z.string(),
        grade: z.string(),
      })
    )
    .optional(),

  teacherRemark: z.string().optional(),
  principalRemark: z.string().optional(),
});
