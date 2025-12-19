import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Invoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchInvoices = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch("http://localhost:5000/api/users/invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setInvoices(data.invoices);
        else toast.error(data.message);
      } catch (err) {
        toast.error("Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading invoices...</p>;
  if (!invoices.length) return <p className="text-center mt-10">No payments found.</p>;

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>Book</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(inv => (
          <tr key={inv._id}>
            <td>{inv.paymentId}</td>
            <td>{inv.bookTitle}</td>
            <td>${inv.amount}</td>
            <td>{new Date(inv.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Invoices;
