import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken(); // fresh Firebase token
        const res = await axios.get(
          "http://localhost:5000/api/users/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err.response?.data || err.message);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  // Cancel order
  const handleCancel = async (orderId) => {
    try {
      const token = await user.getIdToken();
      await axios.put(
        `http://localhost:5000/api/users/cancel/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "cancelled" } : o
        )
      );
      toast.success("Order cancelled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  // Pay now
  const handlePay = (orderId) => {
    // navigate to payment page for this order
    navigate(`/dashboard/user/payment/${orderId}`);
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders found</p>;

  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">Book Title</th>
          <th className="p-2 border">Order Date</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Payment</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o._id}>
            <td className="p-2 border">{o.bookTitle}</td>
            <td className="p-2 border">{new Date(o.createdAt).toLocaleString()}</td>
            <td className="p-2 border">{o.status}</td>
            <td className="p-2 border">{o.paymentStatus}</td>
            <td className="p-2 border flex gap-2">
              {o.status === "pending" && o.paymentStatus !== "paid" && (
                <>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleCancel(o._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handlePay(o._id)}
                  >
                    Pay Now
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyOrders;
