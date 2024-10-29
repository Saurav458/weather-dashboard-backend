const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.adminAuth = (req, res, next) => {
  this.auth(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin resources only' });
    next();
  });
};
