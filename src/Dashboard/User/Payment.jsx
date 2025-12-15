import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading order...</p>;
  if (!order) return <p className="text-center mt-10">Order not found</p>;

  const handlePayment = async () => {
    if (order.status === "cancelled") {
      toast.error("Cannot pay for cancelled order");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/pay`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Payment failed");

      toast.success("Payment successful 🎉");
      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-50 bg-base-100 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">Payment</h2>

      <p className="text-black"><span className="font-semibold">Book:</span> {order.bookTitle}</p>
      <p className="text-black"><span className="font-semibold ">Price:</span> ${order.price.toFixed(2)}</p>
      <p className="text-black"><span className="font-semibold ">Status:</span> {order.status}</p>
      <p className="text-black"><span className="font-semibold ">Payment Status:</span> {order.paymentStatus}</p>

      <button
        onClick={handlePayment}
        disabled={order.paymentStatus === "paid" || order.status === "cancelled"}
        className={`mt-6 w-full py-2 px-4 rounded-md text-white transition ${
          order.paymentStatus === "paid" || order.status === "cancelled"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {order.paymentStatus === "paid" ? "Already Paid" : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
