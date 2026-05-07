const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    // Step 1 — Header se token nikalo
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        msg: 'Access denied. Pehle login karo!',
      });
    }

    // "Bearer eyJhbG..." → sirf token part
    const token = authHeader.split(' ')[1];

    // Step 2 — Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Agar token fake/expired → automatically error throw hoga

    // Step 3 — User DB se fetch karo, req mein attach karo
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: 'User nahi mila — dobara login karo',
      });
    }

    next(); // ✅ Sab theek — aage jao

  } catch (err) {
    res.status(401).json({
      success: false,
      msg: 'Token invalid ya expire ho gaya!',
    });
  }
};

module.exports = protect;