import express from 'express';
import { getData, postData } from '../controllers/someController.js'; // Import functions from controller

const router = express.Router();

// Define routes
router.get('/data', getData);
router.post('/data', postData);

export default router; // Export router as the default export
