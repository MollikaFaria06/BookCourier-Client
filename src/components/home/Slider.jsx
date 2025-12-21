import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80",
    title: "Discover bestsellers",
    desc: "Handpicked bestsellers delivered to your door.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200&q=80",
    title: "Rare & Classic",
    desc: "Find rare editions and timeless classics.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80",
    title: "Kids collection",
    desc: "A magical reading corner for children.",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[420px] sm:h-[520px] rounded-lg shadow-lg">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${s.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Normal white overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="px-6 py-8 sm:py-12 max-w-2xl text-white">
                  <h3 className="text-xl sm:text-3xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm sm:text-base max-w-xl">{s.desc}</p>
                  <Link
                    to="/books"
                    className="mt-4 inline-block px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-pink-700 transition"
                  >
                    See All Books
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute left-0 right-0 bottom-6 flex justify-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-primary" : "bg-white/60 hover:bg-white"
                }`}
                onClick={() => setCurrent(idx)}
                aria-label={`slide-${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
