import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const faqsData = [
  {
    question: "What is this website about?",
    answer: "This website is a platform where you can browse books, check coverage, and access your dashboard."
  },
  {
    question: "How do I register?",
    answer: "Click on the Register button at the top-right corner and fill in your details to create an account."
  },
  {
    question: "I forgot my password. What should I do?",
    answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password."
  },
  {
    question: "Can I access the dashboard without login?",
    answer: "No, the dashboard is only accessible to registered and logged-in users."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we follow standard security practices to protect your personal data."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 mb-20">
      <h2 
        className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-500"
        data-aos="fade-down"
      >
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-500 hover:from-yellow-500 hover:via-pink-300 hover:to-yellow-400 transition-all duration-300"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white text-gray-800">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
