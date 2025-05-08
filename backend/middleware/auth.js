// backend/middleware/auth.js
import jwt from 'jsonwebtoken';


export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Unauthorized');
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};

export default authenticate;