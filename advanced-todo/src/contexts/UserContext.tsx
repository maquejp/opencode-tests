import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '../types';
import { LocalStorageService } from '../services/storage';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface UserContextType extends UserState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  updateUser: (userData: User) => void;
  deleteUser: (userId: string) => void;
  refreshUsers: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const users = LocalStorageService.getUsers();
      const currentUser = LocalStorageService.getCurrentUser();
      dispatch({ type: 'SET_USERS', payload: users });
      dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load user data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const users = LocalStorageService.getUsers();
      const user = users.find(u => u.email === email);
      
      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        LocalStorageService.saveCurrentUser(user);
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null });
    LocalStorageService.saveCurrentUser(null);
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const users = LocalStorageService.getUsers();
      
      if (users.some(u => u.email === userData.email)) {
        dispatch({ type: 'SET_ERROR', payload: 'User with this email already exists' });
        return false;
      }

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };

      const updatedUsers = [...users, newUser];
      LocalStorageService.saveUsers(updatedUsers);
      dispatch({ type: 'ADD_USER', payload: newUser });
      return true;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateUser = (userData: User) => {
    const users = LocalStorageService.getUsers();
    const updatedUsers = users.map(user => 
      user.id === userData.id ? userData : user
    );
    LocalStorageService.saveUsers(updatedUsers);
    dispatch({ type: 'UPDATE_USER', payload: userData });
    
    if (state.currentUser?.id === userData.id) {
      dispatch({ type: 'SET_CURRENT_USER', payload: userData });
      LocalStorageService.saveCurrentUser(userData);
    }
  };

  const deleteUser = (userId: string) => {
    const users = LocalStorageService.getUsers();
    const updatedUsers = users.filter(user => user.id !== userId);
    LocalStorageService.saveUsers(updatedUsers);
    dispatch({ type: 'DELETE_USER', payload: userId });
    
    if (state.currentUser?.id === userId) {
      logout();
    }
  };

  const refreshUsers = () => {
    const users = LocalStorageService.getUsers();
    dispatch({ type: 'SET_USERS', payload: users });
  };

  const value: UserContextType = {
    ...state,
    login,
    logout,
    register,
    updateUser,
    deleteUser,
    refreshUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};