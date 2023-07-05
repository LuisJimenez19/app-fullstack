import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import { NavBar } from "../../components/NavBar";

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function LayoutAuth({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="layaout-auth">
      {isLoading ? (
        <div className="container-loading">
          <div className="loading">Cargando..</div>
        </div>
      ) : (
        <>
          <NavBar />
          <div className="form-page">{children}</div>
        </>
      )}
    </div>
  );
}

export { LayoutAuth };
