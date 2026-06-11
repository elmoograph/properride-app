import { supabase } from "@/services/supabase/client";

export async function getSession() {
  return supabase.auth.getSession();
}

export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUpWithEmail(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signOutUser() {
  return supabase.auth.signOut();
}
