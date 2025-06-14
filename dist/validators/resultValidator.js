"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResultSchema = exports.createResultSchema = void 0;
const zod_1 = require("zod");
exports.createResultSchema = zod_1.z.object({
    session: zod_1.z.string().min(3, 'session cannot be less than 3 characters'),
    level: zod_1.z.string().min(3, 'level cannot be less than 3 characters'),
    term: zod_1.z.string().min(3, 'term cannot be less than 3 characters'),
});
exports.updateResultSchema = zod_1.z.object({
    subject: zod_1.z.string().optional(),
    test: zod_1.z.coerce.number().max(30, 'test score cannot be more than 30'),
    exam: zod_1.z.coerce.number().max(70, 'exam score cannot be more than 30'),
    grade: zod_1.z.string().optional(),
    affectiveAssessments: zod_1.z
        .array(zod_1.z.object({
        aCategory: zod_1.z.string(),
        grade: zod_1.z.string(),
    }))
        .optional(),
    psychomotorAssessments: zod_1.z
        .array(zod_1.z.object({
        pCategory: zod_1.z.string(),
        grade: zod_1.z.string(),
    }))
        .optional(),
    teacherRemark: zod_1.z.string().optional(),
    principalRemark: zod_1.z.string().optional(),
});
