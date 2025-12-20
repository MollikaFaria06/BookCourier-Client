import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePay = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken(true);

    await axios.put(
      `http://localhost:5000/users/pay/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Payment successful!");
    navigate("/dashboard/my-orders");
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment for Order</h2>
      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
