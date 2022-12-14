const WinnerController = require('../controllers/winners');
const express = require('express');
const router = express.Router();

router.post('/addWinner', WinnerController.addWinner);
router.get('/getAllWinners', WinnerController.getAllWinners);

module.exports = router;
