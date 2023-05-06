import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-scroll";

function Navbar() {
  const [nav, setNav] = useState("false");
  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <div>
      <nav className="nav active">
        <a href="/" smooth={true} duration={1000} className="logo">
          <img src={logo} alt=""></img>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn"></input>
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="nav-icon"></span>
        </label>
        <ul className="menu">
          <li>
            <a href="/membership">Memberships</a>
          </li>

          <li>
            <a href="/">View Members</a>
          </li>
          <li>
            <a href="/">Analytics Dashboard</a>
          </li>
          <li>
            <a href="/">Profile</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
