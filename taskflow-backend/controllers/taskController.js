const Task = require('../models/Task');

// ─────────────────────────────────────────────
// @route   GET /tasks
// @desc    Apne sab tasks lao (filter support)
// @access  Protected
// ─────────────────────────────────────────────
const getAllTasks = async (req, res) => {
  try {
    const filter = { user: req.user._id }; // sirf apne tasks

    // ?priority=high filter
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    // ?status filter
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task
      .find(filter)
      .sort({ createdAt: -1 }); // nayi task pehle

    res.json({ success: true, count: tasks.length, data: tasks });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ─────────────────────────────────────────────
// @route   GET /tasks/:id
// @desc    Ek task ki detail
// @access  Protected
// ─────────────────────────────────────────────
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id:  req.params.id,
      user: req.user._id, // sirf apna task
    });

    if (!task) {
      return res.status(404).json({ success: false, msg: 'Task nahi mila' });
    }

    res.json({ success: true, data: task });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ─────────────────────────────────────────────
// @route   POST /tasks
// @desc    Naya task banao
// @access  Protected
// ─────────────────────────────────────────────
const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, msg: 'Title zaroori hai' });
    }
   
    const task = await Task.create({
      title,
      description,
      status: 'pending',
      priority: priority || 'Medium',
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: task });

  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// ─────────────────────────────────────────────
// @route   PUT /tasks/:id
// @desc    Task update karo
// @access  Protected
// ─────────────────────────────────────────────
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // sirf apna task
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, msg: 'Task nahi mila' });
    }

    res.json({ success: true, data: task });

  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// ─────────────────────────────────────────────
// @route   DELETE /tasks/:id
// @desc    Task delete karo
// @access  Protected
// ─────────────────────────────────────────────
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id:  req.params.id,
      user: req.user._id, // sirf apna task delete kar sakte ho
    });

    if (!task) {
      return res.status(404).json({ success: false, msg: 'Task nahi mila' });
    }

    res.json({ success: true, msg: 'Task delete ho gaya!' });

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };