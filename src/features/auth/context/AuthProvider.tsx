import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/src/lib/supabase";
import {
  getCurrentSession,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
} from "@/src/features/auth/repositories/auth.repository";

import type {
  AuthContextValue,
  AuthUser,
} from "@/src/features/auth/types/auth.types";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

function mapSessionToUser(session: Session | null): AuthUser | null {
  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email ?? null,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const currentSession = await getCurrentSession();

        if (!mounted) return;

        setSession(currentSession);
        setUser(mapSessionToUser(currentSession));
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSession();

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(mapSessionToUser(nextSession));
      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    setLoading(true);

    try {
      await signInWithEmail(email, password);
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string) {
    setLoading(true);

    try {
      await signUpWithEmail(email, password);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);

    try {
      await signOutUser();
    } finally {
      setLoading(false);
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [session, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
