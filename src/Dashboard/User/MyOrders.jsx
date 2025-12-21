import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err.response?.data || err.message);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to cancel this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No'
    });

    if (confirm.isConfirmed) {
      try {
        const firebaseUser = auth.currentUser;
        if (!firebaseUser) return;
        const token = await firebaseUser.getIdToken();

        await axios.put(
          `${import.meta.env.VITE_API_URL}/users/cancel/${orderId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o))
        );

        Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to cancel order.', 'error');
      }
    }
  };

  const handlePay = (orderId) => {
    navigate(`/dashboard/user/payment/${orderId}`);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-500">No orders found</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-center
                     bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400
                     text-transparent bg-clip-text">
        📦 My Orders
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white text-gray-800">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Book Title</th>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Order Date</th>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Status</th>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Payment</th>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, idx) => (
              <tr
                key={o._id}
                className={`border-b hover:bg-purple-100 transition-colors ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium text-gray-800 text-sm sm:text-base">
                  {o.bookTitle}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-600 text-sm sm:text-base">
                  {new Date(o.createdAt).toLocaleString()}
                </td>
                <td
                  className={`py-2 px-3 sm:py-3 sm:px-4 font-semibold text-sm sm:text-base ${
                    o.status === "pending"
                      ? "text-yellow-500"
                      : o.status === "cancelled"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {o.status}
                </td>
                <td
                  className={`py-2 px-3 sm:py-3 sm:px-4 font-semibold text-sm sm:text-base ${
                    o.paymentStatus === "unpaid" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {o.paymentStatus}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 flex flex-wrap gap-2">
                  {o.status === "pending" && o.paymentStatus !== "paid" && (
                    <>
                      <button
                        onClick={() => handleCancel(o._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePay(o._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition"
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
      </div>
    </div>
  );
};

export default MyOrders;
