import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // Validate password match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here
      const user: User = {
        id: '1',
        email: data.email,
        name: data.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}