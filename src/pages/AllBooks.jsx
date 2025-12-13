import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.filter((b) => b.status === "published")))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((b) => (
        <div key={b._id} className="bg-white/5 rounded-lg overflow-hidden shadow-md">
          <img src={b.cover} alt={b.title} className="w-full h-56 object-cover" />
          <div className="p-3">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-xs text-gray-500">{b.author}</p>
            <Link to={`/books/${b._id}`} className="btn btn-sm btn-primary mt-2">
              Details
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AllBooks;
