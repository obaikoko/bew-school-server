import express from 'express';

import {
  createTimeTable,
  getAllTimeTables,
  getTimeTableById,
  updateTimeTable,
  deleteTimeTable,
  getTimeTableForClass,
} from '../controllers/timeTableController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/add').post(protect, admin, createTimeTable);
router.route('/').get(protect, getAllTimeTables);
router.route('/search').get(protect, getTimeTableForClass);
router
  .route('/:id')
  .get(protect, getTimeTableById)
  .put(protect, admin, updateTimeTable)
  .delete(protect, admin, deleteTimeTable);

export default router;
