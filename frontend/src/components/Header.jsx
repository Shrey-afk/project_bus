import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons

const Header = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from local storage
    navigate("/login"); // Redirect to the login page
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

  return (
    <header className="bg-slate-200 text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-2xl font-bold">CityCommute</h1>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl cursor-pointer" />
          ) : (
            <FaBars className="text-2xl cursor-pointer" />
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full h-[100vh] lg:h-auto md:w-auto bg-slate-200 md:bg-transparent z-50`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0 p-4 md:p-0">
            <Link to="/" className="hover:text-blue-300 transition-colors">
              Home
            </Link>
            <Link to="/apply" className="hover:text-blue-300 transition-colors">
              Apply
            </Link>

            {user ? (
              <>
                <Link
                  to="/allBuses"
                  className="hover:text-blue-300 transition-colors"
                >
                  Buses
                </Link>

                <Link
                  to="/complaint"
                  className="hover:text-blue-300 transition-colors"
                >
                  Complaint
                </Link>
                <Link
                  to="/history"
                  className="hover:text-blue-300 transition-colors"
                >
                  Travel History
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-300 transition-colors"
                >
                  Profile
                </Link>
                <Link
                  to="/changePasswordUser"
                  className="hover:text-blue-300 transition-colors"
                >
                  Change Password
                </Link>

                <Link
                  to="/login"
                  className="hover:text-blue-300 transition-colors"
                  onClick={handleLogout} // Add onClick handler for logout
                >
                  LogOut
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-blue-300 transition-colors"
              >
                Login
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
