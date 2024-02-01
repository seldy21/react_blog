import { Link } from "react-router-dom";
import { BsEmojiSunglasses } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "context/themeContext";
import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  const context = useContext(ThemeContext);

  console.log(context);
  return (
    <footer>
      <div>
        <FaRegCopyright />
        dadaramGthunder all right reserved.
      </div>
      <div className="theme__icon" onClick={context.toggleMode}>
        {context.theme === "light" ? <BsEmojiSunglasses /> : <BsMoonStars />}
      </div>
    </footer>
  );
}
