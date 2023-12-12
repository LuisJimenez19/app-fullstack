import { createContext, useEffect, useState } from "react";
import { verifySessionRequest } from "../api/auth";

const Auth = createContext();
//eslint-disable-next-line
function AuthContext({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorServer, setErrorServer] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    verifySessionRequest()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.headers);
          setUser(res.data.user);
          setIsLoading(false);
          setIsAuthenticated(true);
          setErrorServer(false);
        }
      })
      .catch((e) => {
        setUser({});
        setIsAuthenticated(false);
        setIsLoading(false);
        console.log(e.response.data.message, e.response.status);
        setErrorServer(e); // si no hay conexión al servidor
        e.response.status === 401 && setErrorServer(false); // si no esta autorizado, va al login
      });
  }, []);

  useEffect(() => {
    if (user) {
      if (Object.keys(user).length !== 0) {
        setIsAuthenticated(true);
      }
    } else setIsAuthenticated(false);
  }, [user]);

  if (errorServer)
    return (
      <div className="page-not-found">
        {" "}
        <div className="content">
          {" "}
          Revisa tu conexión al servidor <>Asegurate de tener permiso</>
        </div>
        <div className="img"></div>
      </div>
    );
  return (
    <Auth.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading ? (
        <div className="container-loading auth">
          <div className="loading">Cargando..</div>
        </div>
      ) : (
        children
      )}
    </Auth.Provider>
  );
}

export { AuthContext, Auth };
