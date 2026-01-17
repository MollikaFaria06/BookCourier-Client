import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="py-16" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ABOUT MAIN */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* Left: Image */}
          <div
            className="md:w-1/2 flex justify-center"
            data-aos="fade-right"
          >
            <img
              src="https://24-7couriers.co.uk/img/carousel/book-a-courier/book_a_courier_960.webp"
              alt="About BookCourier"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>

          {/* Right: Text */}
          <div
            className="md:w-1/2 space-y-6"
            data-aos="fade-left"
          >
            <h2 className="text-4xl font-extrabold text-purple-800 dark:text-yellow-400">
              📚 About BookCourier
            </h2>

            <p className="text-gray-500 dark:text-gray-300 text-lg">
              BookCourier is a modern online platform designed to simplify how people discover,
              order, and manage books. We combine technology and logistics to ensure books reach
              readers quickly and safely.
            </p>

            <p className="text-gray-500 dark:text-gray-300 text-lg">
              Whether you're a student, professional, or book lover, BookCourier provides a smooth
              experience—from browsing books to doorstep delivery.
            </p>

            <p className="text-gray-500 dark:text-gray-300 text-lg">
              Our mission is to spread knowledge by making books accessible, affordable, and easy to deliver.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div
          className="grid md:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-xl font-bold text-purple-700 dark:text-yellow-300 mb-2">
              🚚 Fast Delivery
            </h3>
            <p className="text-gray-500 dark:text-gray-300">
              We ensure timely and reliable book delivery across service areas with real-time updates.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-xl font-bold text-purple-700 dark:text-yellow-300 mb-2">
              🔐 Secure Platform
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your data and transactions are protected with secure authentication and authorization.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-xl font-bold text-purple-700 dark:text-yellow-300 mb-2">
              📖 Book Focused Service
            </h3>
            <p className="text-gray-500 dark:text-gray-300">
              Unlike generic couriers, BookCourier is optimized specifically for book handling.
            </p>
          </div>
        </div>

        {/* TERMS & CONDITIONS */}
        <div
          className=" p-8 rounded-xl shadow"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold text-purple-800 dark:text-yellow-400 mb-4">
            📜 Terms & Conditions (Summary)
          </h3>

          <ul className="list-disc pl-5 space-y-3 text-gray-500 dark:text-gray-300">
            <li>Users must provide accurate delivery and account information.</li>
            <li>BookCourier is not responsible for delays caused by natural disasters or external factors.</li>
            <li>Orders once confirmed cannot be cancelled after dispatch.</li>
            <li>User data is handled securely and never shared without consent.</li>
            <li>Any misuse of the platform may result in account suspension.</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default About;
