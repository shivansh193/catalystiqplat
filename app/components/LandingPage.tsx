// pages/index.tsx
"use client";

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import SignUpForm from './SignUp';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isClientPlat, setIsClientPlat] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      router.push('/clientPage');
    }
  }, [router]);

  const handleSignUp = (userData: any) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    router.push('/clientPage');
  };

  const handleClientPlatClick = () => {
    setIsClientPlat(true);
  };

  const handleCloseModal = () => {
    setIsClientPlat(false);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900`}>
      <Head>
        <title>Welcome to Our Platform</title>
        <meta name="description" content="Choose between Client or Company platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 text-center">
        {isLoggedIn ? (
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Welcome Back!
          </h1>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Welcome to Our Platform
            </h1>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                onClick={handleClientPlatClick}
              >
                Client Plat &rarr;
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                onClick={() => alert('Company Plat Opened')}
              >
                Company Plat &rarr;
              </button>
            </div>
          </>
        )}
      </main>

      <Modal isOpen={isClientPlat} onClose={handleCloseModal}>
        <SignUpForm onSignUp={handleSignUp} />
      </Modal>

      <footer className="flex items-center justify-center w-full h-16 border-t mt-8 text-gray-800 dark:text-gray-200">
        <p>© 2024 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
