import React, { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/librarian/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Fetch orders failed:", err.response?.data || err.message);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = await getToken();
      await axios.patch(`${import.meta.env.VITE_API_URL}/librarian/orders/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map(o => (o._id === id ? { ...o, status: "cancelled" } : o)));
    } catch (err) {
      console.error("Cancel order failed:", err.response?.data || err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = await getToken();
      await axios.patch(`${import.meta.env.VITE_API_URL}/librarian/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map(o => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error("Update status failed:", err.response?.data || err.message);
    }
  };

  const statusOptions = ["pending", "shipped", "delivered"];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Book</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="p-2 border">{order._id}</td>
              <td className="p-2 border">{order.bookName}</td>
              <td className="p-2 border">{order.userName}</td>
              <td className="p-2 border">
                {order.status !== "cancelled" ? (
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    {statusOptions.filter(s => {
                      if (order.status === "pending") return s !== "delivered";
                      if (order.status === "shipped") return s !== "pending";
                      return s === order.status;
                    }).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : "Cancelled"}
              </td>
              <td className="p-2 border">
                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
