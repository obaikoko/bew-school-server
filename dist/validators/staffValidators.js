"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffSchema = exports.registerStaffSchema = void 0;
const zod_1 = require("zod");
exports.registerStaffSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3, 'First name must be at least 3 letters'),
    lastName: zod_1.z.string().min(3, 'Last name must be at least 3 letters'),
    otherName: zod_1.z.string().optional().nullable(),
    maritalStatus: zod_1.z.string().optional().nullable(),
    dateOfBirth: zod_1.z.coerce.date({ message: 'Invalid date of birth' }),
    qualification: zod_1.z.string().min(1, ' qualification cannot be empty'),
    category: zod_1.z.string().min(1, ' category cannot be empty'),
    role: zod_1.z.string().min(1, ' role cannot be empty'),
    gender: zod_1.z.string().min(1, 'Gender is required'),
    yearAdmitted: zod_1.z.coerce.date({ message: 'Invalid admission year' }),
    stateOfOrigin: zod_1.z.string().min(1, 'State of origin is required'),
    localGvt: zod_1.z.string().min(1, 'Local government is required'),
    homeTown: zod_1.z.string().min(1, 'Hometown is required').optional().nullable(),
    phone: zod_1.z.string().regex(/^\d{10,15}$/, 'Invalid phone number'),
    email: zod_1.z.string().email('Invalid email address'),
    residence: zod_1.z.string().min(3, 'residence must be at least 3 characters'),
    imageUrl: zod_1.z.string().optional(),
    imagePublicId: zod_1.z.string().optional(),
});
exports.staffSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    otherName: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string(),
    qualification: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    gender: zod_1.z.string(),
    maritalStatus: zod_1.z.string().optional(),
    yearAdmitted: zod_1.z.date().optional(),
    stateOfOrigin: zod_1.z.string().optional(),
    localGvt: zod_1.z.string().optional(),
    homeTown: zod_1.z.string().optional(),
    residence: zod_1.z.string().optional(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().email(),
    image: zod_1.z.string().optional(), // base64 or URL
});
