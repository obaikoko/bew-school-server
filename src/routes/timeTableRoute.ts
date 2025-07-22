import express from 'express';

import {
  createTimeTable,
  getAllTimeTables,
  getTimeTableById,
  updateTimeTable,
  deleteTimeTable,
} from '../controllers/timeTableController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/add').post(protect, admin, createTimeTable);
router.route('/').get(protect, getAllTimeTables);
router
  .route('/:id')
  .get(protect, getTimeTableById)
  .put(protect, admin, updateTimeTable)
  .delete(protect, admin, deleteTimeTable);

export default router;
