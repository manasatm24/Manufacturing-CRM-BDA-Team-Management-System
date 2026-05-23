const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const memoryStore = require('../config/memoryStore');

dotenv.config();

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.query.token;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'local-dev-secret');
    if (global.useMemoryStore) {
      await memoryStore.ensureDemoUser();
      const user = memoryStore.findUserById(decoded.id);
      if (!user) return res.status(401).json({ msg: 'Token is not valid' });
      req.user = memoryStore.toPublicUser(user);
      return next();
    }

    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
