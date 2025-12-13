import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = ({ user }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 mt-10 max-w-lg mx-auto bg-secondary rounded-lg">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-72 object-cover mb-4 rounded"
      />

      <h2 className="text-2xl text-black font-bold">{book.title}</h2>
      <p className="text-gray-700">{book.author}</p>

      
      <p className="mt-2 text-blue-800">
        Status:{" "}
        <span
          className={`font-semibold  ${
            book.status === "published" ? "text-orange-700" : "text-green-400"
          }`}
        >
          {book.status}
        </span>
      </p>

      <p className="text-lg text-green-700 font-semibold mt-2">
        Price: ${book.price.toFixed(2)}
      </p>

      <button className="btn btn-primary mt-4 w-full">
        Order Now
      </button>
    </div>
  );
};

export default BookDetails;
