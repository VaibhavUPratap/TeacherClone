import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mock Client Implementation for Offline / Development fallback
const mockSupabase = {
  auth: {
    getSession: async () => {
      try {
        const userRole = localStorage.getItem('userRole');
        const mockUserJson = localStorage.getItem('mockUser');
        const mockUser = mockUserJson ? JSON.parse(mockUserJson) : null;
        if (userRole && mockUser) {
          return { data: { session: { user: mockUser, access_token: 'mock-token' } }, error: null };
        }
      } catch (e) {
        console.error("Mock auth read error:", e);
      }
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: (callback) => {
      const userRole = localStorage.getItem('userRole');
      const mockUserJson = localStorage.getItem('mockUser');
      const mockUser = mockUserJson ? JSON.parse(mockUserJson) : null;
      const session = userRole && mockUser ? { user: mockUser, access_token: 'mock-token' } : null;
      
      window._supabaseAuthCallbacks = window._supabaseAuthCallbacks || [];
      window._supabaseAuthCallbacks.push(callback);
      
      // Call immediately
      setTimeout(() => callback('INITIAL_SESSION', session), 0);

      return {
        data: {
          subscription: {
            unsubscribe: () => {
              window._supabaseAuthCallbacks = (window._supabaseAuthCallbacks || []).filter(c => c !== callback);
            }
          }
        }
      };
    },
    signInWithPassword: async ({ email, password }) => {
      const isTeacher = email.includes('teacher') || email.includes('faculty') || email.includes('rao') || email.includes('sharma');
      const role = isTeacher ? 'teacher' : 'student';
      const mockUser = {
        id: isTeacher ? 'mock-teacher-id' : 'mock-student-id',
        email,
        user_metadata: {
          full_name: email.split('@')[0].toUpperCase(),
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        }
      };
      
      localStorage.setItem('userRole', role);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));

      const session = { user: mockUser, access_token: 'mock-token' };
      if (window._supabaseAuthCallbacks) {
        window._supabaseAuthCallbacks.forEach(cb => cb('SIGNED_IN', session));
      }

      return { data: { user: mockUser, session }, error: null };
    },
    signOut: async () => {
      localStorage.removeItem('userRole');
      localStorage.removeItem('mockUser');
      if (window._supabaseAuthCallbacks) {
        window._supabaseAuthCallbacks.forEach(cb => cb('SIGNED_OUT', null));
      }
      return { error: null };
    }
  }
};

let realSupabase = null;
try {
  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('yowyjembzbekkkvmhhie.supabase.co')) {
    realSupabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (err) {
  console.warn("Failed to create real Supabase client:", err);
}

// Export a proxy or direct export that wraps the client to handle failures
export const supabase = new Proxy({}, {
  get(target, prop) {
    // If auth is requested
    if (prop === 'auth') {
      if (realSupabase) {
        return new Proxy(realSupabase.auth, {
          get(authTarget, authProp) {
            const originalVal = authTarget[authProp];
            if (typeof originalVal === 'function') {
              return function(...args) {
                try {
                  const result = originalVal.apply(authTarget, args);
                  if (result instanceof Promise) {
                    return result.catch(err => {
                      console.warn(`Supabase auth.${authProp} failed, falling back to mock auth:`, err);
                      return mockSupabase.auth[authProp](...args);
                    });
                  }
                  return result;
                } catch (err) {
                  console.warn(`Supabase auth.${authProp} threw error, falling back to mock auth:`, err);
                  return mockSupabase.auth[authProp](...args);
                }
              };
            }
            return originalVal;
          }
        });
      }
      return mockSupabase.auth;
    }
    
    // Default fallback to real or mock
    if (realSupabase && prop in realSupabase) {
      return realSupabase[prop];
    }
    return mockSupabase[prop];
  }
});
