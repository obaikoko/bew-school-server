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
exports.deleteScheme = exports.updateScheme = exports.getSchemeById = exports.getAllSchemes = exports.createScheme = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const schemeOfWorkValidator_1 = require("../validators/schemeOfWorkValidator");
const createScheme = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized');
    }
    const validated = schemeOfWorkValidator_1.createSchemeSchema.parse(req.body);
    const scheme = yield prisma_1.prisma.schemeOfWork.create({
        data: Object.assign(Object.assign({}, validated), { userId: req.user.id }),
    });
    res.status(201).json(scheme);
}));
exports.createScheme = createScheme;
const getAllSchemes = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schemes = yield prisma_1.prisma.schemeOfWork.findMany({
        orderBy: { createdAt: 'desc' },
    });
    res.json(schemes);
}));
exports.getAllSchemes = getAllSchemes;
const getSchemeById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = schemeOfWorkValidator_1.schemeIdSchema.parse(req.params);
    const scheme = yield prisma_1.prisma.schemeOfWork.findUnique({ where: { id } });
    if (!scheme) {
        res.status(404);
        throw new Error('Scheme not found');
    }
    res.json(scheme);
}));
exports.getSchemeById = getSchemeById;
const updateScheme = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = schemeOfWorkValidator_1.schemeIdSchema.parse(req.params);
    const validated = schemeOfWorkValidator_1.updateSchemeSchema.parse(req.body);
    const existing = yield prisma_1.prisma.schemeOfWork.findUnique({ where: { id } });
    if (!existing) {
        res.status(404);
        throw new Error('Scheme not found');
    }
    const updated = yield prisma_1.prisma.schemeOfWork.update({
        where: { id },
        data: validated,
    });
    res.json(updated);
}));
exports.updateScheme = updateScheme;
const deleteScheme = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = schemeOfWorkValidator_1.schemeIdSchema.parse(req.params);
    const existing = yield prisma_1.prisma.schemeOfWork.findUnique({ where: { id } });
    if (!existing) {
        res.status(404);
        throw new Error('Scheme not found');
    }
    yield prisma_1.prisma.schemeOfWork.delete({ where: { id } });
    res.json('Scheme deleted successfully');
}));
exports.deleteScheme = deleteScheme;
