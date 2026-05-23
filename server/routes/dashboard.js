const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { stats } = require('../controllers/dashboardController');

router.get('/stats', auth, stats);

module.exports = router;
