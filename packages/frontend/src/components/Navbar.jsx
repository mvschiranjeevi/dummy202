import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-scroll";

function Navbar() {
  const [nav, setNav] = useState("false");

  const logout = () => {
    localStorage.removeItem("token");
    // window.location.href = "/login";
  };
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
    : null;
  console.log(token);
  window.addEventListener("scroll", changeBackground);
  return (
    <div>
      <nav className="nav active">
        {token == null ? (
          <>
            <a href="/" className="logo">
              <img src={logo} alt=""></img>
            </a>
          </>
        ) : token && token != null ? (
          <>
            <a href="/employeehome" className="logo">
              <img src={logo} alt=""></img>
            </a>
          </>
        ) : (
          <>
            <a href="/MyClasses" className="logo">
              <img src={logo} alt=""></img>
            </a>
          </>
        )}

        <input className="menu-btn" type="checkbox" id="menu-btn"></input>
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="nav-icon"></span>
        </label>
        <ul className="menu">
          {token == null && (
            <li>
              <a href="/membership">Memberships</a>
            </li>
          )}

          {/* For Members */}

          {!token && token != null && (
            <li>
              <a href="/MyClasses">My Class Schedule</a>
            </li>
          )}
          {!token && token != null && (
            <li>
              <a href="/MyActivities">My Activities</a>
            </li>
          )}
          {!token && token != null && (
            <li>
              <a href="/class">Classes</a>
            </li>
          )}
          {!token && token != null && (
            <li>
              <a href="/MyEquipments">Log Hours</a>
            </li>
          )}

          {/* For Employess */}
          {token && token != null && (
            <li>
              <a href="/members">Members</a>
            </li>
          )}
          {token && token != null && (
            <li>
              <a href="/myanalytics">Analytics Dashboard</a>
            </li>
          )}
          {/* For everyone */}
          {token == null && (
            <li>
              <a href="/class">Class</a>
            </li>
          )}
          {token == null && (
            <li>
              <a href="/location">Location</a>
            </li>
          )}
          {token == null && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}

          {token != null && (
            <li>
              <a href="/login" onClick={logout}>
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
