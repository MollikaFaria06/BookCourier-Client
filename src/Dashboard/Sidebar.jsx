
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaHome, FaShoppingCart, FaFileInvoice, FaUser, FaBook, FaTasks, FaUsers, FaCogs } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const menuByRole = {
    user: [
      { name: "My Orders", path: "/dashboard/my-orders", icon: <FaShoppingCart /> },
      { name: "Invoices", path: "/dashboard/invoices", icon: <FaFileInvoice /> },
      { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUser /> },
    ],
    librarian: [
      { name: "Add Book", path: "/dashboard/librarian/add-book", icon: <FaBook /> },
      { name: "My Books", path: "/dashboard/librarian/my-books", icon: <FaBook /> },
      { name: "Orders", path: "/dashboard/librarian/orders", icon: <FaShoppingCart /> },
      { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUser /> },
    ],
    admin: [
      { name: "All Users", path: "/dashboard/admin/all-users", icon: <FaUsers /> },
      { name: "Manage Books", path: "/dashboard/admin/manage-books", icon: <FaCogs /> },
      { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUser /> },
    ],
  };

  const menuItems = menuByRole[user.role] || [];

  return (
    <div className="w-64 min-h-full bg-base-200">
      {/* Home link */}
      <div className="p-4 text-lg text-black font-bold">
        <Link
          to="/"
          className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-primary ${
            location.pathname === "/" ? "bg-primary text-white" : ""
          }`}
        >
          <FaHome /> Home
        </Link>
      </div>

      {/* Dashboard menu */}
      <div className="p-4 text-lg font-bold text-black">📚 Dashboard</div>
      <ul className="menu p-2 text-black">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded ${
                location.pathname === item.path ? "bg-primary text-white" : "hover:bg-gray-300"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

