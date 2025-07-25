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
router.route('/edit').put(protect, admin, updateTimeTable);
router
  .route('/:id')
  .get(protect, getTimeTableById)
  .delete(protect, admin, deleteTimeTable);

export default router;
