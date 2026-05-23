const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const employeeController = require('../controllers/employeeController');

// Admin-only create
router.post('/', auth, isAdmin, employeeController.createEmployee);
// Any authenticated user can view employees
router.get('/', auth, employeeController.getEmployees);

module.exports = router;
