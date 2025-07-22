import express from 'express';
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/add').post(protect, admin, createAnnouncement);
router.route('/').get(protect, getAllAnnouncements);
router
  .route('/:id')
  .get(protect, getAnnouncementById)
  .put(protect, admin, updateAnnouncement)
  .delete(protect, admin, deleteAnnouncement);

export default router;
