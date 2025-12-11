import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
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
      mapRef.current.flyTo([district.latitude, district.longitude], 12);
    }
  };

  return (
    <div className="min-h-[90vh] p-6">
      <h2 className="text-3xl font-bold mb-4">We are available in 64+ districts</h2>

      <form onSubmit={handleSearch} className="mb-4">
        <label className="input flex items-center border rounded px-2 py-1 w-full max-w-sm">
          <svg
            className="h-5 opacity-50 mr-2"
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
            placeholder="Search district"
            className="grow outline-none bg-transparent"
          />
        </label>
      </form>

      {loading ? (
        <p>Loading map...</p>
      ) : (
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={8}
          scrollWheelZoom={false}
           className='h-[800px]'
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
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Coverage;
