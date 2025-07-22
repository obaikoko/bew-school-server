"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTimeTable = exports.updateTimeTable = exports.getTimeTableById = exports.getAllTimeTables = exports.createTimeTable = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const timeTableValidator_1 = require("../validators/timeTableValidator");
const createTimeTable = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = timeTableValidator_1.createTimeTableSchema.parse(req.body);
    const timetable = yield prisma_1.prisma.timeTable.create({
        data: validated,
    });
    res.status(201).json(timetable);
}));
exports.createTimeTable = createTimeTable;
const getAllTimeTables = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timetables = yield prisma_1.prisma.timeTable.findMany({
        orderBy: { createdAt: 'desc' },
    });
    res.json(timetables);
}));
exports.getAllTimeTables = getAllTimeTables;
const getTimeTableById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = timeTableValidator_1.timeTableIdSchema.parse(req.params);
    const timetable = yield prisma_1.prisma.timeTable.findUnique({ where: { id } });
    if (!timetable) {
        res.status(404);
        throw new Error('Timetable not found');
    }
    res.json(timetable);
}));
exports.getTimeTableById = getTimeTableById;
const updateTimeTable = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = timeTableValidator_1.timeTableIdSchema.parse(req.params);
    const validated = timeTableValidator_1.updateTimeTableSchema.parse(req.body);
    const existing = yield prisma_1.prisma.timeTable.findUnique({ where: { id } });
    if (!existing) {
        res.status(404);
        throw new Error('Timetable not found');
    }
    const updated = yield prisma_1.prisma.timeTable.update({
        where: { id },
        data: validated,
    });
    res.json(updated);
}));
exports.updateTimeTable = updateTimeTable;
const deleteTimeTable = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = timeTableValidator_1.timeTableIdSchema.parse(req.params);
    const existing = yield prisma_1.prisma.timeTable.findUnique({ where: { id } });
    if (!existing) {
        res.status(404);
        throw new Error('Timetable not found');
    }
    yield prisma_1.prisma.timeTable.delete({ where: { id } });
    res.json({ message: 'Timetable deleted successfully' });
}));
exports.deleteTimeTable = deleteTimeTable;
