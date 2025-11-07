import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section - Logo & Desktop Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              LearnHub
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Courses
              </Link>
              <Link
                to="/notes"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Notes
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Hi, {user.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
            )}

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Admin
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {open ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/courses"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
            >
              Courses
            </Link>
            <Link
              to="/notes"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
            >
              Notes
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
            >
              Contact
            </Link>

            <div className="border-t border-gray-200 my-3 pt-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    Hi, {user.name?.split(" ")[0]}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full mt-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium text-center rounded-lg"
                >
                  Login
                </Link>
              )}
              {user && user.role === "admin" && (
                <Link
                  to="/admin"
                  className="block w-full px-4 py-2 mt-2 bg-blue-600 text-white text-sm font-medium text-center rounded-lg "
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}