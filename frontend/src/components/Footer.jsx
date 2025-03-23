import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        {/* Footer Content */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CityCommute. All rights reserved.
        </p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li>
              <a
                href="/about"
                className="hover:text-gray-400 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-400 transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-gray-400 transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-gray-400 transition-colors"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
