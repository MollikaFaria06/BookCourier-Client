// src/dashboard/admin/AllUsers.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const AllUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("AllUsers API Response:", res.data); // ✅ Debug
        // Fix: check if res.data.users exists, else use res.data directly
        const usersData = res.data.users || res.data || [];
        setUsers(usersData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch users error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch users.");
        setLoading(false);
      });
  }, [user, API_URL]);

  const changeRole = (id, role) => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${API_URL}/admin/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
      })
      .catch((err) => {
        console.error("Change role error:", err.response?.data || err.message);
        alert("Failed to change role.");
      });
  };

  if (loading)
    return (
      <div className="text-center py-6 text-gray-500 font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-6 text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-center
                   bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400
                   text-transparent bg-clip-text flex items-center justify-center gap-2"
      >
        📚 Manage & Empower Your Users
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white text-gray-800">
          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
            <tr>
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">Name</th>
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">Email</th>
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">Role</th>
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr
                  key={u._id || u.id || index}
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 sm:py-4 px-3 sm:px-6 font-medium text-sm sm:text-base">{u.name}</td>
                  <td className="py-2 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">{u.email}</td>
                  <td className="py-2 sm:py-4 px-3 sm:px-6 capitalize text-sm sm:text-base">{u.role}</td>
                  <td className="py-2 sm:py-4 px-3 sm:px-6 flex flex-wrap gap-2 text-sm sm:text-base">
                    {u.role !== "librarian" && (
                      <button
                        onClick={() => changeRole(u._id, "librarian")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded shadow transition text-xs sm:text-sm"
                      >
                        Make Librarian
                      </button>
                    )}
                    {u.role !== "admin" && (
                      <button
                        onClick={() => changeRole(u._id, "admin")}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1 rounded shadow transition text-xs sm:text-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400 text-sm sm:text-base">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
