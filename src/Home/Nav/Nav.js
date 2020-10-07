import React, { useEffect, useState } from "react";
import "./Nav.css";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { Link } from "react-router-dom";
const Nav = () => {
  const [show, setHandleShow] = useState(false);
  const [searchInput, showSearchInput] = useState(false);

  useEffect(() => {
    const listener = window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setHandleShow(true);
      else setHandleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__left">
        <Link to="/">
          <img
            alt="Netflix Logo"
            className="nav__logo"
            src="https://i.pinimg.com/originals/17/65/2c/17652c3268c85ac2e3ac9fbdab374a5a.png"
          />
        </Link>

        <h3>Browse</h3>
        <div className="nav__search">
          <SearchIcon
            onClick={() => {
              showSearchInput(!searchInput);
            }}
          />
          {searchInput ? (
            <h3>Search</h3>
          ) : (
            <input placeholder="Search here" className="nav__searchInput" />
          )}
        </div>
      </div>
      <div className="nav__right">
        <NotificationsActiveIcon />
        <img
          className="nav__avatar"
          alt="Smiley face"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvngpc9AcPhVIPrBwKc9AbiLdm8MKDfagqqA&usqp=CAU"
        />{" "}
      </div>
    </div>
  );
};

export default Nav;
