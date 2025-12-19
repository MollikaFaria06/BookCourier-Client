import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${process.env.VITE_API_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(res.data.book);
      } catch (err) {
        console.error(err);
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
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(`${process.env.VITE_API_URL}/librarian/books/${id}`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book updated successfully!");
      navigate("/dashboard/librarian/my-books");
    } catch (err) {
      console.error(err);
      alert("Failed to update book.");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={book.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="text" name="author" value={book.author} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="number" name="price" value={book.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <select name="status" value={book.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <textarea name="description" value={book.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
