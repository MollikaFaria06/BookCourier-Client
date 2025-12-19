import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/books"); // ঠিক করা
        const data = await res.json();
        if (data.success && data.books) {
          const latest = data.books
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
          setBooks(latest);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center py-8">Loading books...</p>;
  if (!books.length) return <p className="text-center py-8">No books available at the moment.</p>;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Latest Books</h2>
        <Link to="/books" className="text-sm link">View all</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((b) => (
          <article key={b._id} className="bg-white/5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img src={b.image || "https://via.placeholder.com/200x280"} alt={b.title} className="w-full h-56 object-cover"/>
            <div className="p-3">
              <h3 className="font-semibold text-sm">{b.title}</h3>
              <p className="text-xs text-gray-400">{b.author}</p>
              <p className="text-sm font-medium mt-1">${b.price?.toFixed(2) || "0.00"}</p>
              <Link to={`/books/${b._id}`} className="btn btn-sm btn-primary w-full mt-3 text-center">Details</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;
