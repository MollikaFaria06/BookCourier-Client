// src/dashboard/librarian/Orders.jsx
import React, { useState } from "react";

const initialOrders = [
  { id: 1, book: "Book 1", user: "User A", status: "pending" },
  { id: 2, book: "Book 2", user: "User B", status: "shipped" },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleCancel = (id) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o))
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
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
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.book}</td>
              <td className="p-2 border">{order.user}</td>
              <td className="p-2 border">
                {order.status !== "cancelled" ? (
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    {statusOptions
                      .filter(
                        (s) =>
                          (order.status === "pending" && s !== "delivered") ||
                          (order.status === "shipped") ||
                          s === order.status
                      )
                      .map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                  </select>
                ) : (
                  "Cancelled"
                )}
              </td>
              <td className="p-2 border">
                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order.id)}
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
