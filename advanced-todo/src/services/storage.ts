import { User, Task, Comment, Notification } from '../types';

const STORAGE_KEYS = {
  USERS: 'advanced-todo-users',
  TASKS: 'advanced-todo-tasks',
  COMMENTS: 'advanced-todo-comments',
  NOTIFICATIONS: 'advanced-todo-notifications',
  CURRENT_USER: 'advanced-todo-current-user',
} as const;

export class LocalStorageService {
  static getUsers(): User[] {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : this.getDefaultUsers();
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  static getTasks(): Task[] {
    const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasks ? JSON.parse(tasks) : this.getDefaultTasks();
  }

  static saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  static getComments(): Comment[] {
    const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    return comments ? JSON.parse(comments) : [];
  }

  static saveComments(comments: Comment[]): void {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  }

  static getNotifications(): Notification[] {
    const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return notifications ? JSON.parse(notifications) : [];
  }

  static saveNotifications(notifications: Notification[]): void {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  static saveCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  private static getDefaultUsers(): User[] {
    return [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        role: 'admin',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        role: 'user',
        createdAt: new Date('2024-01-02'),
      },
      {
        id: '3',
        name: 'Mike Williams',
        email: 'mike@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
        role: 'user',
        createdAt: new Date('2024-01-03'),
      },
      {
        id: '4',
        name: 'Emma Davis',
        email: 'emma@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
        role: 'user',
        createdAt: new Date('2024-01-04'),
      },
    ];
  }

  private static getDefaultTasks(): Task[] {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return [
      {
        id: '1',
        title: 'Setup project repository',
        description: 'Initialize Git repository and create project structure',
        status: 'completed',
        priority: 'high',
        assignedTo: ['1', '2'],
        createdBy: '1',
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        tags: ['setup', 'development'],
      },
      {
        id: '2',
        title: 'Design user interface mockups',
        description: 'Create wireframes and high-fidelity mockups for the main application screens',
        status: 'in-progress',
        priority: 'medium',
        assignedTo: ['2', '4'],
        createdBy: '1',
        createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
        dueDate: nextWeek,
        tags: ['design', 'ui/ux'],
      },
      {
        id: '3',
        title: 'Implement authentication system',
        description: 'Add user login, registration, and session management',
        status: 'todo',
        priority: 'high',
        assignedTo: ['3'],
        createdBy: '1',
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        tags: ['backend', 'security'],
      },
      {
        id: '4',
        title: 'Write API documentation',
        description: 'Document all API endpoints with examples and usage guidelines',
        status: 'todo',
        priority: 'low',
        assignedTo: ['1', '4'],
        createdBy: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
        tags: ['documentation'],
      },
    ];
  }
}