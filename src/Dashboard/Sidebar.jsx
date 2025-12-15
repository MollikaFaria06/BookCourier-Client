import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const menuByRole = {
    user: [
      { name: "My Orders", path: "/dashboard/my-orders" },
      { name: "Invoices", path: "/dashboard/invoices" },
      { name: "My Profile", path: "/dashboard/my-profile" },
    ],
    librarian: [
      { name: "Add Book", path: "/dashboard/librarian/add-book" },
      { name: "My Books", path: "/dashboard/librarian/my-books" },
      { name: "Orders", path: "/dashboard/librarian/orders" },
      { name: "My Profile", path: "/dashboard/my-profile" },
    ],
    admin: [
      { name: "All Users", path: "/dashboard/admin/all-users" },
      { name: "Manage Books", path: "/dashboard/admin/manage-books" },
      { name: "My Profile", path: "/dashboard/my-profile" },
    ],
  };

  const menuItems = menuByRole[user.role] || [];

  return (
    <div className="w-64 min-h-full bg-base-200">
      <div className="p-4 text-lg font-bold">
        📚 Dashboard
      </div>

      <ul className="menu p-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={
                location.pathname === item.path ? "active" : ""
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
