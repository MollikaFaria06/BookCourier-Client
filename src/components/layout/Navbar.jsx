import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Logo/Logo";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaBook,
  FaTachometerAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

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

  const handleLogOut = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged out!",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to log out!",
      });
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books" className="flex items-center gap-2">
          <FaBook /> Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <FaTachometerAlt /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className="flex items-center gap-2">
          <FaMapMarkedAlt /> Coverage
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-black to-purple-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto navbar px-4">

        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black/90 rounded-box w-52"
            >
              {links}
              {!user ? (
                <>
                  <li className="mt-2">
                    <Link to="/auth/login" className="btn btn-sm btn-outline text-white w-full">
                      Log In
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="/auth/register" className="btn btn-sm btn-primary w-full">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="mt-2">
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm btn-outline text-white w-full"
                  >
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <Logo />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        <div className="navbar-end gap-2">
          <button
            onClick={handleThemeToggle}
            className="btn btn-circle btn-sm bg-black hover:bg-gray-800 text-white"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-sm btn-outline text-white hidden sm:inline-flex"
            >
              Log Out
            </button>
          ) : (
            <div className="hidden sm:flex gap-2 p-4">
              <Link to="/auth/login" className="btn btn-sm btn-outline text-white">
                Log In
              </Link>
              <Link to="/auth/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
