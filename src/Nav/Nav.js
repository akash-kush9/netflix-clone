import React, { useEffect, useState } from "react";
import "./Nav.css";
const Nav = () => {
  const [show, setHandleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setHandleShow(true);
      else setHandleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix Logo"
        className="nav__logo"
        src="https://i.pinimg.com/originals/17/65/2c/17652c3268c85ac2e3ac9fbdab374a5a.png"
      />
      <img
        className="nav__avatar"
        alt="Smiley face"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvngpc9AcPhVIPrBwKc9AbiLdm8MKDfagqqA&usqp=CAU"
      />
    </div>
  );
};

export default Nav;
