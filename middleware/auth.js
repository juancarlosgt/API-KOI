// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Acceso denegado. No tienes permisos de administrador.' });
  next();
};

module.exports = { authenticate, authorizeAdmin };
