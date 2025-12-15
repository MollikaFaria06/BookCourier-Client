


import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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

    const toastId = toast.loading("Updating profile...");

    try {
      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated successfully", {
        id: toastId,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile", {
        id: toastId,
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
    <div className="max-w-md mx-auto bg-secondary p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex flex-col items-center mb-4">
        <img
          src={photo || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-2 object-cover"
        />
        <p className="text-sm opacity-70">{user.email}</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input text-black input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Profile Image</label>
          <input
            type="file"
            className="file-input file-input-bordered text-black w-full"
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
  );
};

export default MyProfile;