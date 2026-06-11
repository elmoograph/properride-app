import {
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
} from "../repositories/auth.repository";

export async function signIn(email: string, password: string) {
  return signInWithEmail(email, password);
}

export async function signUp(email: string, password: string) {
  return signUpWithEmail(email, password);
}

export async function signOut() {
  return signOutUser();
}
