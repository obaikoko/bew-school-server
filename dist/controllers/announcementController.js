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
exports.deleteAnnouncement = exports.updateAnnouncement = exports.getAnnouncementById = exports.getAllAnnouncements = exports.createAnnouncement = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const announcementValidator_1 = require("../validators/announcementValidator");
// @route POST /announcement/add
// @desc Create/Add new announcement
// @Privacy Private
const createAnnouncement = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = announcementValidator_1.createAnnouncementSchema.parse(req.body);
    const announcement = yield prisma_1.prisma.announcement.create({
        data: Object.assign(Object.assign({}, validated), { createdBy: req.user.id }),
    });
    res.status(201).json(announcement);
}));
exports.createAnnouncement = createAnnouncement;
// @route GET /announcement
// @desc Get  announcements
// @Privacy Privateexport
const getAllAnnouncements = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const announcements = yield prisma_1.prisma.announcement.findMany({
        orderBy: { createdAt: 'desc' },
    });
    res.json(announcements);
}));
exports.getAllAnnouncements = getAllAnnouncements;
// @route GET announcement/:id
// @desc Get  announcement by ID
// @Privacy Private
const getAnnouncementById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = announcementValidator_1.announcementIdSchema.parse(req.params);
    const announcement = yield prisma_1.prisma.announcement.findUnique({
        where: { id },
    });
    if (!announcement) {
        res.status(404);
        throw new Error('Announcement not found');
    }
    res.json(announcement);
}));
exports.getAnnouncementById = getAnnouncementById;
// @route PUT /announcement/:id
// @desc Update announcement
// @Privacy Private
const updateAnnouncement = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = announcementValidator_1.announcementIdSchema.parse(req.params);
    const validated = announcementValidator_1.updateAnnouncementSchema.parse(req.body);
    const existing = yield prisma_1.prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
        res.status(404);
        throw new Error('Announcement not found');
    }
    const updated = yield prisma_1.prisma.announcement.update({
        where: { id },
        data: validated,
    });
    res.json(updated);
}));
exports.updateAnnouncement = updateAnnouncement;
// @route DELETE /announcement/:id
// @desc Delete announcement
// @Privacy Private
const deleteAnnouncement = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = announcementValidator_1.announcementIdSchema.parse(req.params);
    const existing = yield prisma_1.prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
        res.status(404);
        throw new Error('Announcement not found');
    }
    yield prisma_1.prisma.announcement.delete({ where: { id } });
    res.json({ message: 'Announcement deleted' });
}));
exports.deleteAnnouncement = deleteAnnouncement;
