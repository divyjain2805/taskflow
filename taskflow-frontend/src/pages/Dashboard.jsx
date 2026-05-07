import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Plus, Trash2, CheckCircle, Circle, X, Edit2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [user, navigate]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      if (res.data.success) {
        setTasks(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError('');
    if (!newTask.title) return setError('Title is required');

    try {
      const res = await api.post('/tasks', newTask);
      if (res.data.success) {
        setTasks([...tasks, res.data.data]);
        setNewTask({ title: '', description: '', priority: 'Medium' });
        setIsModalOpen(false);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setError('');
    if (!currentTask?.title) return setError('Title is required');

    try {
      const res = await api.put(`/tasks/${currentTask._id}`, {
        title: currentTask.title,
        description: currentTask.description,
        priority: currentTask.priority || 'Medium'
      });
      if (res.data.success) {
        setTasks(tasks.map(t => t._id === currentTask._id ? res.data.data : t));
        setIsEditModalOpen(false);
        setCurrentTask(null);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update task');
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      const res = await api.put(`/tasks/${taskId}`, { status: updatedStatus });
      if (res.data.success) {
        setTasks(tasks.map(t => t._id === taskId ? res.data.data : t));
      }
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <main className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tasks</h1>
          <p className="page-subtitle">Manage and track your project progress</p>
          
          <div className="tabs">
            <button 
              className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={`tab-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`tab-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <div className="task-grid">
        {filteredTasks.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              No tasks found. Click "Create Task" to get started.
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} className="card task-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className={`task-badge ${task.status === 'completed' ? 'badge-completed' : 'badge-pending'}`}>
                  {task.status}
                </span>
                <span className={`priority-badge priority-${task.priority || 'Medium'}`}>
                  {task.priority || 'Medium'}
                </span>
              </div>
              <h3 className="task-title" style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', opacity: task.status === 'completed' ? 0.6 : 1 }}>
                {task.title}
              </h3>
              <p className="task-description">
                {task.description || 'No description provided.'}
              </p>
              
              <div className="task-footer">
                <button 
                  className="btn btn-ghost" 
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: task.status === 'completed' ? 'var(--success)' : 'var(--text-muted)' }}
                  onClick={() => handleToggleComplete(task._id, task.status)}
                >
                  {task.status === 'completed' ? <CheckCircle size={16} /> : <Circle size={16} />}
                  {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                </button>
                
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button className="icon-btn" onClick={() => { setCurrentTask(task); setIsEditModalOpen(true); }}>
                    <Edit2 size={16} />
                  </button>
                  <button className="icon-btn" onClick={() => handleDeleteTask(task._id)} style={{ color: 'var(--danger)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem' }}>New Task</h2>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  className="form-input"
                  type="text" 
                  placeholder="What needs to be done?"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input"
                  placeholder="Add more details..."
                  rows={4}
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                  style={{ resize: 'none' }}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select 
                  className="form-input" 
                  value={newTask.priority} 
                  onChange={e => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem' }}>Edit Task</h2>
              <button className="icon-btn" onClick={() => setIsEditModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleUpdateTask}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  className="form-input"
                  type="text" 
                  value={currentTask?.title || ''}
                  onChange={e => setCurrentTask({...currentTask, title: e.target.value})}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input"
                  rows={4}
                  value={currentTask?.description || ''}
                  onChange={e => setCurrentTask({...currentTask, description: e.target.value})}
                  style={{ resize: 'none' }}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select 
                  className="form-input" 
                  value={currentTask?.priority || 'Medium'} 
                  onChange={e => setCurrentTask({...currentTask, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
