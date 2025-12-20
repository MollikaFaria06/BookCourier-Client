import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePay = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);

      await axios.put(
        `http://localhost:5000/users/pay/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your order has been paid successfully!",
        confirmButtonColor: "#22c55e",
      });

      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, go back",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "info",
        title: "Payment Cancelled",
        text: "You have cancelled the payment.",
        confirmButtonColor: "#3b82f6",
      });
      navigate("/dashboard/my-orders");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-700">
          Complete Your Payment
        </h2>
        <p className="mb-8 text-gray-600">
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
            onClick={handleCancel}
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
