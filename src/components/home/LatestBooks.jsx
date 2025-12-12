import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const mockBooks = [
  { id: "b1", title: "The Silent Patient", author: "Alex Michaelides", cover: "https://picsum.photos/seed/b1/300/420" },
  { id: "b2", title: "Educated", author: "Tara Westover", cover: "https://picsum.photos/seed/b2/300/420" },
  { id: "b3", title: "The Alchemist", author: "Paulo Coelho", cover: "https://picsum.photos/seed/b3/300/420" },
  { id: "b4", title: "Atomic Habits", author: "James Clear", cover: "https://picsum.photos/seed/b4/300/420" },
];

const LatestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetch("/api/books?limit=6")
      .then((res) => {
        if (!res.ok) throw new Error("no api");
        return res.json();
      })
      .then((data) => {
        if (mounted) setBooks(data.slice(0, 6));
      })
      .catch(() => {
        // fallback
        if (mounted) setBooks(mockBooks);
      });

    return () => (mounted = false);
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
          <article key={b.id} className="bg-white/5 rounded-lg overflow-hidden shadow-md">
            <img src={b.cover} alt={b.title} className="w-full h-56 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{b.title}</h3>
              <p className="text-xs text-gray-300">{b.author}</p>
              <div className="mt-3 flex items-center justify-between">
                <Link to={`/books/${b.id}`} className="btn btn-sm btn-primary">
                  Details
                </Link>
                <button className="btn btn-sm btn-ghost">Borrow</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;
