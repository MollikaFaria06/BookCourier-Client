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
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-300 px-4 shadow">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost text-black">☰</label>
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-end gap-3">
              <Logo />
              <h1 className="text-purple-600 text-3xl mb-2 font-semibold">Dashboard</h1>
            </div>

            {user && (
              <div className="flex items-center gap-3">
                <span className="hidden md:block font-medium text-black">{user.name || "User"}</span>
                <img src={user.photoURL || "https://i.ibb.co/ZxjH7QZ/avatar.png"} alt="Profile" className="w-10 h-10 rounded-full border border-gray-400 object-cover" />
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 bg-base-800 flex-1">
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
