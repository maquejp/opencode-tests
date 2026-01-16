import { User, Task, Comment, Notification, Project, RoleDefinition } from '../types';

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

  private static getDefaultProjects(): Project[] {
    const now = new Date();
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete overhaul of company website with modern design and improved UX',
        status: 'active',
        createdBy: '1',
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        assignedTo: ['1', '2', '4'],
        roleAssignments: [
          { userId: '1', role: 'admin', assignedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), assignedBy: '1' },
          { userId: '2', role: 'pm', assignedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), assignedBy: '1' },
          { userId: '4', role: 'designer', assignedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), assignedBy: '1' },
        ],
        dueDate: nextMonth,
        tags: ['design', 'frontend', 'marketing'],
        color: '#3B82F6',
      },
      {
        id: '2',
        name: 'Mobile App Development',
        description: 'Create cross-platform mobile application for customer engagement',
        status: 'active',
        createdBy: '1',
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        assignedTo: ['2', '3'],
        roleAssignments: [
          { userId: '2', role: 'pm', assignedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), assignedBy: '1' },
          { userId: '3', role: 'developer', assignedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), assignedBy: '1' },
        ],
        dueDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
        tags: ['mobile', 'development'],
        color: '#10B981',
      },
      {
        id: '3',
        name: 'API Integration',
        description: 'Integrate third-party payment and shipping APIs',
        status: 'active',
        createdBy: '2',
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        assignedTo: ['3'],
        roleAssignments: [
          { userId: '3', role: 'developer', assignedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), assignedBy: '2' },
        ],
        dueDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
        tags: ['backend', 'integration'],
        color: '#F59E0B',
      },
    ];
  }

  private static getDefaultTasks(): Task[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Project 1: Website Redesign Tasks
    return [
      // Website Redesign Project Tasks
      {
        id: '1',
        title: 'Initial Planning & Requirements Gathering',
        description: 'Meet with stakeholders to gather requirements and create project plan',
        status: 'completed',
        priority: 'high',
        assignedTo: ['1', '2'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        tags: ['planning', 'requirements'],
        projectId: '1',
      },
      {
        id: '2',
        title: 'UI/UX Design & Mockups',
        description: 'Create wireframes, user flows, and high-fidelity mockups',
        status: 'in-progress',
        priority: 'high',
        assignedTo: ['2', '4'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        tags: ['design', 'ui/ux', 'mockups'],
        projectId: '1',
      },
      {
        id: '3',
        title: 'Frontend Development - Homepage',
        description: 'Build responsive homepage with modern design patterns',
        status: 'todo',
        priority: 'high',
        assignedTo: ['1'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
        tags: ['frontend', 'react', 'responsive'],
        projectId: '1',
      },
      {
        id: '4',
        title: 'Frontend Development - Internal Pages',
        description: 'Develop about, contact, and services pages',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['1', '2'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000),
        tags: ['frontend', 'pages'],
        projectId: '1',
      },
      {
        id: '5',
        title: 'Content Management Integration',
        description: 'Integrate CMS for easy content updates',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['4'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 22 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000),
        tags: ['cms', 'integration'],
        projectId: '1',
      },
      {
        id: '15',
        title: 'Responsive Design Implementation',
        description: 'Ensure all pages work perfectly on mobile, tablet, and desktop',
        status: 'completed',
        priority: 'high',
        assignedTo: ['1', '2'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 11 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        tags: ['responsive', 'css', 'testing'],
        projectId: '1',
      },
      {
        id: '16',
        title: 'SEO Implementation',
        description: 'Implement meta tags, structured data, and SEO optimization',
        status: 'in-progress',
        priority: 'high',
        assignedTo: ['1'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        tags: ['seo', 'meta-tags', 'optimization'],
        projectId: '1',
      },
      {
        id: '17',
        title: 'Performance Optimization',
        description: 'Optimize images, minify assets, and implement lazy loading',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['2'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 11 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 13 * 24 * 60 * 60 * 1000),
        tags: ['performance', 'optimization', 'images'],
        projectId: '1',
      },
      {
        id: '18',
        title: 'Accessibility Testing',
        description: 'Ensure WCAG 2.1 AA compliance and screen reader compatibility',
        status: 'todo',
        priority: 'high',
        assignedTo: ['1', '4'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
        tags: ['accessibility', 'wcag', 'testing'],
        projectId: '1',
      },
      {
        id: '19',
        title: 'Cross-browser Testing',
        description: 'Test and fix issues on Chrome, Firefox, Safari, and Edge',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['2', '3'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000),
        tags: ['testing', 'browsers', 'compatibility'],
        projectId: '1',
      },
      {
        id: '20',
        title: 'Analytics Integration',
        description: 'Integrate Google Analytics and custom event tracking',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['1'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 23 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 26 * 24 * 60 * 60 * 1000),
        tags: ['analytics', 'tracking', 'metrics'],
        projectId: '1',
      },
      {
        id: '21',
        title: 'Security Audit & Hardening',
        description: 'Conduct security audit and implement security headers',
        status: 'todo',
        priority: 'high',
        assignedTo: ['1', '3'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 24 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
        tags: ['security', 'audit', 'headers'],
        projectId: '1',
      },
      {
        id: '22',
        title: 'Deployment Pipeline Setup',
        description: 'Configure CI/CD pipeline with automated testing and deployment',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['2', '3'],
        createdBy: '1',
        createdAt: new Date(today.getTime()),
        updatedAt: new Date(today.getTime()),
        startDate: new Date(today.getTime() + 26 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 35 * 24 * 60 * 60 * 1000),
        tags: ['deployment', 'ci/cd', 'automation'],
        projectId: '1',
      },

      // Mobile App Development Project Tasks
      {
        id: '6',
        title: 'Mobile App Architecture Design',
        description: 'Design app architecture and technology stack',
        status: 'completed',
        priority: 'high',
        assignedTo: ['3'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
        tags: ['architecture', 'planning'],
        projectId: '2',
      },
      {
        id: '7',
        title: 'User Authentication System',
        description: 'Implement login, registration, and password reset',
        status: 'in-progress',
        priority: 'high',
        assignedTo: ['3'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        tags: ['authentication', 'security', 'mobile'],
        projectId: '2',
      },
      {
        id: '8',
        title: 'Core Features Implementation',
        description: 'Build main app features and user flows',
        status: 'todo',
        priority: 'high',
        assignedTo: ['2', '3'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000),
        tags: ['features', 'development'],
        projectId: '2',
      },
      {
        id: '9',
        title: 'Push Notifications Setup',
        description: 'Configure push notifications for user engagement',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['2'],
        createdBy: '1',
        createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000),
        tags: ['notifications', 'engagement'],
        projectId: '2',
      },

      // API Integration Project Tasks
      {
        id: '10',
        title: 'Payment Gateway Research',
        description: 'Evaluate and select payment processing solutions',
        status: 'completed',
        priority: 'high',
        assignedTo: ['2', '3'],
        createdBy: '2',
        createdAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
        tags: ['research', 'payments'],
        projectId: '3',
      },
      {
        id: '11',
        title: 'Stripe API Integration',
        description: 'Integrate Stripe for payment processing',
        status: 'in-progress',
        priority: 'high',
        assignedTo: ['3'],
        createdBy: '2',
        createdAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        tags: ['stripe', 'api', 'payments'],
        projectId: '3',
      },
      {
        id: '12',
        title: 'Shipping API Integration',
        description: 'Integrate UPS and FedEx shipping APIs',
        status: 'todo',
        priority: 'high',
        assignedTo: ['2'],
        createdBy: '2',
        createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000),
        tags: ['shipping', 'api', 'logistics'],
        projectId: '3',
      },
      {
        id: '13',
        title: 'Payment Testing & Validation',
        description: 'Test payment flows and ensure PCI compliance',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['3'],
        createdBy: '2',
        createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
        startDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
        tags: ['testing', 'security', 'validation'],
        projectId: '3',
      },
      {
        id: '14',
        title: 'Error Handling & Monitoring',
        description: 'Implement error handling and monitoring for API calls',
        status: 'todo',
        priority: 'medium',
        assignedTo: ['2'],
        createdBy: '2',
        createdAt: new Date(today.getTime()),
        updatedAt: new Date(today.getTime()),
        startDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000),
        dueDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000),
        tags: ['monitoring', 'error-handling'],
        projectId: '3',
      },
    ];
  }

  private static getDefaultRoles(): RoleDefinition[] {
    return [
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Full access to all projects and system settings',
        color: '#EF4444',
        permissions: ['read', 'write', 'delete', 'manage_users', 'manage_projects'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'pm',
        name: 'Project Manager',
        description: 'Can manage projects, assign tasks, and view reports',
        color: '#3B82F6',
        permissions: ['read', 'write', 'manage_projects', 'assign_tasks'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'developer',
        name: 'Developer',
        description: 'Can work on assigned tasks and update project progress',
        color: '#10B981',
        permissions: ['read', 'write', 'update_tasks'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'designer',
        name: 'Designer',
        description: 'Can work on design tasks and upload assets',
        color: '#EC4899',
        permissions: ['read', 'write', 'update_tasks', 'upload_assets'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'qa',
        name: 'QA Engineer',
        description: 'Can test tasks and report bugs',
        color: '#6B7280',
        permissions: ['read', 'write', 'update_tasks', 'report_bugs'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'analyst',
        name: 'Business Analyst',
        description: 'Can create requirements and analyze project data',
        color: '#8B5CF6',
        permissions: ['read', 'write', 'create_requirements', 'view_reports'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'devops',
        name: 'DevOps Engineer',
        description: 'Can manage deployment and infrastructure',
        color: '#F97316',
        permissions: ['read', 'write', 'deploy', 'manage_infrastructure'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
    ];
  }
}