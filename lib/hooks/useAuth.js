// lib/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithGoogle, signOut, signInWithEmail, registerWithEmail } from '../firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { 
    user, 
    loading, 
    signInWithGoogle, 
    signOut, 
    signInWithEmail, 
    registerWithEmail 
  };
}