import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2"; // <-- import SweetAlert2
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // SweetAlert loading
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
    }

    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPhoto(imageURL);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* ================== User Info Section ================== */}
      <div className="bg-yellow-500 rounded-xl shadow-lg p-6 text-center relative">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm border-2 border-white">
              ✓
            </span>
          </div>
          <h2 className="text-3xl text-blue-800 font-bold mt-4">{name || user.name}</h2>
          <p className="text-gray-700 mt-1">{user.email}</p>
          <span className="mt-2 px-4 py-1 bg-white rounded-full text-sm font-semibold text-teal-700">
            {user.role.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-teal-200 p-2 rounded-full text-teal-700">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-sm text-gray-900">Email Address</p>
              <p className="font-semibold text-black">{user.email}</p>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-yellow-300 p-2 rounded-full text-yellow-800">
              <FaUser />
            </div>
            <div>
              <p className="text-sm text-gray-900">Display Name</p>
              <p className="font-semibold text-black">{name || user.name}</p>
            </div>
          </div>

          <div className="bg-cyan-100 rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-cyan-200 p-2 rounded-full text-cyan-700">
              <FaShieldAlt />
            </div>
            <div>
              <p className="text-sm text-gray-900">User Role</p>
              <p className="font-semibold text-black">{user.role}</p>
            </div>
          </div>

          <div className="bg-orange-100 rounded-lg shadow p-4 flex items-center gap-3">
            <div className="bg-orange-200 p-2 rounded-full text-orange-700">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-gray-900">Account Status</p>
              <p className="font-semibold text-black">{user.status || "Pending Verification"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Update Form Section ================== */}
      <div className="bg-purple-800 rounded-xl shadow-lg p-6">
        <h3 className="text-3xl text-yellow-400 font-semibold mb-4">Update Profile</h3>
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
