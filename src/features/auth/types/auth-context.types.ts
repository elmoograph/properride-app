import { Session } from "@supabase/supabase-js";
import { AuthUser } from "./auth.types";

export type AuthContextType = {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;

  signIn: (email: string, password: string) => Promise<void>;

  signUp: (email: string, password: string) => Promise<void>;

  signOut: () => Promise<void>;
};
