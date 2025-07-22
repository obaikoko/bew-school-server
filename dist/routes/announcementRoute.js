"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const announcementController_1 = require("../controllers/announcementController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/add').post(authMiddleware_1.protect, authMiddleware_1.admin, announcementController_1.createAnnouncement);
router.route('/').get(authMiddleware_1.protect, announcementController_1.getAllAnnouncements);
router
    .route('/:id')
    .get(authMiddleware_1.protect, announcementController_1.getAnnouncementById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, announcementController_1.updateAnnouncement)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, announcementController_1.deleteAnnouncement);
exports.default = router;
