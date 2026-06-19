import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});
