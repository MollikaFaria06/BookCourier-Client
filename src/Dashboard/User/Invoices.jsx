// src/dashboard/user/Invoices.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Invoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchInvoices = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders?email=${user.email}`);
        const data = await res.json();

        // Filter only paid orders
        const paidOrders = data.filter(order => order.paymentStatus === "paid");

        setInvoices(paidOrders);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading invoices...</p>;

  if (invoices.length === 0) return <p className="text-center mt-10">No payments found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-secondary font-bold mb-4">Invoices</h2>
      <table className="w-full border border-gray-400 ">
        <thead className="bg-purple-800">
          <tr>
            <th className="p-2 border-2 border-black text-white">Payment ID</th>
            <th className="p-2 border-2 border-black text-white">Book</th>
            <th className="p-2 border-2 border-black text-white">Amount</th>
            <th className="p-2 border-2 border-black text-white">Date</th>
          </tr>
        </thead>
        <tbody className="bg-yellow-400">
          {invoices.map((inv) => (
            <tr key={inv._id}>
              <td className="p-2 border-2 text-black">{inv._id}</td>
              <td className="p-2 border-2 text-black">{inv.bookTitle}</td>
              <td className="p-2 border-2 text-black">${inv.price.toFixed(2)}</td>
              <td className="p-2 border-2 text-black">{new Date(inv.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
