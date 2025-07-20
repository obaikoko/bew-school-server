"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.eventSchema = void 0;
const zod_1 = require("zod");
exports.eventSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Title cannot be less than 3 characters'),
    description: zod_1.z
        .string()
        .min(3, 'Description cannot be less than 3 characters'),
    date: zod_1.z.coerce.date(),
    imageUrl: zod_1.z.string().min(1, 'Please add an image'),
});
exports.updateEventSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    date: zod_1.z.coerce.date().optional(),
    imageUrl: zod_1.z.string().optional(),
});
