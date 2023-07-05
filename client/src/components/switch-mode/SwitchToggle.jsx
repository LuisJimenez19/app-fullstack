import { useEffect } from "react";

import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
//eslint-disable-next-line
function SwitchToggle({ open, isDarkMode, setIsDarkMode }) {
  useEffect(() => {
    const darkModeLocal = localStorage.getItem("isDark");
    setIsDarkMode(darkModeLocal === "dark");
    handleDarkMode(darkModeLocal === "dark");
  }, [setIsDarkMode]);

  function handleClick() {
    const nowDarkMode = !isDarkMode;
    setIsDarkMode(nowDarkMode);
    localStorage.setItem("isDark", nowDarkMode ? "dark" : "light");
    handleDarkMode(nowDarkMode);
  }

  function handleDarkMode(mode) {
    if (mode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <li onClick={handleClick} className="mode">
      <div className="sun-moon">
        <span className="icon moon">
          <BsMoonFill />
        </span>
        <span className="icon sun">
          <BsFillSunFill />
        </span>
      </div>
      <span className="mode-text text">
        {isDarkMode ? "Ligth" : "Dark"} mode
      </span>
      <div className="toggle-switch">
        <span className="switch" />
      </div>
    </li>
  );
}

export { SwitchToggle };
