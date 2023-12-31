import React from "react";
import { useState,useEffect } from "react";
import {useLocation} from "react-router-dom"
import gangLogo from "./assets/gang logo.PNG";
import "tailwindcss/tailwind.css";

export default function Navbaradmin() {
  const location=useLocation()
  const [activeLink, setActiveLink] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    window.location.href = "/admin/login";
  };
  const getLinkClassName = (path) => {
    return `text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
      activeLink === path ? "bg-black" : ""
    }`;
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav
        style={{ backgroundColor: "green", textAlign: "center" }}
        className="bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 style={{ color: "white" }}>GANG GuestAndGuide</h1>
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white">
              <img src={gangLogo} className="h-8 mr-3" alt="Flowbite Logo" />
            </div>
          </div>
          <h1 style={{ color: "white" }}>Admin</h1>
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/admin"
                  className={getLinkClassName("/admin")}                >
                  Dashboard
                </a>
                <a
                  href="/admin/location"
                  className={getLinkClassName("/admin/location")}                >
                  Location
                </a>
                <a
                  href="/admin/guide"
                  className={getLinkClassName("/admin/guide")}                >
                
                  Guide
                </a>
                
                <a
                  href="/admin/guest"
                  className={getLinkClassName("/admin/guest")}                >
                  Guest
                </a>
                <a
                  href="/admin/orders"
                  className={getLinkClassName("/admin/orders")}                >
                  Orders
                </a>
                <a
                  href="/admin/banners"
                  className={getLinkClassName("/admin/banners")}                >
                  Banners
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
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
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
                href="/admin"
                className={getLinkClassName("/admin")}                >
                Dashboard
              </a>
              <a
                href="/admin/location"
                className={getLinkClassName("/admin/location")}                >

                Location
              </a>
              <a
                  href="/admin/guest"
                  className={getLinkClassName("/admin/guest")}                >
                  Guest
                </a>
              <a
                href="/admin/guide"
                className={getLinkClassName("/admin/guide")}                >
                Guide
              </a>
              <a
                href="/admin/banners"
                className={getLinkClassName("/admin/banners")}                >
                Banners
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
