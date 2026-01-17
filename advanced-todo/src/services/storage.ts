import { User, Task, Comment, Notification, Project, RoleDefinition } from '../types';
import usersData from '../data/users.json';
import projectsData from '../data/projects.json';
import tasksData from '../data/tasks.json';
import rolesData from '../data/roles.json';

const STORAGE_KEYS = {
  USERS: 'advanced-todo-users',
  TASKS: 'advanced-todo-tasks',
  COMMENTS: 'advanced-todo-comments',
  NOTIFICATIONS: 'advanced-todo-notifications',
  CURRENT_USER: 'advanced-todo-current-user',
  PROJECTS: 'advanced-todo-projects',
  ROLES: 'advanced-todo-roles',
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

  static getProjects(): Project[] {
    const projects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return projects ? JSON.parse(projects) : this.getDefaultProjects();
  }

  static saveProjects(projects: Project[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }

  static getRoles(): RoleDefinition[] {
    const roles = localStorage.getItem(STORAGE_KEYS.ROLES);
    return roles ? JSON.parse(roles) : this.getDefaultRoles();
  }

  static saveRoles(roles: RoleDefinition[]): void {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
  }

  private static getDefaultUsers(): User[] {
    return usersData.map(user => ({
      ...user,
      role: user.role as 'admin' | 'user',
      createdAt: new Date(user.createdAt)
    }));
  }

  private static getDefaultProjects(): Project[] {
    return projectsData.map(project => ({
      ...project,
      status: project.status as 'active' | 'completed' | 'archived',
      createdAt: new Date(project.createdAt),
      updatedAt: new Date(project.updatedAt),
      dueDate: new Date(project.dueDate),
      roleAssignments: project.roleAssignments.map(assignment => ({
        ...assignment,
        assignedAt: new Date(assignment.assignedAt)
      }))
    }));
  }

  private static getDefaultTasks(): Task[] {
    return tasksData.map(task => ({
      ...task,
      status: task.status as 'completed' | 'in-progress' | 'todo' | 'cancelled',
      priority: task.priority as 'low' | 'medium' | 'high',
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
      dueDate: new Date(task.dueDate)
    }));
  }

  private static getDefaultRoles(): RoleDefinition[] {
    return rolesData.map(role => ({
      ...role,
      createdAt: new Date(role.createdAt),
      updatedAt: new Date(role.updatedAt)
    }));
  }
}