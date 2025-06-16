import {
  updateResultPaymentSchema,
  updateResultSchema,
} from '../validators/resultValidator';
import { z } from 'zod';

export type UpdateResult = z.infer<typeof updateResultSchema>;
export type UpdateResultPayment = z.infer<typeof updateResultPaymentSchema>;
