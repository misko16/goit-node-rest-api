const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel'); // Припустимо, ваша модель користувача знаходиться тут

const authMiddleware = async (req, res, next) => {
  try {

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authorizationHeader.replace('Bearer ', '');


    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await User.findById(decoded.id);

    if (!user || token !== user.token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;

    next(); 
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authMiddleware;
