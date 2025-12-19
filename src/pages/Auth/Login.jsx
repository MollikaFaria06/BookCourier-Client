import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginWithBackend } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from =
    location?.state?.from?.pathname &&
    !location.state.from.pathname.startsWith("/auth")
      ? location.state.from.pathname
      : "/";

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const user = await loginWithBackend(data.email, data.password);

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.name || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-dark">
      <div className="card w-full max-w-md shadow-2xl bg-purple-800">
        <div className="card-body">
          <h3 className="text-3xl font-bold text-center">Welcome Back</h3>
          <p className="text-center text-sm text-pink-200 mb-4">
            Please login to your account
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                {...register("email", { required: "Email is required" })}
                className="input text-black input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className="input text-black input-bordered w-full pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`btn bg-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-2">
            New to BookCourier?{" "}
            <Link
              to="/auth/register"
              state={location.state}
              className="text-secondary underline"
            >
              Register
            </Link>
          </p>

          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
