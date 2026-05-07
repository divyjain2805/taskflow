const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// Helper — JWT token banao
const generateToken = (userId) =>
  jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

// ─────────────────────────────────────────────
// @route   POST /auth/register
// @desc    Naya user register karo
// @access  Public
// ─────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: 'Sab fields bharein — name, email, password',
      });
    }

    // Email already registered?
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        msg: 'Email pehle se registered hai!',
      });
    }

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // User save karo
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Token banao aur bhejo
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ─────────────────────────────────────────────
// @route   POST /auth/login
// @desc    User login karo
// @access  Public
// ─────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: 'Email aur password daalo',
      });
    }

    // User dhundho — password bhi select karo
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: 'Email ya password galat hai',
      });
    }

    // Password compare karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: 'Email ya password galat hai',
      });
    }

    // Token do
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ─────────────────────────────────────────────
// @route   GET /auth/me
// @desc    Apna profile dekho
// @access  Protected
// ─────────────────────────────────────────────
const getMe = (req, res) => {
  res.json({
    success: true,
    user: {
      id:        req.user._id,
      name:      req.user.name,
      email:     req.user.email,
      createdAt: req.user.createdAt,
    },
  });
};

module.exports = { register, login, getMe };