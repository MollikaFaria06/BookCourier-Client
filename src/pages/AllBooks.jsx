import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooks = async () => {
  const res = await axios.get("http://localhost:5000/books");
  if (!res.data.success) throw new Error("Failed to fetch books");
  return res.data.books;
};

const SkeletonCard = () => (
  <div className="bg-white/4 rounded-lg shadow-md p-3 animate-pulse">
    <div className="w-full h-56 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 mb-1 w-3/4"></div>
    <div className="h-3 bg-gray-300 w-1/2"></div>
    <div className="h-4 bg-gray-300 mt-2 w-1/3"></div>
  </div>
);

const AllBooks = () => {
  const { data: books, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  console.log("Books from API:", books); // debug

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-green-500";
      case "published":
        return "text-yellow-400";
      default:
        return "text-red-500";
    }
  };

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

  if (!books || books.length === 0)
    return <p className="text-center mt-10">No books available.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center mt-5">
        Explore Our Collection of Wonders 📖
      </h1>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {books.map((b) => (
          <div
            key={b._id}
            className="bg-white/4 rounded-lg overflow-hidden shadow-md p-3"
          >
            <img
              src={b.image || "https://via.placeholder.com/150"}
              alt={b.title || "Book cover"}
              className="w-full h-56 object-cover"
            />
            <h3 className="font-semibold mt-2">{b.title}</h3>
            <p className="text-xs text-gray-500">{b.author}</p>
            <p
              className={`text-sm mt-1 font-semibold ${
                getStatusColor(b.status || "published")
              }`}
            >
              Status: {b.status || "published"}
            </p>
            <Link
              to={`/books/${b._id}`}
              className="btn btn-sm btn-primary mt-2"
            >
              Details
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AllBooks;
