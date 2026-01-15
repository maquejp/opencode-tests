import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, Comment, Notification, FilterState } from '../types';
import { LocalStorageService } from '../services/storage';
import { useUser } from './UserContext';

interface TaskState {
  tasks: Task[];
  comments: Comment[];
  notifications: Notification[];
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialFilters: FilterState = {
  status: 'all',
  priority: 'all',
  assignedTo: 'all',
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const initialState: TaskState = {
  tasks: [],
  comments: [],
  notifications: [],
  filters: initialFilters,
  loading: false,
  error: null,
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        ),
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface TaskContextType extends TaskState {
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  getCommentsForTask: (taskId: string) => Comment[];
  markNotificationRead: (notificationId: string) => void;
  getUnreadNotifications: () => Notification[];
  getFilteredTasks: () => Task[];
  setFilters: (filters: Partial<FilterState>) => void;
  refreshTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { currentUser, users } = useUser();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const tasks = LocalStorageService.getTasks();
      const comments = LocalStorageService.getComments();
      const notifications = LocalStorageService.getNotifications().filter(
        n => currentUser && n.userId === currentUser.id
      );
      
      dispatch({ type: 'SET_TASKS', payload: tasks });
      dispatch({ type: 'SET_COMMENTS', payload: comments });
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load task data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [currentUser]);

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const tasks = [...state.tasks, newTask];
    LocalStorageService.saveTasks(tasks);
    dispatch({ type: 'ADD_TASK', payload: newTask });

    taskData.assignedTo.forEach(userId => {
      const notification: Notification = {
        id: Date.now().toString() + userId,
        userId,
        type: 'task_assigned',
        message: `You have been assigned to "${taskData.title}"`,
        read: false,
        createdAt: new Date(),
        data: { taskId: newTask.id },
      };
      addNotification(notification);
    });
  };

  const updateTask = (task: Task) => {
    const updatedTask = { ...task, updatedAt: new Date() };
    const tasks = state.tasks.map(t => t.id === task.id ? updatedTask : t);
    LocalStorageService.saveTasks(tasks);
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });

    if (currentUser && task.assignedTo.includes(currentUser.id)) {
      const notification: Notification = {
        id: Date.now().toString(),
        userId: currentUser.id!,
        type: 'task_updated',
        message: `Task "${task.title}" has been updated`,
        read: false,
        createdAt: new Date(),
        data: { taskId: task.id },
      };
      addNotification(notification);
    }
  };

  const deleteTask = (taskId: string) => {
    const tasks = state.tasks.filter(t => t.id !== taskId);
    const comments = state.comments.filter(c => c.taskId !== taskId);
    
    LocalStorageService.saveTasks(tasks);
    LocalStorageService.saveComments(comments);
    
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const addComment = (commentData: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    const comments = [...state.comments, newComment];
    LocalStorageService.saveComments(comments);
    dispatch({ type: 'ADD_COMMENT', payload: newComment });

    const task = state.tasks.find(t => t.id === commentData.taskId);
    if (task && currentUser) {
      task.assignedTo.forEach(userId => {
        if (userId !== currentUser.id) {
          const notification: Notification = {
            id: Date.now().toString() + userId,
            userId,
            type: 'comment_added',
            message: `New comment on "${task.title}"`,
            read: false,
            createdAt: new Date(),
            data: { taskId: task.id, commentId: newComment.id },
          };
          addNotification(notification);
        }
      });
    }
  };

  const addNotification = (notification: Notification) => {
    const notifications = [...LocalStorageService.getNotifications(), notification];
    LocalStorageService.saveNotifications(notifications);
    
    if (currentUser && notification.userId === currentUser.id) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    }
  };

  const getCommentsForTask = (taskId: string): Comment[] => {
    return state.comments.filter(comment => comment.taskId === taskId);
  };

  const markNotificationRead = (notificationId: string) => {
    const notifications = state.notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    LocalStorageService.saveNotifications(notifications);
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
  };

  const getUnreadNotifications = (): Notification[] => {
    return state.notifications.filter(notif => !notif.read);
  };

  const getFilteredTasks = (): Task[] => {
    let filtered = [...state.tasks];

    if (state.filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === state.filters.status);
    }

    if (state.filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === state.filters.priority);
    }

    if (state.filters.assignedTo !== 'all') {
      filtered = filtered.filter(task => task.assignedTo.includes(state.filters.assignedTo));
    }

    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[state.filters.sortBy];
      const bValue = b[state.filters.sortBy];
      
      if (state.filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const setFilters = (filters: Partial<FilterState>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const refreshTasks = () => {
    const tasks = LocalStorageService.getTasks();
    dispatch({ type: 'SET_TASKS', payload: tasks });
  };

  const value: TaskContextType = {
    ...state,
    createTask,
    updateTask,
    deleteTask,
    addComment,
    getCommentsForTask,
    markNotificationRead,
    getUnreadNotifications,
    getFilteredTasks,
    setFilters,
    refreshTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};