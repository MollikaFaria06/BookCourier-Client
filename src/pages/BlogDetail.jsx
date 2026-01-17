import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogsData from "../data/blogsData";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogsData.find((b) => b.id === parseInt(id));

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (!blog) {
    return (
      <p className="text-center text-red-600 dark:text-red-400 mt-20">
        Blog not found!
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">

      {/* Page Heading */}
      <h2
        data-aos="fade-down"
        className="text-center text-4xl font-bold mb-10 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700
        dark:text-white dark:bg-none"
      >
        Blog Details
      </h2>

      {/* Blog Image */}
      <img
        data-aos="zoom-in"
        src={`${blog.image}?auto=compress&cs=tinysrgb&w=900`}
        alt={blog.title}
        className="w-full h-full object-cover rounded-xl shadow-md"
      />

      {/* Blog Title */}
      <h1
        data-aos="fade-up"
        data-aos-delay="150"
        className="text-3xl font-bold mt-6 mb-4 text-purple-600"
      >
        {blog.title}
      </h1>

      {/* Blog Content */}
      <p
        data-aos="fade-up"
        data-aos-delay="300"
        className="text-gray-600 dark:text-gray-100 leading-relaxed whitespace-pre-line mb-8"
      >
        {blog.content}
      </p>

      {/* Back Button */}
      <Link
        data-aos="fade-right"
        data-aos-delay="400"
        to="/blogs"
        className="inline-block text-purple-600 dark:text-purple-400 hover:underline font-medium"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
};

export default BlogDetail;
