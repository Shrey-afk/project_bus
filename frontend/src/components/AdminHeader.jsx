import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className=" bg-slate-200 text-black  shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* App Name */}
        <h1 className="text-2xl font-bold">CityCommute</h1>

        {/* Navigation Links */}
        <nav className="text-[20px]">
          <ul className="flex space-x-10">
            <Link
              to="/appliedUsers"
              className="hover:text-blue-300 transition-colors"
            >
              Applied Users
            </Link>
            <Link
              to="/createBus"
              className="hover:text-blue-300 transition-colors"
            >
              Create Bus
            </Link>
            <Link
              to="/conductors"
              className="hover:text-blue-300 transition-colors"
            >
              Conductors
            </Link>
            <Link
              to="/all-complaints"
              className="hover:text-blue-300 transition-colors"
            >
              Complaints
            </Link>

            <Link to="/login" className="hover:text-blue-300 transition-colors">
              LogOut
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
