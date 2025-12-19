import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from =
    location?.state?.from?.pathname &&
    !location.state.from.pathname.startsWith("/auth")
      ? location.state.from.pathname
      : "/";

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInGoogle();

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
        title: "Google Login Failed",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleGoogleLogin}
        className={`btn w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 ${
          loading ? "loading" : ""
        }`}
        disabled={loading}
      >
        <FcGoogle size={24} /> Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
