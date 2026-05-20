const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { 
    fileSize: 5 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WEBP) are allowed!'));
  }
});

const videoUpload = multer({ 
  storage,
  limits: { 
    fileSize: 50 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi|webm/;
    const mimetype = file.mimetype.startsWith('video/');
    const extname = filetypes.test(file.originalname.toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only video files (MP4, MOV, AVI, WEBM) are allowed!'));
  }
});

router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { propertyCode } = req.body;
    const watermarkText = propertyCode ? `Tanavi Properties - ${propertyCode}` : 'Tanavi Properties';

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'tanavi_properties', 
          resource_type: 'auto',
          timeout: 60000,
          transformation: [
            { width: 1200, height: 800, crop: 'fill', gravity: 'auto' },
            {
              overlay: {
                font_family: 'Arial',
                font_size: 80,
                font_weight: 'bold',
                text: watermarkText
              },
              gravity: 'center',
              angle: -30,
              opacity: 50,
              color: 'white'
            }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to upload image',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

router.post('/video', protect, adminOnly, videoUpload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video uploaded' });
    }

    const { propertyCode } = req.body;
    const watermarkText = propertyCode ? `Tanavi Properties - ${propertyCode}` : 'Tanavi Properties';

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'tanavi_properties/videos', 
          resource_type: 'video',
          timeout: 120000,
          transformation: [
            {
              overlay: {
                font_family: 'Arial',
                font_size: 100,
                font_weight: 'bold',
                text: watermarkText
              },
              gravity: 'center',
              angle: -30,
              opacity: 50,
              color: 'white'
            }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary video error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url, duration: result.duration });
  } catch (error) {
    console.error('Cloudinary video upload error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to upload video',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

router.post('/public', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'tanavi_properties/user_listings', 
          resource_type: 'auto',
          timeout: 60000,
          transformation: [
            { width: 1200, height: 800, crop: 'fill', gravity: 'auto' },
            {
              overlay: {
                font_family: 'Arial',
                font_size: 80,
                font_weight: 'bold',
                text: 'Tanavi Properties'
              },
              gravity: 'center',
              angle: -30,
              opacity: 50,
              color: 'white'
            }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to upload image' });
  }
});

router.options('/public/video', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

router.post('/public/video', videoUpload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video uploaded' });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'tanavi_properties/user_listings/videos', 
          resource_type: 'video',
          timeout: 120000,
          transformation: [
            {
              overlay: {
                font_family: 'Arial',
                font_size: 100,
                font_weight: 'bold',
                text: 'Tanavi Properties'
              },
              gravity: 'center',
              angle: -30,
              opacity: 50,
              color: 'white'
            }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url, duration: result.duration });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to upload video' });
  }
});

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum 50MB for videos, 5MB for images' });
    }
    return res.status(400).json({ message: error.message });
  }
  next(error);
});

router.delete('/:publicId', protect, adminOnly, async (req, res) => {
  try {
    const publicId = req.params.publicId.replace(/-/g, '/');
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
