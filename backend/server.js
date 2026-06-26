require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the /uploads folder statically
// The prefix is /uploads, mapping to the local uploads/ directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes); // Mounts /api/upload and /api/assets

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  // Check if it's a Multer error
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size limit exceeded. Maximum size is 10MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } 
  // Custom errors thrown by fileFilter
  else if (err) {
    return res.status(400).json({ error: err.message || 'An unexpected error occurred.' });
  }
  next();
});

// Database connection & Server initialization
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn('WARNING: MONGO_URI is not defined in .env file.');
}

mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/dropnode')
  .then(() => {
    console.log('Connected to MongoDB Database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
