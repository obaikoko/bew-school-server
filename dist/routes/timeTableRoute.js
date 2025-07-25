"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timeTableController_1 = require("../controllers/timeTableController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/add').post(authMiddleware_1.protect, authMiddleware_1.admin, timeTableController_1.createTimeTable);
router.route('/').get(authMiddleware_1.protect, timeTableController_1.getAllTimeTables);
router.route('/search').get(authMiddleware_1.protect, timeTableController_1.getTimeTableForClass);
router
    .route('/:id')
    .get(authMiddleware_1.protect, timeTableController_1.getTimeTableById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, timeTableController_1.updateTimeTable)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, timeTableController_1.deleteTimeTable);
exports.default = router;
