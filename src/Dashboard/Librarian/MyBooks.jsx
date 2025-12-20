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
    const token = await user.getIdToken(true); // fresh token
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
    setBooks(books.map(b => (b._id === id ? { ...b, status: "unpublished" } : b)));
  } catch (err) {
    console.error("Unpublish failed:", err.response?.data || err.message);
  }
};


  const handleEdit = (id) => navigate(`/dashboard/librarian/edit-book/${id}`);

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
          {books.map(book => (
            <tr key={book._id}>
              <td className="p-2 border">
                <img src={book.image} alt={book.title} className="w-16 h-16" />
              </td>
              <td className="p-2 border">{book.title}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border">{book.status}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(book._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                {book.status === "published" && (
                  <button
                    onClick={() => handleUnpublish(book._id)}
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
