import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Kein Token, Zugang verweigert' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;  // Benutzer ID aus dem Token speichern
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token ist ungültig' });
  }
};
