import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const MyWishlist = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const res = await axios.get("http://localhost:5000/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

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
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      await axios.delete(`http://localhost:5000/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setList((prev) => prev.filter((i) => i._id !== id));
      Swal.fire("Removed", "Book removed from wishlist", "success");
    } catch {
      Swal.fire("Error", "Failed to remove", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4">
      <h2
  className="text-3xl sm:text-4xl font-extrabold mb-10 text-center
             bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400
             text-transparent bg-clip-text"
>
  ❤️ Books Close to My Heart
</h2>


      {list.length === 0 ? (
        <p className="text-center text-gray-500">No books in wishlist.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-4 flex flex-col"
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
                  className="btn btn-sm btn-primary flex-1"
                >
                  View
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-sm btn-outline btn-error flex-1"
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
