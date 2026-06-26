const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    let user;

    // 1. Check for API Key in header
    const apiKey = req.headers['x-api-key'];
    if (apiKey) {
      user = await User.findOne({ apiKey });
      if (!user) {
        return res.status(401).json({ error: 'Invalid API Key' });
      }
    } 
    // 2. Check for JWT token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
    } 
    // No auth provided
    else {
      return res.status(401).json({ error: 'Not authorized, no token or API key provided' });
    }

    // Attach user id to the request object
    req.user = { id: user._id };
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ error: 'Not authorized, invalid token' });
  }
};

module.exports = authMiddleware;
