import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/books", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setBooks(res.data.books))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    axios
      .patch(
        `http://localhost:5000/admin/books/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setBooks((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status } : b))
        );
      });
  };

  const deleteBook = (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    axios
      .delete(`http://localhost:5000/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setBooks((prev) => prev.filter((b) => b._id !== id)));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 Manage Books</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">#</th>
              <th className="p-3 border text-left">Title</th>
              <th className="p-3 border text-left">Author</th>
              <th className="p-3 border text-center">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >
                  No books found.
                </td>
              </tr>
            ) : (
              books.map((b, index) => (
                <tr
                  key={b._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border font-medium">{b.title}</td>
                  <td className="p-3 border">{b.author}</td>

                  <td className="p-3 border text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        b.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() =>
                        updateStatus(
                          b._id,
                          b.status === "published"
                            ? "unpublished"
                            : "published"
                        )
                      }
                      className={`px-3 py-1 rounded text-white text-sm ${
                        b.status === "published"
                          ? "bg-blue-500 hover:bg-green-600"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                    >
                      {b.status === "published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      onClick={() => deleteBook(b._id)}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
