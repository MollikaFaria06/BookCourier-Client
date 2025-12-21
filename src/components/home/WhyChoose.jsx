import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  { title: "Fast Delivery", desc: "Same-day delivery in many cities.", icon: "🚚" },
  { title: "Huge Library", desc: "Wide selection across genres.", icon: "📚" },
  { title: "Easy Returns", desc: "Flexible return & pickup options.", icon: "♻️" },
];

const WhyChoose = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-12">
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl font-extrabold
                       bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400
                       text-transparent bg-clip-text mb-2">
          Why Choose BookCourier?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Reliable, convenient, and tailored for book lovers everywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            data-aos="fade-up"
            data-aos-delay={i * 150}
            className="p-6 rounded-xl bg-primary shadow-md transform transition-transform duration-500 hover:-translate-y-2"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-white">{f.title}</h3>
            <p className="text-sm text-gray-200 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
