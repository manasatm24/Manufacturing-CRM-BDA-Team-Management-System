const User = require('../models/User');
const bcrypt = require('bcryptjs');
const memoryStore = require('../config/memoryStore');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (global.useMemoryStore) {
      await memoryStore.ensureDemoUser();
      if (memoryStore.findUserByEmail(email)) return res.status(400).json({ msg: 'Employee already exists' });
      const user = await memoryStore.createUser({ name, email, password, role: role || 'employee' });
      return res.json(memoryStore.toPublicUser(user));
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Employee already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashed, role: role || 'employee' });
    await user.save();
    const out = { id: user._id, name: user.name, email: user.email, role: user.role };
    res.json(out);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getEmployees = async (req, res) => {
  try {
    if (global.useMemoryStore) {
      await memoryStore.ensureDemoUser();
      return res.json(memoryStore.listEmployees());
    }

    const employees = await User.find().select('-password');
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
