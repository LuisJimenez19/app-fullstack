import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios.js";

function PageNotFound() {
  const { pathname } = useLocation();
  const [content, setConent] = useState("");

  useEffect(() => {
    axios
      .get(pathname)
      .then((res) => {
        setConent(res.data.message);
      })
      .catch((e) => {
        setConent(e.response.data.message);
      });
    //eslint-disable-next-line
  }, []);

  if (content === "")
    return (
      <div className="container-loading">
        <div className="loading">Cargando..</div>
      </div>
    );
  return (
    <div className="page-not-found">
      <p>
        <span>404</span> <span>|</span> <span>Not Found</span>
      </p>
      <div className="img"></div>
      <div className="content">{content}</div>
    </div>
  );
}

export { PageNotFound };
