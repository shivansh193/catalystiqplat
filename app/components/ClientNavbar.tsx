"use client";
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../../lib/firebase/initFirebase';

const ClientNavbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    console.log("Current user on load:", auth.currentUser);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Client Platform</h1>
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <div>
            <span className="mr-4">Welcome, {user.email}</span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const auth = getAuth(app);
                auth.signOut();
                window.location.href = '/';
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <span>No user signed in</span>
        )}
      </div>
    </nav>
  );
};

export default ClientNavbar;
