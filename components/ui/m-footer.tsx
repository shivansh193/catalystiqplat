import * as React from 'react';
import { Separator } from '@/components/ui/separator';


export const Footer = () => {
  return (
    <footer className="static inset-x-0 z-40 bottom-0">
        < Separator />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col gap-4">
            <h5 className="text-xl font-bold">CatalystIQHub</h5>
            <p className="text-sm">
              CatalystIQ is a platform for businesses to connect with the right talent and resources to grow their business.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-xl font-bold">Links</h5>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm">Home</a>
              <a href="#" className="text-sm">About</a>
              <a href="#" className="text-sm">Services</a>
              <a href="#" className="text-sm">Team</a>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-xl font-bold">Contact</h5>
            <p className="text-sm"></p>



            </div>
            </div>
            </div>
            <Separator />
            <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-center">
              <p>
                &copy; 2024 CatalystIQHub. All rights reserved.
              </p>
            </div>
            </footer>
            );
            }

