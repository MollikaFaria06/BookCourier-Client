import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import toast from "react-hot-toast";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/invoices`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setInvoices(data.invoices);
        } else {
          toast.error(data.message || "Failed to load invoices");
        }
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
        toast.error("Failed to load invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading invoices...</p>;
  if (!invoices.length) return <p className="text-center mt-10 text-gray-500">No payments found.</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      {/* Transparent Gradient Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8
                     bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400
                     text-transparent bg-clip-text">
        💳 My Payments
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white text-gray-800">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Payment ID</th>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Book</th>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Amount</th>
              <th className="py-3 px-4 sm:px-6 text-left text-sm sm:text-base">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr
                key={inv._id}
                className={`border-b hover:bg-purple-100 transition ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-2 px-3 sm:py-3 sm:px-4 font-mono text-sm sm:text-base text-gray-800">
                  {inv.paymentId}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-gray-700">
                  {inv.bookTitle}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 font-semibold text-sm sm:text-base text-green-600">
                  ${inv.amount}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-gray-600">
                  {new Date(inv.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
