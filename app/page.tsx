'use client';

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Desc1 } from "@/components/desc1";
import RetroGrid from "@/components/magicui/retro-grid";
import { Footer } from "@/components/ui/m-footer";
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const LandingPage = () => {
  const router = useRouter();

  const handleClientPlatClick = () => {
    router.push('/clientlogin');
  };

  return (
    <html lang="en">
      <body className={`relative ${inter.className}`}>
        <Navbar />
        <Hero />
        <Desc1 />
        <div className="relative">
          <div className="z-0"><RetroGrid /></div>
          <div className="z-10">
            
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

export default LandingPage;