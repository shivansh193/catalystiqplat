"use client";

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import SignUpForm from '../components/SignUp';
import { useRouter } from 'next/navigation';

export default function ClientLogin() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/clientPage');
    }
  }, [router]);

  const handleSignUp = (userData: any) => {
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/clientPage');
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900`}>
      <Head>
        <title>Client Login</title>
        <meta name="description" content="Login or sign up for the client platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Client Platform
        </h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={openSignUpModal}
        >
          Sign Up / Login
        </button>
      </main>

      <Modal isOpen={isSignUpModalOpen} onClose={closeSignUpModal}>
        <SignUpForm onSignUp={handleSignUp} />
      </Modal>

      <footer className="flex items-center justify-center w-full h-16 border-t mt-8 text-gray-800 dark:text-gray-200">
        <p>© 2024 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}