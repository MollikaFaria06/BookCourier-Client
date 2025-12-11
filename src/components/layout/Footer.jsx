import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-purple-900 text-white mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl flex items-center gap-2">
              <img
                className="w-10 h-10"
                src="https://img.icons8.com/?size=100&id=id6NGxHkL3QA&format=png&color=000000"
                alt="logo"
              />
              <h2>
                <span className="text-secondary">Book</span>
                <span className="text-primary">Courier</span>
              </h2>
            </span>
          </div>
          <p className="text-sm text-gray-300">
            BookCourier is your library-to-home delivery solution. Borrow, read, and return books without stepping outside.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link to="/" className="transition-colors hover:text-gray-200 block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="transition-colors hover:text-gray-200 block">
                Books
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="transition-colors hover:text-gray-200 block">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/coverage" className="transition-colors hover:text-gray-200 block">
                Coverage
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm sm:text-base">Email: fariamk007@gmail.com</p>
          <p className="text-sm sm:text-base">Phone: +880 1306518217</p>
          <p className="text-sm sm:text-base">Address: 123 Library St, Dhaka, Bangladesh</p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl sm:text-2xl">
            <a
              href="https://x.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="currentColor"
              >
                <path d="M459.4 151.7c.3 2.8.3 5.6.3 8.5 0 86.6-65.9 186.5-186.5 186.5-37.1 0-71.7-10.9-100.8-29.7 5.2.6 10.5.8 16 .8 30.8 0 59.1-10.5 81.6-28-28.8-.6-53-19.5-61.4-45.7 4 .6 7.7.9 11.7.9 5.6 0 11-.7 16.2-2-30-6.1-52.6-32.6-52.6-64.5v-.8c8.9 4.9 19.1 7.8 29.9 8.2-17.7-11.8-29.3-31.8-29.3-54.6 0-12 3.2-23.2 8.9-32.9 32.2 39.4 80.3 65.3 134.5 68-1.1-4.7-1.6-9.5-1.6-14.5 0-35.3 28.6-64 64-64 18.4 0 35.1 7.8 46.8 20.4 14.6-2.8 28.4-8.2 40.8-15.5-4.8 15.1-15.1 27.7-28.5 35.7 13-1.6 25.5-5 37-10.1-8.6 12.8-19.5 24.1-32.1 33.2z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-gray-200 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-200 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-gray-200 transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-sm border-t border-white/30">
        &copy; {new Date().getFullYear()} BookCourier. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
