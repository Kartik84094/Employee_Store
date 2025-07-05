const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

exports.authMiddleware = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return {};

  try {
    const user = jwt.verify(token, SECRET);
    return { user };
  } catch {
    return {};
  }
};
