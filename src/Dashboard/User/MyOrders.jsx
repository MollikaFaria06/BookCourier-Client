import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      if (!user) return [];
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:5000/api/users/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.orders;
    },
    enabled: !!user,
  });

  const updateOrder = useMutation({
    mutationFn: async ({ id, action }) => {
      const token = await user.getIdToken();
      await axios.put(`http://localhost:5000/api/users/${action}/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id, action };
    },
    onSuccess: ({ id, action }) => {
      queryClient.setQueryData(["myOrders", user?.email], (old) =>
        old.map((o) =>
          o._id === id
            ? {
                ...o,
                status: action === "cancel" ? "cancelled" : o.status,
                paymentStatus: action === "pay" ? "paid" : o.paymentStatus,
              }
            : o
        )
      );
      toast.success(`Order ${action === "cancel" ? "cancelled" : "paid"} successfully`);
    },
    onError: () => toast.error("Failed to update order"),
  });

  if (isLoading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders found</p>;

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th>Book</th>
          <th>Price</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o._id}>
            <td>{o.bookTitle}</td>
            <td>${o.price}</td>
            <td>{o.status}</td>
            <td>{o.paymentStatus}</td>
            <td className="flex gap-2">
              {o.status === "pending" && o.paymentStatus !== "paid" && (
                <>
                  <button className="btn btn-sm btn-error" onClick={() => updateOrder.mutate({ id: o._id, action: "cancel" })}>Cancel</button>
                  <button className="btn btn-sm btn-success" onClick={() => updateOrder.mutate({ id: o._id, action: "pay" })}>Pay Now</button>
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
