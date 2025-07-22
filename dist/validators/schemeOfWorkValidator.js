"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemeIdSchema = exports.updateSchemeSchema = exports.createSchemeSchema = void 0;
const zod_1 = require("zod");
exports.createSchemeSchema = zod_1.z.object({
    subject: zod_1.z.string().min(1, 'Subject Required'),
    level: zod_1.z.string().min(1, 'level Required'),
    term: zod_1.z.string().min(1, 'Term Required'),
    topics: zod_1.z.array(zod_1.z.string().min(1, 'Topic Required')),
});
exports.updateSchemeSchema = zod_1.z.object({
    subject: zod_1.z.string().min(2).optional(),
    level: zod_1.z.string().min(2).optional(),
    term: zod_1.z.string().min(2).optional(),
    topics: zod_1.z.array(zod_1.z.string().min(1)).optional(),
});
exports.schemeIdSchema = zod_1.z.object({
    id: zod_1.z.string().length(24, 'Invalid ID'),
});
