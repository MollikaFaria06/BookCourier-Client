// src/dashboard/librarian/EditBook.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialBooks = [
  {
    id: 1,
    name: "Book 1",
    author: "Author 1",
    image: "https://via.placeholder.com/100",
    status: "published",
    price: 200,
    description: "Some description",
  },
];

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookToEdit = initialBooks.find((b) => b.id === parseInt(id));
  const [book, setBook] = useState(bookToEdit || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book updated:", book);
    alert("Book updated successfully!");
    navigate("/dashboard/librarian/my-books");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      {book ? (
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

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Book
          </button>
        </form>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default EditBook;
