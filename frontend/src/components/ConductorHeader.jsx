import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the mobile menu

const ConductorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-200 text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-2xl font-bold">CityCommute</h1>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-slate-200 md:bg-transparent shadow-md md:shadow-none`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 p-4 md:p-0">
            <li>
              <Link
                to="/conductorBuses"
                className="hover:text-blue-300 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Buses
              </Link>
            </li>
            <li>
              <Link
                to="/changePassword"
                className="hover:text-blue-300 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Change Password
              </Link>
            </li>
            <li>
              <Link
                to="/conductorLogin"
                className="hover:text-blue-300 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ConductorHeader;
