"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemeOfWorkController_1 = require("../controllers/schemeOfWorkController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/add').post(authMiddleware_1.protect, schemeOfWorkController_1.createScheme);
router.route('/').get(authMiddleware_1.protect, authMiddleware_1.admin, schemeOfWorkController_1.getAllSchemes);
router.route('/search').get(authMiddleware_1.protect, schemeOfWorkController_1.getClassScheme);
router
    .route('/:id')
    .get(authMiddleware_1.protect, schemeOfWorkController_1.getSchemeById)
    .put(authMiddleware_1.protect, schemeOfWorkController_1.updateScheme)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, schemeOfWorkController_1.deleteScheme);
exports.default = router;
