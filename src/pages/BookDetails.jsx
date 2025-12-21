import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";

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

  // ================= ORDER =================
  const handleOrder = async () => {
    if (!user) return Swal.fire("Error", "Please login first", "error");
    if (!phone || !address)
      return Swal.fire("Warning", "Phone & Address are required", "warning");

    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser)
      return Swal.fire("Error", "Firebase user not found", "error");

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

  // ================= WISHLIST =================
  const handleWishlist = async () => {
    if (!user) return Swal.fire("Error", "Please login first", "error");

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const res = await axios.post(
        "http://localhost:5000/wishlist",
        { bookId: book._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        Swal.fire("Added!", "Book added to wishlist ❤️", "success");
      }
    } catch (err) {
      Swal.fire(
        "Oops!",
        err.response?.data?.message || "Already in wishlist",
        "warning"
      );
    }
  };

  return (
    <>
      <div className="px-4 py-10 flex justify-center">
        <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-br from-purple-700 via-pink-700 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
              📚 Book Details
            </h1>

            <img
              src={book.image || "https://via.placeholder.com/400x300"}
              alt={book.title}
              className="w-full h-64 sm:h-72 object-cover rounded-xl mb-5 shadow-lg"
            />

            <h2 className="text-2xl sm:text-3xl font-bold">{book.title}</h2>
            <p className="text-pink-200 mt-1">Author: {book.author}</p>

            <p className="mt-3 text-yellow-200">
              Status:{" "}
              <span className="font-semibold capitalize">
                {book.status}
              </span>
            </p>

            <p className="text-lg font-semibold mt-2 text-green-200">
              Price: ${book.price?.toFixed(2) || "0.00"}
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 w-full py-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-100 transition disabled:opacity-50"
              disabled={book.status !== "published"}
            >
              {book.status === "published"
                ? "Order Now"
                : "Pending Order"}
            </button>

            {/* ❤️ Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="mt-3 w-full py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-purple-700 transition"
            >
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-black p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <h3 className="text-2xl font-bold mb-5 text-center text-purple-700">
              Place Your Order
            </h3>

            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="input input-bordered w-full mb-3 bg-gray-100"
            />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full mb-3 bg-gray-100"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full mb-3"
              placeholder="Phone Number"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Address"
            />

            <div className="flex gap-3">
              <button
                onClick={handleOrder}
                className="flex-1 py-2 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
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
