import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const BookDetails = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });

    setFetching(true);
    fetch(`https://book-courier-server-hazel.vercel.app/books/${id}`)
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
      const res = await fetch(
        "https://book-courier-server-hazel.vercel.app/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

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
        "https://book-courier-server-hazel.vercel.app/wishlist",
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
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      {/* ================= PAGE TITLE ================= */}
      <h1
        className="text-5xl sm:text-6xl font-extrabold text-center mb-12
                   bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-600 to-yellow-500"
        data-aos="fade-down"
      >
        Book Details
      </h1>

      {/* ================= BOOK CARD ================= */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        data-aos="fade-up"
      >
        {/* Left: Book Image */}
        <div>
          <img
            src={book.image || "https://via.placeholder.com/400x300"}
            alt={book.title}
            className="w-full h-72 sm:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Book Info */}
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-600 to-yellow-500">
            {book.title}
          </h2>
          <p className="text-gray-500 text-lg">
            Author: <span className="font-semibold">{book.author}</span>
          </p>
          <p className="text-yellow-500 font-semibold">
            Status: <span className="capitalize">{book.status}</span>
          </p>
          <p className="text-green-500 font-semibold text-xl">
            Price: ${book.price?.toFixed(2) || "0.00"}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
              disabled={book.status !== "published"}
            >
              {book.status === "published" ? "Order Now" : "Pending Order"}
            </button>
            <button
              onClick={handleWishlist}
              className="flex-1 py-3 rounded-xl border border-yellow-400 text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition"
            >
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* ================= ORDER MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 text-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <h3 className="text-2xl font-bold mb-5 text-center text-yellow-400">
              Place Your Order
            </h3>

            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="input input-bordered w-full mb-3 bg-gray-700 text-white"
            />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full mb-3 bg-gray-700 text-white"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full mb-3 bg-gray-700 text-white"
              placeholder="Phone Number"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full mb-4 bg-gray-700 text-white"
              placeholder="Address"
            />

            <div className="flex gap-3">
              <button
                onClick={handleOrder}
                className="flex-1 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
              >
                Place Order
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
