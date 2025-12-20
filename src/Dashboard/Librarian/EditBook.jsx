import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    const token = await user.getIdToken(true);
    localStorage.setItem("token", token);
    return token;
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBook(res.data.book);
      } catch (err) {
        console.error("Fetch book failed:", err.response?.data || err.message);
        Swal.fire("Error", "Failed to fetch book details", "error");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Updating book...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    try {
      const token = await getToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/librarian/books/${id}`,
        book,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Book updated successfully!", "success");
      navigate("/dashboard/librarian/my-books");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to update book",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <p className="text-center mt-10">Loading...</p>;

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-black border-2 border-white/50 bg-white/90 " +
    "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition";

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
          ✏️ Edit Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <select
              name="status"
              value={book.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 rounded-xl shadow-lg transition duration-300"
          >
            {loading ? "Updating..." : "Update Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
