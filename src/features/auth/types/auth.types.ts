import type { Session } from "@supabase/supabase-js";

export type AuthUser = {
  id: string;
  email: string | null;
};

export type AuthContextValue = {
  session: Session | null;
  user: AuthUser | null;
  loading: boolean;

  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};
