// src/context/AuthenticationContect.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { getUserWithAccessRights } from '../services/UserServices';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface AuthContextType {
  session: any;
  userEmail: string | null;
  loading: boolean;
  accessRights: any;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const supabaseClient = supabase;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessRights, setAccessRights] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUserEmail(session?.user?.email || null);
      setLoading(false);

      if (session?.user) {
        const userRights = getUserWithAccessRights(session.user.id);
        setAccessRights(userRights);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUserEmail(session?.user?.email || null);

      if (session?.user) {
        const userRights = getUserWithAccessRights(session.user.id);
        setAccessRights(userRights);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setSession(null);
    setUserEmail(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Auth supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        style: {
          input: { background: 'grey', color: 'white' },
          button: { background: 'grey', color: 'white'}
        },
      }} />;
  }

  return (
    <AuthContext.Provider value={{ session, userEmail, loading, accessRights, logout }}>
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