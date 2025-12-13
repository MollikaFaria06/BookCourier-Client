// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location?.state?.from || "/";

  const handleRegistration = async (data) => {
    setLoading(true);
    try {
      // 1. Create user
      const result = await registerUser(data.email, data.password);

      // 2. Upload profile photo if exists
      let photoURL = "";
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        const res = await axios.post(image_API_URL, formData);
        photoURL = res.data.data.url;
      }

      // 3. Update user profile
      await updateUserProfile({ displayName: data.name, photoURL });

      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Registration failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-dark">
      <div className="card w-full max-w-md shadow-2xl bg-purple-800">
        <div className="card-body">
          <h3 className="text-3xl font-bold text-center">Welcome to BookCourier</h3>
          <p className="text-center text-sm text-pink-200 mb-4">Please register your account</p>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            <div>
              <label className="label"><span className="label-text text-black">Name</span></label>
              <input type="text" placeholder="Your Name" {...register("name", { required: "Name is required" })} className="input text-black input-bordered w-full"/>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label"><span className="label-text text-black">Profile Photo</span></label>
              <input type="file" {...register("photo")} className="file-input w-full text-black"/>
            </div>

            <div>
              <label className="label"><span className="label-text text-black">Email</span></label>
              <input type="email" placeholder="your@email.com" {...register("email", { required: "Email is required" })} className="input text-black input-bordered w-full"/>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <label className="label"><span className="label-text text-black">Password</span></label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className="input text-black input-bordered w-full pr-10"
              />
              <button type="button" className="absolute inset-y-10 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500"/> : <EyeIcon className="h-5 w-5 text-gray-500"/>}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" className={`btn bg-primary w-full ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-2">
            Already have an account? <Link to="/auth/login" state={location.state} className="text-primary underline">Login</Link>
          </p>

          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
