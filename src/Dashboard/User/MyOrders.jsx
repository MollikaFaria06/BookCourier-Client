import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // ✅ SweetAlert import

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const res = await axios.get("http://localhost:5000/users/my-orders", {
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

  // Cancel order with SweetAlert confirmation
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
          `http://localhost:5000/users/cancel/${orderId}`,
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

  // Pay now
  const handlePay = (orderId) => {
    navigate(`/dashboard/user/payment/${orderId}`);
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-500">No orders found</p>;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Book Title</th>
              <th className="py-3 px-6 text-left">Order Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Payment</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, idx) => (
              <tr
                key={o._id}
                className={`${idx % 2 === 0 ? "bg-base-300" : "bg-sky-200"} hover:bg-purple-400 transition`}
              >
                <td className="py-3 px-6 font-medium text-gray-800">{o.bookTitle}</td>
                <td className="py-3 px-6 text-gray-600">
                  {new Date(o.createdAt).toLocaleString()}
                </td>
                <td className={`py-3 px-6 font-semibold ${o.status === "pending" ? "text-yellow-500" : o.status === "cancelled" ? "text-red-500" : "text-green-500"}`}>
                  {o.status}
                </td>
                <td className={`py-3 px-6 font-semibold ${o.paymentStatus === "unpaid" ? "text-red-500" : "text-green-500"}`}>
                  {o.paymentStatus}
                </td>
                <td className="py-3 px-6 flex gap-2">
                  {o.status === "pending" && o.paymentStatus !== "paid" && (
                    <>
                      <button
                        onClick={() => handleCancel(o._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePay(o._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition"
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
