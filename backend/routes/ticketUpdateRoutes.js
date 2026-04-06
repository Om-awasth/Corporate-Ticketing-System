import express from 'express';
import { addUpdate, getUpdates } from '../controllers/ticketUpdateController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/:ticketId', addUpdate);
router.get('/:ticketId', getUpdates);

export default router;
