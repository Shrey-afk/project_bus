import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for hamburger menu

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-200 text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-2xl font-bold">CityCommute</h1>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`lg:flex lg:items-center lg:space-x-10 lg:h-auto h-[100vh] ${
            isMenuOpen
              ? "block absolute top-16 left-0 w-full bg-slate-200 shadow-lg"
              : "hidden"
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-10 p-4 lg:p-0">
            <li>
              <Link
                to="/appliedUsers"
                className="block py-2 lg:py-0 hover:text-blue-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Applied Users
              </Link>
            </li>
            <li>
              <Link
                to="/createBus"
                className="block py-2 lg:py-0 hover:text-blue-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Bus
              </Link>
            </li>
            <li>
              <Link
                to="/conductors"
                className="block py-2 lg:py-0 hover:text-blue-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Conductors
              </Link>
            </li>
            <li>
              <Link
                to="/all-complaints"
                className="block py-2 lg:py-0 hover:text-blue-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Complaints
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block py-2 lg:py-0 hover:text-blue-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                LogOut
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
