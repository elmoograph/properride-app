import { supabase } from "@/src/lib/supabase";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}
