import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const getToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    const token = await user.getIdToken(true);
    localStorage.setItem("token", token);
    return token;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/librarian/my-books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data.books);
      } catch (err) {
        console.error("Fetch books failed:", err.response?.data || err.message);
      }
    };
    fetchBooks();
  }, []);

  const handleUnpublish = async (id) => {
    try {
      const token = await getToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/librarian/books/${id}`,
        { status: "unpublished" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks(books.map((b) => (b._id === id ? { ...b, status: "unpublished" } : b)));
    } catch (err) {
      console.error("Unpublish failed:", err.response?.data || err.message);
    }
  };

  const handleEdit = (id) => navigate(`/dashboard/librarian/edit-book/${id}`);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-purple-700 text-center">
        My Books
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full bg-white text-gray-800">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3 text-left uppercase tracking-wider">Image</th>
              <th className="p-3 text-left uppercase tracking-wider">Book Name</th>
              <th className="p-3 text-left uppercase tracking-wider">Author</th>
              <th className="p-3 text-left uppercase tracking-wider">Status</th>
              <th className="p-3 text-left uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr
                  key={book._id}
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow"
                    />
                  </td>
                  <td className="p-3 font-medium">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        book.status === "published" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(book._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-sm text-sm transition"
                    >
                      Edit
                    </button>
                    {book.status === "published" && (
                      <button
                        onClick={() => handleUnpublish(book._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm text-sm transition"
                      >
                        Unpublish
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
