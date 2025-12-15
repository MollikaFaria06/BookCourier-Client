// src/dashboard/librarian/AddBook.jsx
import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book added:", book);
    alert("Book added successfully!");
    // Here you can call API to save the book
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Book Name</label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            name="status"
            value={book.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
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
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Book Image</label>
          <input type="file" onChange={handleImageChange} />
          {book.image && (
            <img src={book.image} alt="Book" className="w-32 h-32 mt-2" />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
