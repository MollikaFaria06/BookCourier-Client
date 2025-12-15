import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBooks(data.books);
        }
      })
      .catch((err) => console.error(err));
  }, []);

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center mt-5">
       Explore Our Collection of Wonders 📖 
      </h1>
      


      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {books.map((b) => (
          <div key={b._id} className="bg-white/4 rounded-lg overflow-hidden shadow-md p-3">
            <img src={b.image} alt={b.title} className="w-full h-56 object-cover" />
            <h3 className="font-semibold mt-2">{b.title}</h3>
            <p className="text-xs text-gray-500">{b.author}</p>
            <p className={`text-sm mt-1 font-semibold ${getStatusColor(b.status)}`}>
              Status: {b.status || "published"}
            </p>
            <Link to={`/books/${b._id}`} className="btn btn-sm btn-primary mt-2">
              Details
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AllBooks;
