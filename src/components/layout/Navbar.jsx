import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Logo/Logo";
import { FaSun, FaMoon, FaHome, FaBook, FaTachometerAlt, FaMapMarkedAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogOut = () => logOut().catch(console.error);

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
          {/* Mobile dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white">
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
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black/80 rounded-box w-52 text-white"
            >
              {links}
              {!user && (
                <>
                  <li className="mt-2">
                    <Link
                      to="/auth/login"
                      className="btn btn-outline text-white bg-primary w-full text-sm hover:bg-pink-600"
                    >
                      Log In
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      to="/auth/register"
                      className="btn btn-primary text-black bg-secondary w-full text-sm hover:bg-yellow-500"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="flex items-center gap-2 mt-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-15 h-15 rounded-full border-white"
                      />
                    ) : (
                      <div className="w-15 h-15 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="inline">{user.name}</span>
                  </li>
                  <li className="mt-2">
                    <button
                      onClick={handleLogOut}
                      className="btn btn-outline bg-black hover:bg-secondary text-white w-full border-white"
                    >
                      Log Out
                    </button>
                  </li>
                </>
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
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  title={user.name}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
              <span className="hidden lg:inline">{user.name}</span>
              <button
                onClick={handleLogOut}
                className="btn btn-outline text-white bg-primary border-white"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn btn-outline text-white bg-primary hover:bg-pink-600"
              >
                Log In
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-primary text-black bg-secondary hover:bg-yellow-500"
              >
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
