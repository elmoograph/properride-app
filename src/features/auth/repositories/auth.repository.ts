import { AuthUser } from "../types/auth.types";
import { supabase } from "@/services/supabase/client";

export async function getCurrentUser(): Promise<AuthUser | null> {
  return null;
}
