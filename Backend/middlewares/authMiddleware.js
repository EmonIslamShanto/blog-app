import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.headers['token'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};
