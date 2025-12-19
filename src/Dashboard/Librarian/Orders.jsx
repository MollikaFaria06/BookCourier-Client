import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${process.env.VITE_API_URL}/librarian/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(`${process.env.VITE_API_URL}/librarian/orders/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map(o => (o._id === id ? { ...o, status: "cancelled" } : o)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(`${process.env.REACT_APP_API_URL}/librarian/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map(o => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error(err);
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
                  <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="border px-2 py-1 rounded">
                    {statusOptions.filter(s => (order.status === "pending" && s !== "delivered") || order.status === "shipped" || s === order.status)
                      .map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : "Cancelled"}
              </td>
              <td className="p-2 border">
                {order.status === "pending" && (
                  <button onClick={() => handleCancel(order._id)} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
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
