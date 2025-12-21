import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const fetchBooks = async () => {
  const res = await axios.get("http://localhost:5000/books");
  if (!res.data.success) throw new Error("Failed to fetch books");
  return res.data.books;
};

const SkeletonCard = () => (
  <div className="bg-white/10 rounded-lg shadow-md p-3 animate-pulse">
    <div className="w-full h-56 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 mb-1 w-3/4"></div>
    <div className="h-3 bg-gray-300 w-1/2"></div>
  </div>
);

const AllBooks = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default"); // default | low | high

  const { data: books, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    let result = books.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") result = result.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "high") result = result.sort((a, b) => (b.price || 0) - (a.price || 0));
    return result;
  }, [books, search, sort]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (isLoading)
    return (
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {error.message}
      </p>
    );

  return (
    <div className="p-6">
      
      <h1
        className="text-4xl sm:text-5xl font-extrabold text-center mt-5 mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-transparent bg-clip-text"
        data-aos="fade-up"
      >
        📚 Explore All Books
      </h1>

      {/* Search & Sort Controls */}
      <div
        className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full sm:max-w-xs text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full sm:max-w-xs text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="default">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {!filteredBooks.length ? (
        <p
          className="text-center mt-10 text-gray-400 text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          No books found.
        </p>
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((b, idx) => (
            <div
              key={b._id}
              className="bg-white/10 rounded-lg overflow-hidden shadow-md p-3 hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={100 + idx * 50}
            >
              <img
                src={b.image || "https://via.placeholder.com/200x280"}
                alt={b.title}
                className="w-full h-56 object-cover rounded-md"
              />
              <h3 className="font-semibold mt-2 text-lg">{b.title}</h3>
              <p className="text-xs text-gray-400">{b.author}</p>
              <p className="text-sm font-semibold mt-1">${b.price || 0}</p>

              <Link
                to={`/books/${b._id}`}
                className="btn btn-sm btn-primary mt-3 w-full"
              >
                Details
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default AllBooks;
