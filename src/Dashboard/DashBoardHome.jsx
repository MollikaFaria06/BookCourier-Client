// src/dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardHome = () => {
  const { user } = useAuth();
  const [ordersData, setOrdersData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");

    // User Orders Summary
    if (user.role === "user") {
      fetch("http://localhost:5000/users/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const summary = ["pending", "paid", "cancelled"].map((status) => ({
              status: status.charAt(0).toUpperCase() + status.slice(1),
              count: data.orders.filter((o) => o.status === status).length,
            }));
            setOrdersData(summary);
          }
        });
    }

    // Librarian Orders & Books Summary
    if (user.role === "librarian") {
      fetch("http://localhost:5000/librarian/my-books", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBooksData(data.books);

            fetch("http://localhost:5000/librarian/orders", {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => res.json())
              .then((ord) => {
                if (ord.success) {
                  const summary = ["pending", "paid", "cancelled"].map((status) => ({
                    status: status.charAt(0).toUpperCase() + status.slice(1),
                    count: ord.orders.filter((o) => o.status === status).length,
                  }));
                  setOrdersData(summary);
                }
              });
          }
        });
    }

    // Admin Summary
    if (user.role === "admin") {
      fetch("http://localhost:5000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setUsersCount(data.users.length);
        });

      fetch("http://localhost:5000/admin/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setBooksData(data.books);
        });

      fetch("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const summary = ["pending", "paid", "cancelled"].map((status) => ({
              status: status.charAt(0).toUpperCase() + status.slice(1),
              count: data.orders.filter((o) => o.status === status).length,
            }));
            setOrdersData(summary);
          }
        });
    }
  }, [user]);

  if (!user) return null;

  const COLORS = ["#facc15", "#4ade80", "#f87171"]; // pending, paid, cancelled

  return (
    <div className="p-4">
      {/* Beautiful Gradient Transparent Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Welcome to Your Dashboard, {user.name}!
      </motion.h1>

      {/* Dashboard Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* User Cards */}
        {user.role === "user" && (
          <>
            <motion.div className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/my-orders">My Orders</Link>
            </motion.div>
            <motion.div className="bg-pink-600 hover:bg-pink-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/invoices">Invoices</Link>
            </motion.div>
            <motion.div className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/my-profile">My Profile</Link>
            </motion.div>
          </>
        )}

        {/* Librarian Cards */}
        {user.role === "librarian" && (
          <>
            <motion.div className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/librarian/add-book">Add Book</Link>
            </motion.div>
            <motion.div className="bg-green-600 hover:bg-green-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/librarian/my-books">My Books</Link>
            </motion.div>
            <motion.div className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/librarian/orders">Orders</Link>
            </motion.div>
            <motion.div className="bg-pink-600 hover:bg-pink-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/my-profile">My Profile</Link>
            </motion.div>
          </>
        )}

        {/* Admin Cards */}
        {user.role === "admin" && (
          <>
            <motion.div className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/admin/all-users">All Users</Link>
            </motion.div>
            <motion.div className="bg-green-600 hover:bg-green-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/admin/manage-books">Manage Books</Link>
            </motion.div>
            <motion.div className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded shadow text-center">
              <Link to="/dashboard/my-profile">My Profile</Link>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Chart */}
        {ordersData.length > 0 && (
          <div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
            <h3 className="text-lg font-bold mb-4 text-secondary">Orders Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersData}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {user.role === "admin" && (
          <div className="p-6 bg-yellow-500 text-white rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Total Users</h3>
              <p className="text-3xl text-center font-bold mt-2">{usersCount}</p>
            </div>
            <div className="text-white text-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 118 0 4 4 0 01-8 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Books Chart */}
        {user.role !== "user" && booksData.length > 0 && (
          <div className="p-4 bg-primary dark:bg-slate-800 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Books Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={booksData.map((b) => ({ name: b.title, value: 1 }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#4ade80"
                  label
                >
                  {booksData.map((b, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
