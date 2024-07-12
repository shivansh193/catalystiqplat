// lib/firebase/auth.js
import { getAuth, onAuthStateChanged as _onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./initFirebase";

const auth = getAuth(app);

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in successful:", result.user);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out", error);
  }
}

export async function signInWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email sign-in successful:", result.user);
  } catch (error) {
    console.error("Error signing in with email and password", error);
  }
}

export async function registerWithEmail(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Email registration successful:", result.user);
  } catch (error) {
    console.error("Error registering with email and password", error);
  }
}
