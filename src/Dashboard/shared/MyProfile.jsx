import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { FaEnvelope, FaUser, FaShieldAlt, FaClock } from "react-icons/fa";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      Swal.fire({
        title: "Uploading image...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
      });

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setPhoto(data.data.url); 
        Swal.close();
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to upload image", "error");
    }
  };

  //  Update Firebase profile with imgbb URL
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Updating profile...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    try {
      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });

      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to update profile",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* ================== User Info Section ================== */}
      <div className="bg-yellow-500 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm border-2 border-white">
              ✓
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl text-blue-800 font-bold mt-4">
            {name || user.name}
          </h2>
          <p className="text-gray-700">{user.email}</p>
          <span className="mt-2 px-4 py-1 bg-white rounded-full text-sm font-semibold text-teal-700">
            {user.role?.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-teal-200 p-2 rounded-full text-teal-700">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-sm text-gray-900">Email</p>
              <p className="font-semibold text-black">{user.email}</p>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-yellow-300 p-2 rounded-full text-yellow-800">
              <FaUser />
            </div>
            <div>
              <p className="text-sm text-gray-900">Name</p>
              <p className="font-semibold text-black">{name || user.name}</p>
            </div>
          </div>

          <div className="bg-cyan-100 rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-cyan-200 p-2 rounded-full text-cyan-700">
              <FaShieldAlt />
            </div>
            <div>
              <p className="text-sm text-gray-900">Role</p>
              <p className="font-semibold text-black">{user.role}</p>
            </div>
          </div>

          <div className="bg-orange-100 rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-orange-200 p-2 rounded-full text-orange-700">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-gray-900">Status</p>
              <p className="font-semibold text-black">
                {user.status || "Pending Verification"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Update Form ================== */}
      <div className="bg-purple-800 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl text-yellow-400 font-semibold mb-4">
          Update Profile
        </h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full text-black"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full text-black"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
