import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    const token = await user.getIdToken(true); // fresh token
    localStorage.setItem("token", token);
    return token;
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(res.data.book);
      } catch (err) {
        console.error("Fetch book failed:", err.response?.data || err.message);
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
    try {
      const token = await getToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/librarian/books/${id}`,
        book,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Book updated successfully!");
      navigate("/dashboard/librarian/my-books");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update book: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="status"
          value={book.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
