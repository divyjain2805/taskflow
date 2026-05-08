const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// ── DB Connect ───────────────────────────────
connectDB();

// ── Middlewares ──────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ── Routes ───────────────────────────────────
app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));

// Health check
app.get('/', (req, res) => {
  res.json({ msg: 'TaskFlow API chal rahi hai!', status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, msg: 'Route nahi mili' });
});

// ── Server Start ─────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
});