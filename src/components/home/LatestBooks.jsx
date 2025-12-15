// src/components/LatestBooks.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        if (data.success) {
          setBooks(data.books.slice(0, 6)); // latest 6 books
        } else {
          console.error("Failed to fetch books:", data.message);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Loading books...</p>;
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Latest Books</h2>
        <Link to="/books" className="text-sm link">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((b) => (
          <article
            key={b._id}
            className="bg-white/5 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={b.cover || b.image} // backend এ cover না থাকলে image fallback
              alt={b.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{b.title}</h3>
              <p className="text-xs text-gray-400">{b.author}</p>
              <p className="text-sm font-medium mt-1">${b.price}</p>

              <div className="mt-3 flex items-center justify-between">
                <Link
                  to={`/books/${b._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};


export default LatestBooks;