import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePay = async () => {
    if (!user) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }

    try {
      const token = await user.getIdToken?.() || localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;


      const res = await axios.put(
  `${API_URL}/users/pay/${id}`,
  {},
  { headers: { Authorization: `Bearer ${token}` } }
);


      console.log("Payment response:", res.data);

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your order has been paid successfully!",
        confirmButtonColor: "#22c55e",
      });

      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error("Payment failed:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // handleCancel stays same
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-10 rounded-2xl shadow-2xl bg-gradient-to-br from-purple-800 via-pink-800 to-indigo-800 text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Complete Your Payment
        </h2>
        <p className="mb-8 text-gray-200 text-center">
          You are about to pay for your order. Click the button below to proceed.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePay}
            className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
          >
            Confirm Payment
          </button>
          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
