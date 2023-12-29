import { TasksContextProvider } from "../context/TasksContext";
import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const auth = useAuth();
  // ? Solo ejecutar el context si esta autenticado, esta es la única forma que se me ocurre ahora.
  return auth.isAuthenticated ? (
    <TasksContextProvider>
      <Outlet />
    </TasksContextProvider>
  ) : (
    <Navigate to="/login" />
  );
}

export { ProtectedRoutes };
