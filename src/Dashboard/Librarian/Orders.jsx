import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    const token = await user.getIdToken(true);
    localStorage.setItem("token", token);
    return token;
  };

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/librarian/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Fetch orders failed:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch orders",
        text: err.message,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = await getToken();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/librarian/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(orders.map(o => (o._id === id ? { ...o, status } : o)));

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Order status changed to "${status}"`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Update status failed:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = await getToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/librarian/orders/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(orders.map(o => (o._id === id ? { ...o, status: "cancelled" } : o)));

      Swal.fire({
        icon: "success",
        title: "Order Cancelled",
        text: "The order has been cancelled.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Cancel order failed:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Cancel Failed",
        text: err.message,
      });
    }
  };

  const statusOptions = ["pending", "shipped", "delivered"];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-purple-700 text-center">
        Orders
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full bg-white text-gray-800">
          <thead className="bg-gradient-to-br from-purple-800 via-pink-800 to-indigo-800 text-white">
            <tr>
              <th className="p-2 sm:p-3 text-left uppercase tracking-wider text-sm sm:text-base">Order ID</th>
              <th className="p-2 sm:p-3 text-left uppercase tracking-wider text-sm sm:text-base">Book</th>
              <th className="p-2 sm:p-3 text-left uppercase tracking-wider text-sm sm:text-base">User</th>
              <th className="p-2 sm:p-3 text-left uppercase tracking-wider text-sm sm:text-base">Status</th>
              <th className="p-2 sm:p-3 text-left uppercase tracking-wider text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">{order._id}</td>
                  <td className="p-2 sm:p-3 font-medium text-sm sm:text-base">{order.bookName}</td>
                  <td className="p-2 sm:p-3 text-sm sm:text-base">{order.userName}</td>
                  <td className="p-2 sm:p-3">
                    {order.status !== "cancelled" ? (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="w-full sm:w-32 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                      >
                        {statusOptions
                          .filter((s) => {
                            if (order.status === "pending") return s !== "delivered";
                            if (order.status === "shipped") return s !== "pending";
                            return s === order.status;
                          })
                          .map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-red-500 text-white text-sm">
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td className="p-2 sm:p-3 flex flex-wrap gap-2">
                    {order.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm text-xs sm:text-sm transition"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400 text-sm sm:text-base">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
