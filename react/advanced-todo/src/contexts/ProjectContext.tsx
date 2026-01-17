import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Project } from '../types';
import { LocalStorageService } from '../services/storage';
import { useUser } from './UserContext';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

type ProjectAction =
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface ProjectContextType extends ProjectState {
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  getAccessibleProjects: () => Project[];
  refreshProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const { currentUser } = useUser();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const projects = LocalStorageService.getProjects();
      dispatch({ type: 'SET_PROJECTS', payload: projects });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load project data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [currentUser]);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const projects = [...state.projects, newProject];
    LocalStorageService.saveProjects(projects);
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (project: Project) => {
    const updatedProject = { ...project, updatedAt: new Date() };
    const projects = state.projects.map(p => p.id === project.id ? updatedProject : p);
    LocalStorageService.saveProjects(projects);
    dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });
  };

  const deleteProject = (projectId: string) => {
    const projects = state.projects.filter(p => p.id !== projectId);
    LocalStorageService.saveProjects(projects);
    dispatch({ type: 'DELETE_PROJECT', payload: projectId });
  };

  const getAccessibleProjects = (): Project[] => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'admin') {
      return state.projects;
    }
    
    return state.projects.filter(project => 
      project.assignedTo.includes(currentUser.id) || project.createdBy === currentUser.id
    );
  };

  const refreshProjects = () => {
    const projects = LocalStorageService.getProjects();
    dispatch({ type: 'SET_PROJECTS', payload: projects });
  };

  const value: ProjectContextType = {
    ...state,
    createProject,
    updateProject,
    deleteProject,
    getAccessibleProjects,
    refreshProjects,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};