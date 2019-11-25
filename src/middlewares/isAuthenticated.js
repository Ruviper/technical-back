const { verifyToken } = require('../utils/auth');

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    await verifyToken(token)
    next()
  } catch {
    const error = new Error('Invalid token');
    error.status = 401;
    next(error);
  }
}