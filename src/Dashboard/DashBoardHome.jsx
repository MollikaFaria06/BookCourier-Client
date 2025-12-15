// src/dashboard/DashboardHome.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-4">
      {/* 🔥 Animated Welcome */}
      <motion.h2
        className="text-3xl text-primary font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Welcome, {user.name}!
      </motion.h2>

      {/* User Dashboard */}
      {user.role === "user" && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            { to: "/dashboard/my-orders", label: "My Orders", color: "bg-yellow-500 hover:bg-yellow-600" },
            { to: "/dashboard/invoices", label: "Invoices", color: "bg-pink-600 hover:bg-pink-700" },
            { to: "/dashboard/my-profile", label: "My Profile", color: "bg-purple-600 hover:bg-purple-700" },
          ].map((item) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to={item.to}
                className={`${item.color} text-white p-6 rounded shadow block text-center`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Librarian Dashboard */}
      {user.role === "librarian" && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link className="bg-blue-600 text-white p-6 rounded shadow text-center" to="/dashboard/librarian/add-book">
            Add Book
          </Link>
          <Link className="bg-green-600 text-white p-6 rounded shadow text-center" to="/dashboard/librarian/my-books">
            My Books
          </Link>
          <Link className="bg-purple-600 text-white p-6 rounded shadow text-center" to="/dashboard/librarian/orders">
            Orders
          </Link>
          <Link className="bg-pink-600 text-white p-6 rounded shadow text-center" to="/dashboard/my-profile">
            My Profile
          </Link>
        </motion.div>
      )}

      {/* Admin Dashboard */}
      {user.role === "admin" && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link className="bg-blue-600 text-white p-6 rounded shadow text-center" to="/dashboard/admin/all-users">
            All Users
          </Link>
          <Link className="bg-green-600 text-white p-6 rounded shadow text-center" to="/dashboard/admin/manage-books">
            Manage Books
          </Link>
          <Link className="bg-purple-600 text-white p-6 rounded shadow text-center" to="/dashboard/my-profile">
            My Profile
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;
