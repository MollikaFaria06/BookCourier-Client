import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    image: "",
    status: "published",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBook({ ...book, image: url });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${process.env.VITE_API_URL}/books`,
        book,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Book added successfully!");
      setBook({ name: "", author: "", image: "", status: "published", price: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Book Name" value={book.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="number" name="price" placeholder="Price" value={book.price} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <select name="status" value={book.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <textarea name="description" placeholder="Description" value={book.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="file" onChange={handleImageChange} />
        {book.image && <img src={book.image} alt="Book" className="w-32 h-32 mt-2" />}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
