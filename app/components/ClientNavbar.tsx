"use client";
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../../lib/firebase/initFirebase';
import { FirebaseApp } from 'firebase/app';
import { User } from 'firebase/auth';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/darkmode";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

const IntegratedNavbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-sm`}>
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <span className="text-2xl font-bold">CatalystIQHub</span>
          </Link>
          <div className="flex items-center gap-4 md:hidden">
            <ModeToggle />
            <button
              className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <div className="items-center flex gap-4">
              <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
                About
              </Link>
              <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
                Services
              </Link>
              <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
                Team
              </Link>
            </div>
            <Button variant="outline" size="sm">
              Portfolio
            </Button>
            {loading ? (
              <span>Loading...</span>
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Welcome, {user.email}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    const auth = getAuth(app);
                    auth.signOut();
                    window.location.href = '/';
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button size="sm">Login</Button>
            )}
            <ModeToggle />
          </nav>
        </div>
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute left-0 right-0 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md py-4`}
        >
          <nav className="flex flex-col gap-4 px-4">
            <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
              Services
            </Link>
            <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline" prefetch={false}>
              Team
            </Link> 
            <Button variant="outline" size="sm">
              Portfolio
            </Button>
            {loading ? (
              <span>Loading...</span>
            ) : user ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm">Welcome, {user.email}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    const auth = getAuth(app);
                    auth.signOut();
                    window.location.href = '/';
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button size="sm">Login</Button>
            )}
          </nav>
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default IntegratedNavbar;