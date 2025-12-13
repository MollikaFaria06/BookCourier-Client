import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();

  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Checking login...</p>;
  if (!book) return <p className="text-center mt-10">Loading book...</p>;

  const handleOrder = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      price: book.price,
      name: user.displayName || "",
      email: user.email || "",
      phone,
      address,
    };

    try {
      // Save order
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to place order");

      // Update book status to "pending"
      await fetch(`http://localhost:5000/api/books/${book._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending" }),
      });

      setShowModal(false);
      setPhone("");
      setAddress("");

      setBook(prev => ({ ...prev, status: "pending" }));

      toast.success("Order placed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error placing order");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* BOOK DETAILS */}
      <div className="p-6 mt-10 max-w-lg mx-auto bg-purple-900 rounded-lg">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-72 object-cover mb-4 rounded"
        />
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <p className="text-pink-400">{book.author}</p>
        <p className="mt-2 text-yellow-400">
          Status:{" "}
          <span
            className={`font-semibold ${
              book.status === "published" ? "text-yellow-400" : "text-blue-400"
            }`}
          >
            {book.status}
          </span>
        </p>
        <p className="text-lg text-green-400 font-semibold mt-2">
          Price: ${book.price.toFixed(2)}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary mt-4 w-full"
        >
          Order Now
        </button>
      </div>

      {/* ORDER MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-secondary text-black p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Place Order</h3>

            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full mb-2"
              placeholder="Name"
            />

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full mb-2"
              placeholder="Email"
            />

            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="input input-bordered w-full mb-2"
              placeholder="Phone Number"
            />

            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full mb-3"
              placeholder="Address"
            />

            <div className="flex gap-2">
              <button onClick={handleOrder} className="btn btn-primary flex-1">
                Place Order
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
