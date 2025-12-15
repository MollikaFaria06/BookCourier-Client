// src/dashboard/user/Invoices.jsx
import React, { useState } from "react";

const initialInvoices = [
  { id: 1, book: "Book 1", amount: 200, date: "2025-12-10" },
  { id: 2, book: "Book 2", amount: 150, date: "2025-12-11" },
];

const Invoices = () => {
  const [invoices] = useState(initialInvoices);

  return (
    <div>
      <h2 className="text-2xl text-secondary font-bold mb-4">Invoices</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border-2 text-black">Payment ID</th>
            <th className="p-2 border-2 text-black">Book</th>
            <th className="p-2 border-2 text-black">Amount</th>
            <th className="p-2 border-2 text-black">Date</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="p-2 border-2 text-black">{inv.id}</td>
              <td className="p-2 border-2 text-black">{inv.book}</td>
              <td className="p-2 border-2 text-black">${inv.amount}</td>
              <td className="p-2 border-2 text-black">{inv.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
