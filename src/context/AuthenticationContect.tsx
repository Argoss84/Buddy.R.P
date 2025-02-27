import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import supabase from '../services/SupabaseService';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('token_expires_at');
    if (token && expiresAt) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < parseInt(expiresAt, 10)) {
        setIsAuthenticated(true);
        setAccessToken(token);
        supabase.auth.setSession({
            access_token: token,
            refresh_token: ''
        });
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_expires_at');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    setIsAuthenticated(true);
    const token = data.session?.access_token || null;
    const expiresAt = data.session?.expires_at || null;
    setAccessToken(token);
    if (token) {
      localStorage.setItem('access_token', token);
      if (expiresAt) {
        localStorage.setItem('token_expires_at', expiresAt.toString());
      }
    }
    console.log(data);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setIsAuthenticated(false);
    setAccessToken(null);
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};