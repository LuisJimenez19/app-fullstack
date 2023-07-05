/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import {
  BsEggFill,
  BsEggFried,
  BsFillBalloonHeartFill,
  BsFire,
  BsHeartPulse,
  BsWatch,
} from "react-icons/bs";
import { BiBrain } from "react-icons/bi";
import { IoIosThunderstorm } from "react-icons/io";
import { RiMeteorLine } from "react-icons/ri";
function FooterProfile() {
  const arrEmojis = [
    <BsFillBalloonHeartFill />,
    <BsFire />,
    <BiBrain />,
    <BsWatch />,
    <BsHeartPulse />,
    <BsEggFried />,
    <BsEggFill />,
    <IoIosThunderstorm />,
    <RiMeteorLine />,
  ];
  const [iconAt, setIconAt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconAt((prevValue) => {
        const newValue = (prevValue + 1) % arrEmojis.length;
        return newValue;
      });
    }, 2000);
    return () => clearInterval(interval);
    
  }, [arrEmojis.length]);
  return (
    <footer className="profile-footer">
      <div className="footer-atributtion">
        <p>
          Made with{" "}
          <span className="atributtion-icon">{arrEmojis[iconAt]}</span> and by
          <a
            className="profile-footer-link"
            target="_blanck"
            rel="noreferrer"
            href="https://github.com/LuisJimenez19"
          >
            Luis Ángel
          </a>
        </p>
      </div>
    </footer>
  );
}

export default FooterProfile;
