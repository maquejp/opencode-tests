import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { RoleDefinition } from '../types';
import { LocalStorageService } from '../services/storage';

interface RoleState {
  roles: RoleDefinition[];
  loading: boolean;
  error: string | null;
}

type RoleAction =
  | { type: 'SET_ROLES'; payload: RoleDefinition[] }
  | { type: 'ADD_ROLE'; payload: RoleDefinition }
  | { type: 'UPDATE_ROLE'; payload: RoleDefinition }
  | { type: 'DELETE_ROLE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

const roleReducer = (state: RoleState, action: RoleAction): RoleState => {
  switch (action.type) {
    case 'SET_ROLES':
      return { ...state, roles: action.payload };
    case 'ADD_ROLE':
      return { ...state, roles: [action.payload, ...state.roles] };
    case 'UPDATE_ROLE':
      return {
        ...state,
        roles: state.roles.map(role =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    case 'DELETE_ROLE':
      return {
        ...state,
        roles: state.roles.filter(role => role.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface RoleContextType extends RoleState {
  createRole: (role: Omit<RoleDefinition, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRole: (role: RoleDefinition) => void;
  deleteRole: (roleId: string) => void;
  getRoleById: (roleId: string) => RoleDefinition | undefined;
  refreshRoles: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(roleReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const roles = LocalStorageService.getRoles();
      dispatch({ type: 'SET_ROLES', payload: roles });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load roles' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createRole = (roleData: Omit<RoleDefinition, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRole: RoleDefinition = {
      ...roleData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const roles = [...state.roles, newRole];
    LocalStorageService.saveRoles(roles);
    dispatch({ type: 'ADD_ROLE', payload: newRole });
  };

  const updateRole = (role: RoleDefinition) => {
    const updatedRole = { ...role, updatedAt: new Date() };
    const roles = state.roles.map(r => r.id === role.id ? updatedRole : r);
    LocalStorageService.saveRoles(roles);
    dispatch({ type: 'UPDATE_ROLE', payload: updatedRole });
  };

  const deleteRole = (roleId: string) => {
    const roles = state.roles.filter(r => r.id !== roleId);
    LocalStorageService.saveRoles(roles);
    dispatch({ type: 'DELETE_ROLE', payload: roleId });
  };

  const getRoleById = (roleId: string): RoleDefinition | undefined => {
    return state.roles.find(role => role.id === roleId);
  };

  const refreshRoles = () => {
    const roles = LocalStorageService.getRoles();
    dispatch({ type: 'SET_ROLES', payload: roles });
  };

  const value: RoleContextType = {
    ...state,
    createRole,
    updateRole,
    deleteRole,
    getRoleById,
    refreshRoles,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};