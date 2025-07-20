import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
const router = express.Router();

router.route('/').get(getEvents).post(protect, admin, addEvent);
router
  .route('/:id')
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);
export default router;
