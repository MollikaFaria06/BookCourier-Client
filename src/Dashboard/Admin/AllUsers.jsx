import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.users || []))
      .catch((err) => console.error(err));
  }, []);

  const changeRole = (id, role) => {
    axios
      .patch(
        `http://localhost:5000/admin/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
      });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Meaningful & Transparent Heading */}
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
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">
                Name
              </th>
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">
                Email
              </th>
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">
                Role
              </th>
              <th className="py-2 sm:py-3 px-3 sm:px-6 text-left uppercase tracking-wider text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr
                  key={u._id}
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 sm:py-4 px-3 sm:px-6 font-medium text-sm sm:text-base">
                    {u.name}
                  </td>
                  <td className="py-2 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">
                    {u.email}
                  </td>
                  <td className="py-2 sm:py-4 px-3 sm:px-6 capitalize text-sm sm:text-base">
                    {u.role}
                  </td>
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
