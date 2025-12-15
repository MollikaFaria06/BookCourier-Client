import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/api/orders?email=${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, [user]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/cancel`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Cancel failed");

      toast.success("Order cancelled");
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: "cancelled" } : o));
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  const handlePayNow = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl  font-bold mb-4">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-purple-800">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4  py-2">Book</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="text-center text-white border-b">
                <td className="px-4 py-2">{order.bookTitle}</td>
                <td className="px-4 py-2">${order.price.toFixed(2)}</td>
                <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.paymentStatus}</td>
                <td className="px-4 py-2">
                  {order.status === "pending" && order.paymentStatus === "unpaid" ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePayNow(order._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                      >
                        Pay Now
                      </button>
                    </div>
                  ) : (
                    <span className="text-black italic">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
