import React, { useEffect } from "react";
import CountUp from "react-countup";
import { FaBook, FaUsers, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  { id: 1, icon: <FaBook className="text-5xl mb-3" />, number: 25000, label: "Books Delivered" },
  { id: 2, icon: <FaUsers className="text-5xl mb-3" />, number: 4500, label: "Happy Customers" },
  { id: 3, icon: <FaMapMarkedAlt className="text-5xl mb-3" />, number: 120, label: "Coverage Cities" },
  { id: 4, icon: <FaClock className="text-5xl mb-3" />, number: 5, label: "Years in Service" },
];

const Statistics = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="py-20 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-yellow-500"
        >
          Our Achievements
        </h2>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
              className="flex flex-col items-center justify-center p-6 rounded-2xl
                         bg-gradient-to-r from-purple-600 to-pink-500
                         shadow-lg text-white transform transition-transform duration-500 hover:-translate-y-2"
            >
              {stat.icon}
              <p className="text-3xl font-bold mt-2">
                <CountUp end={stat.number} duration={2.5} separator="," />{stat.label === "Years in Service" ? "" : "+"}
              </p>
              <p className="mt-1 text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
