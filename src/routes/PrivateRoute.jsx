import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Authenticated → allow to continue
  return children;
};

export default PrivateRoute;
