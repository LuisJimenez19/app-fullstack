import { useEffect } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/capitalize";
import { APP_NAME } from "../../Constants/appData";

//eslint-disable-next-line
function LayoutDefault({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAuth();
  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login");
    const path = capitalizeFirstLetter(pathname.slice(1));

    document.title = `${APP_NAME} | ${path}`;
  }, [auth.isAuthenticated, navigate, pathname]);

  return (
    <div className="layaout-default">
      <Sidebar />
      {children}
    </div>
  );
}
export { LayoutDefault };
