import { z } from 'zod';

export const registerStaffSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  otherName: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date({ message: 'Invalid date of birth' }),
  qualification: z.string().min(1, ' qualification cannot be empty'),
  category: z.string().min(1, ' category cannot be empty'),
  role: z.string().min(1, ' role cannot be empty'),
  gender: z.string().min(1, 'Gender is required'),
  yearAdmitted: z.coerce.date({ message: 'Invalid admission year' }),
  stateOfOrigin: z.string().min(1, 'State of origin is required'),
  localGvt: z.string().min(1, 'Local government is required'),
  homeTown: z.string().min(1, 'Hometown is required').optional().nullable(),
  phone: z.string().regex(/^\d{10,15}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  residence: z.string().min(3, 'residence must be at least 3 characters'),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
});

export const staffSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  otherName: z.string().optional(),
  dateOfBirth: z.string(),
  qualification: z.string().optional(),
  category: z.string().optional(),
  role: z.string().optional(),
  gender: z.string(),
  maritalStatus: z.string().optional(),
  yearAdmitted: z.date().optional(),
  stateOfOrigin: z.string().optional(),
  localGvt: z.string().optional(),
  homeTown: z.string().optional(),
  residence: z.string().optional(),
  phone: z.string(),
  email: z.string().email(),
  image: z.string().optional(), // base64 or URL
});

export type RegisterStaffInput = z.infer<typeof registerStaffSchema>;
