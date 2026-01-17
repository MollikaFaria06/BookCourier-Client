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
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaInfoCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const userRole = user?.role || "User";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
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
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
      });
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="flex gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books" className="flex gap-2">
          <FaBook /> Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="flex gap-2">
          <FaTachometerAlt /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className="flex gap-2">
          <FaMapMarkedAlt /> Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="flex gap-2">
          <FaInfoCircle /> About
        </NavLink>
      </li>
    </>
  );

  const Avatar = ({ size = "w-9 h-9" }) =>
    user?.photoURL ? (
      <img
        src={user.photoURL}
        alt="profile"
        className={`${size} rounded-full object-cover border border-white/30`}
      />
    ) : (
      <FaUserCircle size={36} />
    );

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-black to-purple-900 text-white">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* START */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-xl">☰</label>

            <ul className="menu menu-sm dropdown-content mt-3 p-3 bg-black/90 rounded-box w-56">
              {links}
              <div className="divider"></div>

              {!user ? (
                <>
                  <li>
                    <Link to="/auth/login" className="btn btn-sm btn-outline w-full flex gap-2">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/register" className="btn btn-sm btn-primary w-full flex gap-2">
                      <FaUserPlus /> Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3 cursor-default">
                    <Avatar />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">{user.displayName || "User"}</span>
                      <span className="text-gray-400">Role: {userRole}</span>
                      <span className="text-gray-500">{user.email}</span>
                    </div>
                  </li>

                  <li className="mt-2">
                    <button onClick={handleLogOut} className="btn btn-sm btn-outline w-full flex gap-2">
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost text-xl">
            <Logo />
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{links}</ul>
        </div>

        {/* END */}
        <div className="navbar-end gap-3">

          {/* THEME TOGGLE */}
          <button
            onClick={handleThemeToggle}
            className="btn btn-circle btn-sm bg-white/10 hover:bg-white/20 ring-1 ring-white/30"
          >
            {theme === "dark"
              ? <FaSun className="text-yellow-400" />
              : <FaMoon className="text-blue-300" />
            }
          </button>

          {/* DESKTOP AUTH / PROFILE */}
          {!user ? (
            <div className="hidden md:flex gap-2">
              <Link to="/auth/login" className="btn btn-sm btn-outline flex gap-2">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/auth/register" className="btn btn-sm btn-primary flex gap-2">
                <FaUserPlus /> Register
              </Link>
            </div>
          ) : (
            <>
              <div className="dropdown dropdown-end hidden md:block">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <Avatar />
                </label>

                <ul className="menu menu-sm dropdown-content mt-3 p-4 bg-black/90 rounded-box w-64">
                  <li className="flex items-center gap-3 cursor-default">
                    <Avatar size="w-10 h-10" />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">{user.displayName || "User"}</span>
                      <span className="text-gray-400">Role: {userRole}</span>
                      <span className="text-gray-500">{user.email}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleLogOut}
                className="btn btn-sm btn-outline hidden md:flex gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
