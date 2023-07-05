import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const auth = useAuth();
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export { ProtectedRoutes };
