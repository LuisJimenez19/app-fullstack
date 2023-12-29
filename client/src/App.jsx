import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/* Context */
import { AuthContext } from "./context/AuthContext";
/* Pages */
import { LoginPage } from "./pages/auth/LoginPage";

import { RegisterPage } from "./pages/auth/RegisterPage";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";

import { PageNotFound } from "./pages/PageNotFound";
/* Toast */
import { Toaster } from "react-hot-toast";
import { ModalCard } from "./components/ModalCard";
// import { TasksContextProvider } from "./context/TasksContext";
import { TasksPage } from "./pages/TaskPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <div>El diablo</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <div>El diablo</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <div>El diablo</div>,
  },

  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/task/:id",
        element: <ModalCard />,
      },

      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <main className="app">
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>

      <Toaster />
    </main>
  );
}

export default App;
