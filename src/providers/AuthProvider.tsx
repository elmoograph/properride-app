import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { AuthContext } from "../contexts/AuthContext";
import { authRepository } from "../repositories/authRepository";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    authRepository.getSession().then((session) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const subscription = authRepository.onAuthStateChange((session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    await authRepository.signUp(email, password, fullName);
  };

  const signIn = async (email: string, password: string) => {
    await authRepository.signIn(email, password);
  };

  const signOut = async () => {
    await authRepository.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, isLoading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
