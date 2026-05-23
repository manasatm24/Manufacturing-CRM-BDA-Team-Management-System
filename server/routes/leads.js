const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const leadController = require('../controllers/leadController');

router.post('/', auth, leadController.createLead);
router.get('/', auth, leadController.getLeads);
router.get('/:id', auth, leadController.getLead);
router.put('/:id', auth, leadController.updateLead);
router.delete('/:id', auth, leadController.deleteLead);

module.exports = router;
