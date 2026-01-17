import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const MyWishlist = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const res = await axios.get(
        "https://book-courier-server-hazel.vercel.app/wishlist",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setList(res.data.list);
      }
    } catch {
      Swal.fire("Error", "Failed to load wishlist", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      await axios.delete(
        `https://book-courier-server-hazel.vercel.app/wishlist/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setList((prev) => prev.filter((i) => i._id !== id));
      Swal.fire("Removed", "Book removed from wishlist", "success");
    } catch {
      Swal.fire("Error", "Failed to remove", "error");
    }
  };

  // Skeleton loader
  const renderSkeleton = () => {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-xl h-72"
            ></div>
          ))}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2
        className="text-3xl sm:text-4xl font-extrabold mb-10 text-center
             bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400
             text-transparent bg-clip-text"
      >
        Books Close to My Heart ❤️
      </h2>

      {loading ? (
        renderSkeleton()
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No books in wishlist.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-4 flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={item.book?.image || "https://via.placeholder.com/300"}
                alt={item.book?.title}
                className="h-48 w-full object-cover rounded mb-3"
              />
              <h3 className="text-xl text-black font-bold">{item.book?.title}</h3>
              <p className="text-gray-600">{item.book?.author}</p>

              <div className="mt-auto flex gap-2 pt-4">
                <Link
                  to={`/books/${item.book?._id}`}
                  className="flex-1 py-2 text-center rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-500 transition"
                >
                  View
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="flex-1 py-2 rounded-lg border border-black text-black hover:bg-pink-400 hover:text-black transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
