import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import { studentsData, userData } from '../controllers/data-controller';

const router = express.Router();

router.route('/students').get(protect, studentsData);
router.route('/users').get(protect, admin, userData);

export default router;
