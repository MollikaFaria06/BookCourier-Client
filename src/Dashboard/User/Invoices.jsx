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
        const res = await fetch("http://localhost:5000/users/invoices", {
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

  if (loading) return <p className="text-center mt-10">Loading invoices...</p>;
  if (!invoices.length)
    return <p className="text-center mt-10">No payments found.</p>;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        My Payments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Payment ID</th>
              <th className="py-3 px-6 text-left">Book</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv._id}
                className="bg-base-300 hover:bg-purple-100 transition"
              >
                <td className="py-3 px-6 font-medium text-gray-800">
                  {inv.paymentId}
                </td>
                <td className="py-3 px-6 text-gray-700">{inv.bookTitle}</td>
                <td className="py-3 px-6 font-semibold text-green-600">
                  ${inv.amount}
                </td>
                <td className="py-3 px-6 text-gray-600">
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
