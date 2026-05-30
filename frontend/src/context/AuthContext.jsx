import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      })
      .catch(err => {
        console.warn("Failed to retrieve Supabase session, using fallback:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    // Listen for changes on auth state (logged in, signed out, etc.)
    let subscription = null;
    try {
      const res = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('userRole');
          setRole(null);
        }
      });
      subscription = res?.data?.subscription || res?.subscription;
    } catch (err) {
      console.warn("Failed to subscribe to auth state changes, using fallback:", err);
    }

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, setRole, supabase }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
