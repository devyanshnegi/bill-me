import express from 'express';
import multer from 'multer';
import { uploadAndDetectText } from '../controllers/visionController.js';

// Set up the router
const router = express.Router();

// Configure multer for file uploads (storage configuration)
const upload = multer({ dest: 'uploads/' }); // Files will be temporarily stored in 'uploads/' directory

// Route to handle image upload and text detection
router.post('/upload', upload.single('image'), uploadAndDetectText);

export default router;
