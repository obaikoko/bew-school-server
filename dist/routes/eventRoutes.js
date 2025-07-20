"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.route('/').get(eventController_1.getEvents).post(authMiddleware_1.protect, authMiddleware_1.admin, eventController_1.addEvent);
router
    .route('/:id')
    .put(authMiddleware_1.protect, authMiddleware_1.admin, eventController_1.updateEvent)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, eventController_1.deleteEvent);
exports.default = router;
