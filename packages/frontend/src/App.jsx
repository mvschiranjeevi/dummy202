import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Feature from "./components/Feature";
import Offer from "./components/Offer";
import About from "./components/About";
import Contact from "./components/Contact";
import Membership from "./components/Membership";
import EmployeeHome from "./components/Employeehomepage";
import Freetrail from "./components/freeTrail";
import CheckIn from "./components/Checkin";
import Class from "./components/Classschedule";
import Schedule from "./components/Class";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/feature" element={<Feature />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/employeehome" element={<EmployeeHome />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/freetrail" element={<Freetrail />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/class" element={<Class />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        {/* <Route path="/schedule/" element={<Schedule />} /> */}
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
