// src/dashboard/user/MyOrders.jsx
import React, { useState } from "react";

const initialOrders = [
  { id: 1, title: "Book 1", date: "2025-12-10", status: "pending" },
  { id: 2, title: "Book 2", date: "2025-12-11", status: "paid" },
];

const MyOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleCancel = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const handlePayNow = (id) => {
    // Redirect to payment page
    window.location.href = `/dashboard/payment/${id}`;
  };

  return (
    <div>
      <h2 className="text-2xl text-black font-bold mb-4">My Orders</h2>
      <table className="w-full border border-gray-900">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border-2 text-black ">Book</th>
            <th className="p-2 border-2 text-black">Order Date</th>
            <th className="p-2 border-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border-2 text-black">{order.title}</td>
              <td className="p-2 border-2 text-black">{order.date}</td>
              <td className="p-2 border-2 text-black">
                {order.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handlePayNow(order.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Pay Now
                    </button>
                  </>
                )}
                {order.status === "paid" && <span>Paid</span>}
                {order.status === "cancelled" && <span>Cancelled</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
