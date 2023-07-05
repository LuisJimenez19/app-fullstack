/* Icons */
import { RiDashboardFill } from "react-icons/ri";
import { BiCalendarEdit, BiHome } from "react-icons/bi";
import { BsBoxArrowLeft, BsListTask } from "react-icons/bs";
/* styles */
import "./sidebar-item.css";

import { Link, useLocation } from "react-router-dom";
//eslint-disable-next-line
const SidebarItem = ({ title, url, index, open, setOpen }) => {
  const { pathname } = useLocation();
  const setIcon = (icon) => {
    switch (icon) {
      case "Dashboard":
        return <RiDashboardFill />;
      case "Logout":
        return <BsBoxArrowLeft />;
      case "Sites Favorites":
        return <BsListTask />;
      case "Tasks":
        return <BiCalendarEdit />;
      default:
        return <BiHome />;
    }
  };

  return (
    <li
      className={`nav-link ${
        pathname.toLowerCase() == url ? "nav-link--active" : ""
      }`}
    >
      <Link
        onClick={() => {
          if (window.innerWidth < 768) {
            localStorage.setItem("openSidebar", JSON.stringify(!open));
            setOpen(!open);
          }
        }}
        to={url}
      >
        <span className="icon">{setIcon(title)}</span>
        <span className="text nav-text">{title}</span>
      </Link>
    </li>
  );
};

export { SidebarItem };
