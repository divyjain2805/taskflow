const express  = require('express');
const router   = express.Router();
const protect  = require('../middleware/authMiddleware');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Sab routes protected hain — ek baar lagao
router.use(protect);

// GET  /tasks        — sab tasks
// POST /tasks        — naya task
router.route('/')
  .get(getAllTasks)
  .post(createTask);

// GET    /tasks/:id  — ek task
// PUT    /tasks/:id  — update
// DELETE /tasks/:id  — delete
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;