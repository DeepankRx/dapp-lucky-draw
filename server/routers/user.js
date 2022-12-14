const UserController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/getAUser/:walletAddress', UserController.getAUser);
router.post('/getMultipleUser', UserController.getMultipleUser);
router.post('/addUser', UserController.addUser);

module.exports = router;
