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
      .then(async ({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", session.user.id)
              .single();
            if (profile?.role) {
              setRole(profile.role);
              localStorage.setItem('userRole', profile.role);
            }
          } catch (e) {
            console.warn("Error fetching role on mount:", e);
          }
        }
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
      const res = supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('userRole');
          setRole(null);
        } else if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", session.user.id)
              .single();
            if (profile?.role) {
              setRole(profile.role);
              localStorage.setItem('userRole', profile.role);
            }
          } catch (e) {
            console.warn("Error fetching role on auth change:", e);
          }
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
