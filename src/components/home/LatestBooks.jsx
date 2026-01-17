import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Skeleton loader
const SkeletonCard = () => (
  <div className="bg-white/10 rounded-lg overflow-hidden shadow-md p-3 animate-pulse">
    <div className="w-full h-56 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 mb-1 w-3/4"></div>
    <div className="h-3 bg-gray-300 w-1/2"></div>
  </div>
);

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://book-courier-server-hazel.vercel.app/books");
        const data = await res.json();
        if (data.success) {
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

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mt-10 mb-12">
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text
                     bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"
          data-aos="fade-up"
        >
          📚 Explore the Latest Arrivals
        </h2>

        <Link
          to="/books"
          className="inline-block px-4 py-2 text-sm font-semibold
                     bg-gradient-to-r from-purple-500 to-pink-500
                     text-white rounded-lg shadow-md hover:scale-105
                     transition-transform duration-300"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : books.map((b, idx) => (
              <article
                key={b._id}
                className="bg-white/10 rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <img
                  src={b.image || "https://via.placeholder.com/200x280"}
                  alt={b.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm">{b.title}</h3>
                  <p className="text-xs text-gray-400">{b.author}</p>
                  <p className="text-sm font-medium mt-1">${b.price || 0}</p>
                  <Link
                    to={`/books/${b._id}`}
                    className="btn btn-sm btn-primary w-full mt-3"
                  >
                    Details
                  </Link>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
};

export default LatestBooks;
