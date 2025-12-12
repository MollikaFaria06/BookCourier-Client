import React from "react";

const features = [
  { title: "Fast Delivery", desc: "Same-day delivery in many cities.", icon: "🚚" },
  { title: "Huge Library", desc: "Wide selection across genres.", icon: "📚" },
  { title: "Easy Returns", desc: "Flexible return & pickup options.", icon: "♻️" },
];

const WhyChoose = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl  font-bold">Why choose BookCourier?</h2>
        <p className="text-gray-400">Reliable, convenient, and tailored for readers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="p-6 rounded-xl bg-primary shadow-md transform transition-transform duration-500 hover:-translate-y-2"
            style={{ animation: `fadeInUp .6s ${(i + 1) * 0.12}s both` }}
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-black">{f.title}</h3>
            <p className="text-sm text-gray-800 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default WhyChoose;
