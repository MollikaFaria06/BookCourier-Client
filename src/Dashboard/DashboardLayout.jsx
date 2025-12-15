import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Logo from "../components/Logo/Logo";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              ☰
            </label>
          </div>
          <div className=" flex gap-4 items-end justify-center px-4 font-semibold"> <Logo></Logo>
          <h1 className="text-purple-600 text-3xl mb-2">Dashboard</h1>
          </div>
        </nav>

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
