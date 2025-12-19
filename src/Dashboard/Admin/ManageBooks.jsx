import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/books", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setBooks(res.data.books))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    axios.patch(`http://localhost:5000/admin/books/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => {
      setBooks(prev => prev.map(b => b._id === id ? { ...b, status } : b));
    });
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/admin/books/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => setBooks(prev => prev.filter(b => b._id !== id)));
  };

  return (
    <div>
      <h2>Manage Books</h2>
      <table>
        <thead>
          <tr><th>Title</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => updateStatus(b._id, b.status === 'published' ? 'unpublished' : 'published')}>
                  {b.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => deleteBook(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
