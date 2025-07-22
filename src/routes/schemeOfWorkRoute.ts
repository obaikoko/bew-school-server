import express from 'express';

import {
  createScheme,
  getAllSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
} from '../controllers/schemeOfWorkController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/add').post(protect, createScheme);
router.route('/').get(protect, admin, getAllSchemes);
router
  .route('/:id')
  .get(protect, getSchemeById)
  .put(protect, updateScheme)
  .delete(protect, admin, deleteScheme);

export default router;
