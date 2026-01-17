import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBookOpen, FaTruck, FaHeadset } from "react-icons/fa";

const servicesData = [
  {
    icon: <FaBookOpen className="text-4xl text-white mb-3" />,
    title: "Wide Book Collection",
    desc: "Thousands of books across genres, curated for every reader.",
  },
  {
    icon: <FaTruck className="text-4xl text-white mb-3" />,
    title: "Doorstep Delivery",
    desc: "Receive books at your home quickly and safely.",
  },
  {
    icon: <FaHeadset className="text-4xl text-white mb-3" />,
    title: "Customer Support",
    desc: "24/7 support to assist you with orders and queries.",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-500">
          Our Services
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          We provide convenient and reliable services to make your book buying experience seamless.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {servicesData.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="p-6 rounded-xl bg-gradient-to-r  from-yellow-500 to-purple-600 shadow-lg hover:scale-105 transform transition-transform duration-500"
          >
            <div className="flex flex-col items-center">
              {service.icon}
              <h3 className="text-xl font-semibold text-white mt-2">{service.title}</h3>
              <p className="text-gray-100 text-sm mt-1">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
