// src/dashboard/shared/MyProfile.jsx
import React, { useState } from "react";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "Faria Alam",
    email: "faria@example.com",
    image: "https://via.placeholder.com/150",
  });

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser({ ...user, name, image });
    alert("Profile updated!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-blue-900 p-6 rounded shadow">
      <h2 className="text-2xl text-secondary font-bold mb-4">My Profile</h2>
      <div className="flex flex-col items-center mb-4">
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 text-pink-200  rounded-full mb-2"
        />
        <span className="text-pink-200">{user.email}</span>
      </div>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-pink-200  font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-pink-200  border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-pink-200 font-semibold mb-1">Profile Image</label>
          <input className="file-input text-black w-full" type="file" onChange={handleImageChange} />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
