import React, { useState } from "react";
import gangLogo from "./assets/gang logo.PNG";

const Navbarguest = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handlelogout = () => {
    localStorage.removeItem("guesttoken");
    window.location.href = "/guest/login";
  };
  return (
    <nav style={{ background: "maroon" }} className="bg-blue-500 p-4">
      <div style={{ display: "flex" }}>
        <div style={{ width: "5%", height: "5%" }}>
          {" "}
          <img src={gangLogo} />
        </div>
        <div style={{ width: "100%", textAlign: "center", color: "white" }}>
          <h2>GANG</h2>
          <h4>guest and guide</h4>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl"></div>
        <div className="hidden md:flex space-x-4">
          <a href="/guest" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/guest/book" className="text-white hover:text-gray-300">
            Book
          </a>
          <a href="/guest/orders" className="text-white hover:text-gray-300">
            Orders
          </a>
          <a
            href="#"
            onClick={handlelogout}
            className="text-white hover:text-gray-300"
          >
            Logout
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div style={{background:'maroon'}} className="md:hidden bg-blue-500">
          <a href="/guest" className="block text-white p-2 hover:bg-blue-600">
            Home
          </a>
          <a
            href="/guest/book"
            className="block text-white p-2 hover:bg-blue-600"
          >
            Book
          </a>
          <a href="/guest/orders" className="block text-white p-2 hover:bg-blue-600">
            Orders
          </a>
          <a
            href="#"
            onClick={handlelogout}
            className="block text-white p-2 hover:bg-blue-600"
          >
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbarguest;
