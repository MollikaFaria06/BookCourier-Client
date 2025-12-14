import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books?limit=6")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 6)))
      .catch((err) => console.error(err));
  }, []);

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
              src={b.cover}
              alt={b.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{b.title}</h3>
              <p className="text-xs text-gray-400">{b.author}</p>

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
