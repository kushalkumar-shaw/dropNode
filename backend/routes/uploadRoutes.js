const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const { uploadFile, getAssets } = require('../controllers/uploadController');

const router = express.Router();

// Apply dual auth middleware for both routes
// Multer middleware processes a single file with fieldname 'file'
router.post('/upload', authMiddleware, uploadMiddleware.single('file'), uploadFile);
router.get('/assets', authMiddleware, getAssets);

module.exports = router;
