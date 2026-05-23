const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const memoryStore = require('../config/memoryStore');

const jwtSecret = () => process.env.JWT_SECRET || 'local-dev-secret';

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (global.useMemoryStore) {
      await memoryStore.ensureDemoUser();
      if (memoryStore.findUserByEmail(email)) return res.status(400).json({ msg: 'User already exists' });
      const user = await memoryStore.createUser({ name, email, password, role });
      const token = jwt.sign({ id: user._id }, jwtSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
      return res.json({ token, user: memoryStore.toPublicUser(user) });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashed, role });
    await user.save();

    const payload = { id: user._id };
    const token = jwt.sign(payload, jwtSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (global.useMemoryStore) {
      await memoryStore.ensureDemoUser();
      const user = memoryStore.findUserByEmail(email);
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id }, jwtSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
      return res.json({ token, user: memoryStore.toPublicUser(user) });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { id: user._id };
    const token = jwt.sign(payload, jwtSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.me = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
