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
import MyClasses from "./components/MyClasses";
import MyEquipments from "./components/MyEquipments";
import MyEquipment from "./components/MyEquipment";
import MyActivities from "./components/MyActivities";
import Schedule from "./components/Class";
import Myanalytics from "./components/Myanalytics";
import Schedules from "./components/schedule";
import Location from "./components/Location";
import Members from "./components/Members";
import ClassAnalytics from "./components/ClassAnalytics";
import ClassAnalyticsSub from "./components/ClassAnalyticSub";

import ClassValues from "./components/ClassValues";

function App() {
  const getEquipmentId = (equipment) => {
    console.log(equipment.id);
  };
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
        <Route path="/myclasses" element={<MyClasses />} />
        {/* <Route path="/myequipments" render={(props) => <MyEquipments myProp={getEquipmentId} />} /> */}
        <Route path="/myequipments" element={<MyEquipments />} />
        <Route path="/myequipment/:id" element={<MyEquipment />} />
        <Route path="/myactivities" element={<MyActivities />} />
        <Route path="/location" element={<Location />} />
        <Route path="/members" element={<Members />} />
        <Route path="/classAnalytics" element={<ClassAnalytics />} />
        <Route path="/classAnalyticsSub" element={<ClassAnalyticsSub />} />

        <Route path="/classvalues" element={<ClassValues />} />

        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="/myanalytics" element={<Myanalytics />} />
        <Route path="/schedules/:id" element={<Schedules />} />

        {/* <Route path="/schedule/" element={<Schedule />} /> */}
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
