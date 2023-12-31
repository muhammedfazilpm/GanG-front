import React from 'react';
import { useState, useEffect } from 'react';
import gangLogo from './assets/gang logo.PNG';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-white">
                <img src={gangLogo} className="h-8 mr-3" alt="Flowbite Logo" />
                <h3>GANG-GuestAndGuide</h3>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/home"
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    window.location.pathname === '/home' ? 'bg-blue-600' : ''
                  }`}
                >
                  Home
                </a>
                <a
                  href="/profile"
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    window.location.pathname === '/profile' ? 'bg-blue-600' : ''
                  }`}
                >
                  Profile
                </a>
                <a
                  href="/orders"
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    window.location.pathname === '/orders' ? 'bg-blue-600' : ''
                  }`}
                >
                  Orders
                </a>
                <a
                  href="/dashboard"
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    window.location.pathname === '/dashboard' ? 'bg-blue-600' : ''
                  }`}
                >
                  Dashboard
                </a>
                <a
                  onClick={handleLogout}
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-400 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/home"
                className={`text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === '/home' ? 'bg-blue-600' : ''
                }`}
              >
                Home
              </a>
              <a
                href="/profile"
                className={`text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === '/profile' ? 'bg-blue-600' : ''
                }`}
              >
                Profile
              </a>
              <a
                href="/orders"
                className={`text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === '/orders' ? 'bg-blue-600' : ''
                }`}
              >
                Orders
              </a>
              <a
                href="/dashboard"
                className={`text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                  window.location.pathname === '/dashboard' ? 'bg-blue-600' : ''
                }`}
              >
                Dashboard
              </a>
              <a
                onClick={handleLogout}
                href="#"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
