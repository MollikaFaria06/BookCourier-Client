import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location?.state?.from || "/";

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}

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
