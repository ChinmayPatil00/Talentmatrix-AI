const jwt = require('jsonwebtoken');
const path = require('path');

// 💡 Real-world professional solution: Resolve the path dynamically from the absolute system root
const rootDir = process.cwd(); 
const User = require(path.join(rootDir, 'models', 'User'));

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id);
      return next();
    } catch (error) {
      console.error('❌ Security Interception Exception:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token validation failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, access token missing' });
  }
};

module.exports = { protect };