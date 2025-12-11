import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Logo/Logo";
import { FaSun, FaMoon, FaHome, FaBook, FaTachometerAlt, FaMapMarkedAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  // Toggle theme
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogOut = () => {
    logOut().catch(console.error);
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-1">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books" className="flex items-center gap-1">
          <FaBook /> Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="flex items-center gap-1">
          <FaTachometerAlt /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className="flex items-center gap-1">
          <FaMapMarkedAlt /> Coverage
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-black to-purple-900 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Navbar Start */}
        <div className="flex items-center gap-4">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black/80 rounded-box w-52 text-white">
              {links}
              {!user && (
                <>
                  <li>
                    <Link to="/auth/login" className="btn btn-outline text-white bg-primary w-full text-sm mt-2 hover:bg-pink-600">
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/register" className="btn btn-primary text-black bg-secondary w-full text-sm mt-2 hover:bg-yellow-500">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <button onClick={handleLogOut} className="btn btn-outline text-white w-full mt-2 border-white">
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
            <Logo />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={handleThemeToggle}
            className="btn bg-black hover:bg-gray-800 btn-circle text-xl text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <button onClick={handleLogOut} className="btn btn-outline text-white border-white">
              Log Out
            </button>
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-outline text-white bg-primary hover:bg-pink-600">
                Log In
              </Link>
              <Link to="/auth/register" className="btn btn-primary text-black bg-secondary hover:bg-yellow-500">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
