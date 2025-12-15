// src/dashboard/librarian/MyBooks.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialBooks = [
  {
    id: 1,
    name: "Book 1",
    author: "Author 1",
    image: "https://via.placeholder.com/100",
    status: "published",
  },
  {
    id: 2,
    name: "Book 2",
    author: "Author 2",
    image: "https://via.placeholder.com/100",
    status: "unpublished",
  },
];

const MyBooks = () => {
  const [books, setBooks] = useState(initialBooks);
  const navigate = useNavigate();

  const handleUnpublish = (id) => {
    setBooks(
      books.map((b) =>
        b.id === id ? { ...b, status: "unpublished" } : b
      )
    );
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/librarian/edit-book/${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Book Name</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="p-2 border">
                <img src={book.image} alt={book.name} className="w-16 h-16" />
              </td>
              <td className="p-2 border">{book.name}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border">{book.status}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(book.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                {book.status === "published" && (
                  <button
                    onClick={() => handleUnpublish(book.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Unpublish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
