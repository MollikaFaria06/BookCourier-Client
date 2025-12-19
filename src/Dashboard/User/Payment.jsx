import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch order details
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!user) return null;
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:5000/api/users/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.orders.find((o) => o._id === id) || null;
    },
    enabled: !!user, // only run if user exists
  });

  // Payment mutation
  const payMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Unauthorized");
      const token = await user.getIdToken();
      await axios.put(`http://localhost:5000/api/users/pay/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Payment successful 🎉");
      // update cache so order status/paymentStatus is updated
      queryClient.setQueryData(["order", id], (old) => ({
        ...old,
        paymentStatus: "paid",
      }));
      queryClient.invalidateQueries(["myOrders", user?.email]);
      navigate("/dashboard/my-orders");
    },
    onError: () => {
      toast.error("Payment failed ❌");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!order) return <p className="text-center mt-10 text-red-500">Order not found ❌</p>;

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">💳 Complete Your Payment</h2>
      <div className="space-y-2 text-black">
        <p><strong>Book:</strong> {order.bookTitle}</p>
        <p><strong>Price:</strong> ${Number(order.price).toFixed(2)}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus || "unpaid"}</p>
      </div>
      <button
        onClick={() => payMutation.mutate()}
        disabled={order.paymentStatus === "paid" || order.status === "cancelled"}
        className={`mt-6 w-full py-2 px-4 rounded-md text-white ${
          order.paymentStatus === "paid" || order.status === "cancelled"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {order.paymentStatus === "paid" ? "Already Paid ✔" : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
