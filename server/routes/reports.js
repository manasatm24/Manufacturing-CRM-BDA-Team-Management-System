const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { summary } = require('../controllers/reportController');

router.get('/summary', auth, summary);

module.exports = router;
