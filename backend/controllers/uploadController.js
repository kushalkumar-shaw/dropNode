const Asset = require('../models/Asset');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or file type is not allowed' });
    }

    const port = process.env.PORT || 5000;
    const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
    
    // Construct the public URL for the uploaded file
    const publicUrl = `${baseUrl}/uploads/${req.file.filename}`;

    // Save asset metadata into the database
    const newAsset = await Asset.create({
      userId: req.user.id,
      filename: req.file.filename,
      publicUrl: publicUrl,
      mimeType: req.file.mimetype,
      fileSize: req.file.size
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      publicUrl: publicUrl,
      asset: newAsset
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Server error during file upload' });
  }
};

const getAssets = async (req, res) => {
  try {
    // Retrieve all assets belonging to the authenticated user
    const assets = await Asset.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    console.error('Get Assets Error:', error);
    res.status(500).json({ error: 'Server error while retrieving assets' });
  }
};

module.exports = { uploadFile, getAssets };
