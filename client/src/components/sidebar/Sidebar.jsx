import { useState } from "react";

/* Icons */
import { IoIosArrowForward } from "react-icons/io";

/* Componentes */
import { SidebarItem } from "./SidebarItem";
import { SwitchToggle } from "../switch-mode/SwitchToggle";
/* import { currentPage } from "@/helpers/helpers"; */
import "./sidebar.css";
import { useAuth } from "../../hooks/useAuth";
import { BsBoxArrowLeft } from "react-icons/bs";
import { logoutRequest } from "../../api/auth";
import { getHash } from "../../helpers/getHash";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../../Constants/appData";
import { AudioPlayer } from "../AudioPlayer";

function Sidebar() {
  const [open, setOpen] = useState(() => {
    if (localStorage.getItem("openSideBar") !== undefined) {
      const storeOpen = JSON.parse(localStorage.getItem("openSidebar"));
      return storeOpen;
    } else return true;
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const darkModeLocal = localStorage.getItem("isDark");
    return darkModeLocal === "dark";
  });

  const Menus = [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Tasks", url: "/tasks" },
  ];

  return (
    <div className={`container-sidebar ${open ? "open" : ""}`}>
      <nav className={`sidebar ${!open ? "close" : ""}`}>
        <span
          onClick={() => {
            localStorage.setItem("openSidebar", JSON.stringify(!open));
            setOpen(!open);
          }}
          className="toggle"
        >
          <IoIosArrowForward />
        </span>
        <header
          onClick={() => {
            if (window.innerWidth < 768) {
              localStorage.setItem("openSidebar", JSON.stringify(!open));
              setOpen(!open);
            }
          }}
        >
          <div onClick={() => navigate("/profile")} className="image-text">
            <span className="image">
              <img
                src={`https://www.gravatar.com/avatar/${getHash(
                  auth.user.email
                )}?d=${auth.user.default_url}`}
                alt="avatar"
              />
            </span>
            <div className="text">
              <span className="name">{APP_NAME}</span>
              <span className="profession">{auth.user.name}</span>
            </div>
          </div>
        </header>
        <div className="menu-bar">
          <ul>
            {Menus.map((item, index) => {
              return (
                <SidebarItem
                  url={item.url}
                  title={item.title}
                  key={index}
                  index={index}
                  open={open}
                  setOpen={setOpen}
                />
              );
            })}
          </ul>

          <ul className="bottom-content">
            <AudioPlayer />
            <li className={`nav-link`}>
              <a
                onClick={async () => {
                  const res = await logoutRequest();
                  if (res.status === 204) {
                    auth.setUser({});
                    auth.setIsAuthenticated(false);
                    toast.success("Vuelva pronto mi amor", {
                      icon: "♥",
                    });
                  }
                }}
              >
                <span className="icon">{<BsBoxArrowLeft />}</span>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
            <SwitchToggle
              open={open}
              setIsDarkMode={setIsDarkMode}
              isDarkMode={isDarkMode}
            />
          </ul>
        </div>
      </nav>
      
    </div>
  );
}

export { Sidebar };
