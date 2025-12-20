import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Logo from "../components/Logo/Logo";
import { useAuth } from "../contexts/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="navbar bg-base-300 px-2 sm:px-4 lg:px-6 shadow">
          {/* Drawer toggle for small screens */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost text-black text-lg sm:text-xl"
            >
              ☰
            </label>
          </div>

          {/* Logo and title */}
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Logo />
              <h1 className="text-purple-600 text-xl sm:text-2xl lg:text-3xl font-semibold">
                Dashboard
              </h1>
            </div>

            {/* User info (hidden on small screens) */}
            {user && (
              <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                <span className="font-medium text-black text-sm sm:text-base">
                  {user.name || "User"}
                </span>
                <img
                  src={user.photoURL || "https://i.ibb.co/ZxjH7QZ/avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-400 object-cover"
                />
              </div>
            )}
          </div>
        </nav>

        {/* Main Outlet content */}
        <div className="p-2 sm:p-4 lg:p-6 bg-base-800 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
