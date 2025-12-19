import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaHome,
  FaShoppingCart,
  FaFileInvoice,
  FaUser,
  FaBook,
  FaUsers,
  FaCogs,
} from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role || "user";

  const menuItems = [
    { name: "My Orders", path: "/dashboard/my-orders", icon: <FaShoppingCart />, roles: ["user"] },
    { name: "Invoices", path: "/dashboard/invoices", icon: <FaFileInvoice />, roles: ["user"] },
    { name: "Add Book", path: "/dashboard/librarian/add-book", icon: <FaBook />, roles: ["librarian"] },
    { name: "My Books", path: "/dashboard/librarian/my-books", icon: <FaBook />, roles: ["librarian"] },
    { name: "Orders", path: "/dashboard/librarian/orders", icon: <FaShoppingCart />, roles: ["librarian"] },
    { name: "All Users", path: "/dashboard/admin/all-users", icon: <FaUsers />, roles: ["admin"] },
    { name: "Manage Books", path: "/dashboard/admin/manage-books", icon: <FaCogs />, roles: ["admin"] },
    { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUser />, roles: ["user","librarian","admin"] },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      <div className="p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 text-black px-3 py-2 rounded font-semibold ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`
          }
        >
          <FaHome /> Home
        </NavLink>
      </div>

      <div className="px-4 py-2 text-sm font-bold text-gray-800 uppercase">Dashboard</div>

      <ul className="menu px-2 text-black">
        {menuItems.map((item) => {
          const hasAccess = item.roles.includes(role);
          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : hasAccess
                      ? "hover:bg-yellow-300"
                      : "opacity-50 cursor-not-allowed"
                  }`
                }
                onClick={(e) => !hasAccess && e.preventDefault()} // unauthorized access blocked
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
