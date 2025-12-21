import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Book status updated to ${status}`,
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  const deleteBook = (id, title) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to delete "${title}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/admin/books/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then(() => {
            setBooks((prev) => prev.filter((b) => b._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The book has been deleted.",
              timer: 1500,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center
                   bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400
                   text-transparent bg-clip-text flex items-center justify-center gap-2"
      >
        📚 Admin Panel: Manage Your Books
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-teal-800 text-white">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
            <tr>
              <th className="p-2 md:p-3 border text-left">#</th>
              <th className="p-2 md:p-3 border text-left">Title</th>
              <th className="p-2 md:p-3 border text-left">Author</th>
              <th className="p-2 md:p-3 border text-center">Status</th>
              <th className="p-2 md:p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 md:p-6 text-gray-200">
                  No books found.
                </td>
              </tr>
            ) : (
              books.map((b, index) => (
                <tr
                  key={b._id}
                  className="hover:bg-pink-900 transition-colors"
                >
                  <td className="p-2 md:p-3 border">{index + 1}</td>
                  <td className="p-2 md:p-3 border font-medium">{b.title}</td>
                  <td className="p-2 md:p-3 border">{b.author}</td>

                  <td className="p-2 md:p-3 border text-center">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                        b.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-2 md:p-3 border text-center flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() =>
                        updateStatus(
                          b._id,
                          b.status === "published"
                            ? "unpublished"
                            : "published"
                        )
                      }
                      className={`px-2 md:px-3 py-1 rounded text-white text-xs md:text-sm ${
                        b.status === "published"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {b.status === "published" ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => deleteBook(b._id, b.title)}
                      className="px-2 md:px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm"
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
