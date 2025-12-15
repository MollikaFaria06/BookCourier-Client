import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Logo from "../components/Logo/Logo";
import { useAuth } from "../contexts/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-300 px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost text-black"
            >
              ☰
            </label>
          </div>

          <div className="flex flex-1 gap-4 items-center justify-between">
            <div className="flex items-end gap-4">
              <Logo />
              <h1 className="text-purple-600 text-3xl mb-2 font-semibold">
                Dashboard
              </h1>
            </div>

            {/* Right side: Profile image */}
            {user && (
              <div className="flex items-center gap-2">
                <span className="hidden md:block text-black">{user.displayName}</span>
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-400 object-cover"
                />
              </div>
            )}
          </div>
        </nav>

        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
