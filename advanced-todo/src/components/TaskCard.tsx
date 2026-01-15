import React from 'react';
import { Task } from '../types';
import { useTask, useUser } from '../contexts';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { deleteTask, updateTask, getCommentsForTask } = useTask();
  const { users, currentUser } = useUser();

  const assignedUsers = users.filter(user => task.assignedTo.includes(user.id));
  const comments = getCommentsForTask(task.id);

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityClass = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask({ ...task, status: newStatus });
  };

  const isAssignedToCurrentUser = currentUser && task.assignedTo.includes(currentUser.id);
  const canEdit = currentUser && (task.createdBy === currentUser.id || currentUser.role === 'admin');

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`task-card ${getPriorityClass(task.priority)} ${isOverdue ? 'bg-red-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
        </div>
        
        {canEdit && (
          <div className="flex gap-1 ml-4">
            <button
              onClick={() => onEdit(task)}
              className="text-gray-400 hover:text-primary-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-danger-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          task.priority === 'high' ? 'bg-red-100 text-red-700' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {task.priority}
        </span>
        {isOverdue && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            Overdue
          </span>
        )}
      </div>

      {task.dueDate && (
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {assignedUsers.length > 0 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Assigned to:</span>
            <div className="flex -space-x-2">
              {assignedUsers.map(user => (
                <img
                  key={user.id}
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  title={user.name}
                />
              ))}
            </div>
          </div>
          
          {comments.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {comments.length}
            </div>
          )}
        </div>
      )}

      {isAssignedToCurrentUser && (
        <div className="flex gap-2">
          {task.status === 'todo' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="flex-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              Start Working
            </button>
          )}
          {task.status === 'in-progress' && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="flex-1 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
            >
              Mark Complete
            </button>
          )}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
        Created {new Date(task.createdAt).toLocaleDateString()} by {users.find(u => u.id === task.createdBy)?.name}
      </div>
    </div>
  );
};

export default TaskCard;