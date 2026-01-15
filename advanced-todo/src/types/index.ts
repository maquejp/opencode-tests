export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'task_assigned' | 'task_completed' | 'task_updated' | 'comment_added';
  message: string;
  read: boolean;
  createdAt: Date;
  data?: any;
}

export interface FilterState {
  status: Task['status'] | 'all';
  priority: Task['priority'] | 'all';
  assignedTo: string | 'all';
  search: string;
  sortBy: 'createdAt' | 'dueDate' | 'priority';
  sortOrder: 'asc' | 'desc';
}