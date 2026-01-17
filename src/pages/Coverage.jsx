import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import AOS from "aos";
import "aos/dist/aos.css";

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    fetch("/serviceCenter.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.toLowerCase();
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location)
    );

    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 12, {
        duration: 1.5,
      });
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">

      {/* TITLE */}
      <h2
        className="text-4xl sm:text-5xl font-extrabold text-center
        bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
        text-transparent bg-clip-text mb-8"
        data-aos="fade-down"
      >
        Explore Our Coverage Across 64+ Districts
      </h2>

      {/* SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <label className="flex items-center w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 px-4 py-2 hover:shadow-xl transition">
          <svg
            className="h-5 w-5 mr-3 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>

          <input
            type="search"
            name="location"
            placeholder="Search by district"
            className="flex-grow outline-none text-gray-700 placeholder-gray-400"
          />
        </label>
      </form>

      {/* MAP */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        {loading ? (
          <p className="text-center py-40 text-gray-500">Loading map...</p>
        ) : (
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={8}
            scrollWheelZoom={false}
            className="w-full h-[600px] sm:h-[700px] lg:h-[800px]"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, idx) => (
              <Marker
                key={idx}
                position={[center.latitude, center.longitude]}
              >
                <Popup className="text-sm">
                  <strong className="text-purple-600">
                    {center.district}
                  </strong>
                  <br />
                  Service Area: {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Coverage;
