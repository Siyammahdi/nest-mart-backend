
import express from 'express';
import { isAdmin } from '../middleware/admin.middleware';
import { getAdminDashboard } from '../controllers/admin.controllers';

const router = express.Router();

router.get('/dashboard', isAdmin, getAdminDashboard);

export default router;