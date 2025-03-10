import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from local storage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <header className="bg-slate-200 text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-2xl font-bold">CityCommute</h1>

        {/* Navigation Links */}
        <nav className="text-[20px]">
          <ul className="flex space-x-10">
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
                  to="/chat"
                  className="hover:text-blue-300 transition-colors"
                >
                  Chat
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
