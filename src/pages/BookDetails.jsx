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

  // Fetch single book
  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBook(data.book);
        else toast.error("Book not found");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching book");
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Checking login...</p>;
  if (!book) return <p className="text-center mt-10">Loading book...</p>;

  // Place order
  const handleOrder = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!phone || !address) {
      toast.error("Phone & Address required");
      return;
    }

    const orderData = {
      bookId: book._id,        
      bookTitle: book.title,   
      price: book.price || 0,  
      name: user.name || user.displayName || "Anonymous",
      email: user.email || "",
      phone,
      address,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      const updatedBook = { ...book, status: "pending" };
      setBook(updatedBook); // Update local state
      setShowModal(false);
      setPhone("");
      setAddress("");
      toast.success("Order placed successfully 🎉");

    } catch (error) {
      console.error(error);
      toast.error("Error placing order");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="p-6 mt-10 max-w-lg mx-auto bg-purple-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-white text-center mb-4">
    📚 Book Details</h1>
        <img src={book.image} alt={book.title} className="w-full h-72 object-cover mb-4 rounded" />
        <h2 className="text-2xl font-bold text-white">{book.title}</h2>
        <p className="text-pink-400">Author: {book.author}</p>

        <p className="mt-2 text-yellow-400">
          Status:{" "}
          <span className="font-semibold">{book.status}</span>
        </p>

        <p className="text-lg text-green-400 font-semibold mt-2">
          Price: ${book.price?.toFixed(2)}
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary mt-4 w-full"
        >
          {book.status === "published" ? "Order Now" : "Pending Order"}
        </button>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Place Order</h3>

            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="input input-bordered w-full mb-2 bg-gray-100 cursor-not-allowed"
              placeholder="Name"
            />

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full mb-2 bg-gray-100 cursor-not-allowed"
              placeholder="Email"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full mb-2"
              placeholder="Phone Number"
            />

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full mb-3"
              placeholder="Address"
            />

            <div className="flex gap-2">
              <button onClick={handleOrder} className="btn btn-primary flex-1">
                Place Order
              </button>
              <button onClick={() => setShowModal(false)} className="btn btn-outline flex-1">
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
