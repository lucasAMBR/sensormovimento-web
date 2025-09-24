"use client"

import { createContext, useState, useEffect, useContext, ReactNode, useCallback, useMemo } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

interface AuthContextData extends AuthState {
  loading: boolean;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
}

const LOCAL_STORAGE_TOKEN_KEY = '@MyApp:token';
const LOCAL_STORAGE_USER_KEY = '@MyApp:user';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      const userJSON = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

      if (token && userJSON) {
        return { token, user: JSON.parse(userJSON) };
      }
    }
    return { token: null, user: null };
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = useCallback((loginData: { token: string; user: User }) => {
    const { token, user } = loginData;

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));

    setData({ token, user });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);

    setData({ token: null, user: null });
  }, []);

  const contextValue = useMemo(
    () => ({
      token: data.token,
      user: data.user,
      loading,
      login,
      logout,
    }),
    [data, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};