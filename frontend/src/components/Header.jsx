import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-2xl font-bold">SwiftPass</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <Link to="/home" className="hover:text-blue-300 transition-colors">
              Home
            </Link>
            <Link to="/apply" className="hover:text-blue-300 transition-colors">
              Apply
            </Link>
            <Link
              to="/allBuses"
              className="hover:text-blue-300 transition-colors"
            >
              Buses
            </Link>
            <Link to="/chat" className="hover:text-blue-300 transition-colors">
              Chat
            </Link>
            <Link
              to="/profile"
              className="hover:text-blue-300 transition-colors"
            >
              Profile
            </Link>

            <Link to="/" className="hover:text-blue-300 transition-colors">
              LogOut
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
