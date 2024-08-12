"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/darkmode";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">CatalystIQHub</span>
          </Link>
          <div className="flex items-center gap-4 md:hidden">
            <ModeToggle />
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <div className="items-center flex gap-4">
              <Link
                href="/"
                className="font-medium flex items-center text-sm transition-colors hover:underline text-gray-700 dark:text-gray-300"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-medium flex items-center text-sm transition-colors hover:underline text-gray-700 dark:text-gray-300"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="/team"
                className="font-medium flex items-center text-sm transition-colors hover:underline text-gray-700 dark:text-gray-300"
                prefetch={false}
              >
                Team
              </Link>
            </div>
            <Button variant="outline" size="sm">
              <Link href="/portfolio" prefetch={false}>
                Portfolio
              </Link>
            </Button>
            <Button size="sm">
              <Link href="/contact" prefetch={false}>
                Contact
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4`}
        >
          <nav className="flex flex-col gap-4 px-4">
            <Link
              href="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline text-gray-700 dark:text-gray-300"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium flex items-center text-sm transition-colors hover:underline text-gray-700 dark:text-gray-300"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="/services"
              className="font-medium flex items-center text-sm transition-colors hover:underline text-gray-700 dark:text-gray-300"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="/team"
              className="font-medium flex items-center text-sm transition-colors hover:underline text-gray-700 dark:text-gray-300"
              prefetch={false}
            >
              Team
            </Link>
            <Button variant="outline" size="sm">
              <Link href="/portfolio" prefetch={false}>
                Portfolio
              </Link>
            </Button>
            <Button size="sm">
              <Link href="/contact" prefetch={false}>
                Contact
              </Link>
            </Button>
          </nav>
        </div>
      </div>
      <Separator className="dark:bg-gray-800" />
    </nav>
  );
};
