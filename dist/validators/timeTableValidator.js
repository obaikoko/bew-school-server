"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeTableIdSchema = exports.updateTimeTableSchema = exports.createTimeTableSchema = void 0;
const zod_1 = require("zod");
const periodSchema = zod_1.z.object({
    subject: zod_1.z.string().min(1),
    startTime: zod_1.z.string().min(1),
    endTime: zod_1.z.string().min(1),
});
exports.createTimeTableSchema = zod_1.z.object({
    level: zod_1.z.string().min(1),
    day: zod_1.z.string().min(1),
    periods: zod_1.z.array(periodSchema).min(1),
});
exports.updateTimeTableSchema = zod_1.z.object({
    level: zod_1.z.string().min(1).optional(),
    day: zod_1.z.string().min(1).optional(),
    periods: zod_1.z.array(periodSchema).optional(),
});
exports.timeTableIdSchema = zod_1.z.object({
    id: zod_1.z.string().length(24, 'Invalid timetable ID'),
});
