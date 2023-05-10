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
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : undefined;
  console.log(token);
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
          {!token && (
            <li>
              <a href="/membership">Memberships</a>
            </li>
          )}
          {token && (
            <li>
              <a href="/">View Members</a>
            </li>
          )}
          {token && (
            <li>
              <a href="/myanalytics">Analytics Dashboard</a>
            </li>
          )}
          {!token && (
            <li>
              <a href="/">Profile</a>
            </li>
          )}

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
