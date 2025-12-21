import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const CoverageMap = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("/serviceCenter.json")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setCenters(data);
      })
      .catch(() => {
        if (mounted) {
          setCenters([
            { city: "Dhaka", district: "Dhaka", latitude: 23.81, longitude: 90.41 },
          ]);
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const city = e.target.city.value.trim();
    const email = e.target.email.value.trim();

    if (!city || !email) {
      toast.error("Please enter both city and email");
      return;
    }

    toast.success(`Request submitted for ${city}`);
    e.target.reset();
  };

  return (
    <section className="py-12 relative">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Meaningful Heading */}
      <h2
        data-aos="fade-up"
        className="text-3xl sm:text-4xl font-extrabold mb-6 text-center
                   text-transparent bg-clip-text
                   bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"
      >
        Our Service Coverage & Request Your City
      </h2>

      <div className="grid grid-cols-1  gap-8 mt-12">
        <div data-aos="fade-up" className="lg:col-span-2 bg-white/5 rounded-xl overflow-hidden h-80 sm:h-96 shadow-inner">
          <iframe
            title="coverage-map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3651.902317118028!2d90.3660419153881!3d23.780887394620998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1610000000000"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <aside data-aos="fade-up" className="bg-secondary p-5 rounded-xl shadow-md">
          <h3 className="font-semibold mb-3 text-xl">Cities We Serve</h3>

          {loading ? (
            <p className="text-gray-300">Loading cities...</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {centers.slice(0, 40).map((c) => (
                  <button
                    key={c.district}
                    data-aos="fade-up"
                    data-aos-delay="50"
                    className="px-3 py-1 rounded-full bg-primary text-sm text-white hover:scale-105 hover:shadow-lg transition-transform duration-300"
                    onClick={() =>
                      toast.info(
                        `${c.city || c.district}\nCovered areas: ${(c.covered_area || [])
                          .slice(0, 6)
                          .join(", ")}`
                      )
                    }
                  >
                    {c.district}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-800 mb-2">
                Click a city to see covered areas. Want your city covered? Use the request form below.
              </p>

              <form className="mt-4 space-y-2" onSubmit={handleRequest}>
                <input
                  name="city"
                  placeholder="Your city"
                  className="input input-sm w-full bg-base-200"
                />
                <input
                  name="email"
                  placeholder="Email"
                  className="input input-sm w-full bg-base-200"
                />
                <button className="btn btn-primary w-full">Request Coverage</button>
              </form>
            </>
          )}
        </aside>
      </div>
    </section>
  );
};

export default CoverageMap;
