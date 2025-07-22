"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementIdSchema = exports.updateAnnouncementSchema = exports.createAnnouncementSchema = void 0;
const zod_1 = require("zod");
exports.createAnnouncementSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    message: zod_1.z.string().min(5),
    target: zod_1.z.string(),
});
exports.updateAnnouncementSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).optional(),
    message: zod_1.z.string().min(5).optional(),
    target: zod_1.z.string(),
});
exports.announcementIdSchema = zod_1.z.object({
    id: zod_1.z.string().length(24, 'Invalid ID'),
});
