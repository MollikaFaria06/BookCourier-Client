import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBook(data.book);
        else Swal.fire("Error", "Book not found", "error");
      })
      .catch(() => Swal.fire("Error", "Error fetching book", "error"))
      .finally(() => setFetching(false));
  }, [id]);

  if (loading || fetching)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!book)
    return <p className="text-center mt-10 text-gray-500">Book not found.</p>;

  const handleOrder = async () => {
    if (!user) return Swal.fire("Error", "Please login first", "error");
    if (!phone || !address)
      return Swal.fire("Warning", "Phone & Address are required", "warning");

    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return Swal.fire("Error", "Firebase user not found", "error");

    const token = await currentUser.getIdToken();
    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      price: book.price || 0,
      name: currentUser.displayName || "Anonymous",
      email: currentUser.email,
      phone,
      address,
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      setBook({ ...book, status: "pending" });
      setShowModal(false);
      setPhone("");
      setAddress("");
      Swal.fire("Success", "Order placed successfully 🎉", "success");
    } catch {
      Swal.fire("Error", "Error placing order", "error");
    }
  };

  return (
    <>
      {/* Gradient Card */}
      <div className="px-4 py-10 flex justify-center">
        <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-br from-purple-800 via-pink-800 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-5 sm:p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-4">
              📚 Book Details
            </h1>

            <img
              src={book.image || "https://via.placeholder.com/400x300"}
              alt={book.title}
              className="w-full h-56 sm:h-64 object-cover rounded-xl mb-4 shadow"
            />

            <h2 className="text-xl sm:text-2xl font-bold">{book.title}</h2>
            <p className="text-pink-200">Author: {book.author}</p>

            <p className="mt-2 text-yellow-200">
              Status:{" "}
              <span className="font-semibold capitalize">{book.status}</span>
            </p>

            <p className="text-lg font-semibold mt-2 text-green-200">
              Price: ${book.price?.toFixed(2) || "0.00"}
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-5 w-full py-2 rounded-lg bg-white text-purple-700 font-semibold hover:bg-purple-100 transition disabled:opacity-60"
              disabled={book.status !== "published"}
            >
              {book.status === "published" ? "Order Now" : "Pending Order"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-black p-5 sm:p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-center">Place Order</h3>

            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="input input-bordered w-full mb-2 bg-gray-100"
            />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full mb-2 bg-gray-100"
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
              <button
                onClick={handleOrder}
                className="flex-1 py-2 rounded-lg bg-purple-800 text-white font-semibold hover:bg-purple-900 transition"
              >
                Place Order
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
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
