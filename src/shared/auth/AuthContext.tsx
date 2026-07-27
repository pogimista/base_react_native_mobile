import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

// This is the shape of the "logged in user" data. In a real app this would
// likely include an id, token, roles, etc. — kept minimal here for the demo.
type User = {
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
};

// createContext gives us a "box" components can read from without props
// being passed down manually through every level of the tree. `undefined`
// is the default value used only if a component reads this context without
// an AuthProvider above it — useAuth (below) turns that into a clear error.
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // `user` is the source of truth for "are we signed in?" — null means
  // signed out. `isLoading` tracks an in-flight sign-in request so the UI
  // can show a spinner/disable the button while it's happening.
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // signIn/signOut are the only ways consumers are allowed to change auth
  // state — components never call setUser directly. Wrapping them (and the
  // rest of the context value) in useMemo means we only build a new object
  // when user/isLoading actually change, instead of on every render.
  const value = useMemo<AuthContextValue>(() => {
    const signIn = async (email: string) => {
      setIsLoading(true);
      try {
        // Stand-in for a real network request — swap this for an actual
        // API call (and store a token, not just an email) when one exists.
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUser({ email });
      } finally {
        setIsLoading(false);
      }
    };

    const signOut = () => {
      setUser(null);
    };

    return { user, isLoading, signIn, signOut };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook wrapper: components call useAuth() instead of useContext(AuthContext)
// directly. This lets us throw a helpful error if someone forgets to wrap the
// app in <AuthProvider>, instead of them getting a confusing "undefined" bug.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
