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
exports.deleteEvent = exports.updateEvent = exports.addEvent = exports.getEvents = void 0;
const prisma_1 = require("../config/db/prisma");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const eventValidator_1 = require("../validators/eventValidator");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const getEvents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield prisma_1.prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
    });
    if (!events) {
        res.status(404);
        throw new Error('No Event found!');
    }
    else {
        res.status(200);
        res.json(events);
    }
}));
exports.getEvents = getEvents;
const addEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = eventValidator_1.eventSchema.parse(req.body);
    const { title, description, date, imageUrl } = validateData;
    let uploadedResponse;
    try {
        uploadedResponse = yield cloudinary_1.default.uploader.upload(imageUrl, {
            folder: 'samples',
        });
    }
    catch (error) {
        console.log(error);
        throw new Error('Unable to upload Image');
    }
    const event = yield prisma_1.prisma.event.create({
        data: {
            title,
            description,
            date,
            imageUrl: uploadedResponse.url,
            imagePublicId: uploadedResponse.public_id,
        },
    });
    if (event) {
        res.status(200).json(event);
    }
    else {
        res.status(500);
        throw new Error('Something went wrong');
    }
}));
exports.addEvent = addEvent;
const updateEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = eventValidator_1.updateEventSchema.parse(req.body);
    const { title, description, date, imageUrl } = validateData;
    const event = yield prisma_1.prisma.event.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }
    if (imageUrl) {
        const existingImageId = (event === null || event === void 0 ? void 0 : event.imagePublicId) || '';
        if (existingImageId) {
            const newImageId = existingImageId.substring(existingImageId.indexOf('samples') + 'samples/'.length);
            const uploadedResponse = yield cloudinary_1.default.uploader.upload(imageUrl, {
                folder: 'samples',
                public_id: newImageId,
            });
            const updatedEvent = yield prisma_1.prisma.event.update({
                where: {
                    id: event.id,
                },
                data: {
                    title: title !== null && title !== void 0 ? title : event.title,
                    description: description !== null && description !== void 0 ? description : event.description,
                    date: date !== null && date !== void 0 ? date : event.date,
                    imagePublicId: uploadedResponse.public_id,
                    imageUrl: uploadedResponse.url,
                },
            });
            res.status(200).json(updatedEvent);
        }
        else {
            const uploadedResponse = yield cloudinary_1.default.uploader.upload(imageUrl, {
                folder: 'samples',
            });
            const updatedEvent = yield prisma_1.prisma.event.update({
                where: {
                    id: event.id,
                },
                data: {
                    title: title !== null && title !== void 0 ? title : event.title,
                    description: description !== null && description !== void 0 ? description : event.description,
                    date: date !== null && date !== void 0 ? date : event.date,
                    imagePublicId: uploadedResponse.public_id,
                    imageUrl: uploadedResponse.url,
                },
            });
            res.status(200).json(updatedEvent);
        }
    }
}));
exports.updateEvent = updateEvent;
const deleteEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield prisma_1.prisma.event.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!event) {
            res.status(404);
            throw new Error('Event not found!');
        }
        yield prisma_1.prisma.event.delete({
            where: {
                id: event.id,
            },
        });
        res.status(200).json('Event deleted successfully');
    }
    catch (error) {
        throw error;
    }
}));
exports.deleteEvent = deleteEvent;
