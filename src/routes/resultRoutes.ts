import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createResult,
  getResult,
  getResults,
  getStudentResults,
  deleteResult,
  updateResult,
} from '../controllers/resultController';

const router = express.Router();
router.route('/').get(protect, getResults);
router
  .route('/:id')
  .post(protect, createResult)
  .get(protect, getResult)
  .put(protect, updateResult)
  .delete(protect, deleteResult);
router.route('/student/:id').get(protect, getStudentResults);

export default router;
