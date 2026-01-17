import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import blogsData from "../../data/blogsData";
import AOS from "aos";
import "aos/dist/aos.css";

const Blogs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => setLoading(false), 1200);

    // Initialize AOS
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-400"
      >
        Latest Blogs
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md animate-pulse h-64"
              ></div>
            ))
          : blogsData.map((blog, index) => (
              <div
                key={blog.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
              >
                <img
                  src={`${blog.image}?auto=compress&cs=tinysrgb&w=600`}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    {blog.description}
                  </p>

                  <Link
                    to={`/blogs/${blog.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:via-pink-400 hover:to-purple-400 transition"
                  >
                    Read More
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Blogs;
