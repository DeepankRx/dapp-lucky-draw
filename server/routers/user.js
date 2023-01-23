const UserController = require('../controllers/user');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
  cloud_name: 'deepank123',
  api_key: '776897673883258',
  api_secret: 'eHV3hRY3GSXmcHgoAoxj2SC00E0',
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Zerox',
  },
});
const upload = multer({ storage: storage });
router.get(
  '/getAUser/:walletAddress',
  UserController.getAUser
);
router.post('/getMultipleUser', UserController.getMultipleUser);
router.post('/addUser',  upload.single('image'), UserController.addUser);

module.exports = router;
