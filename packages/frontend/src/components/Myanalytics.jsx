import { Button ,Box, Heading} from "@chakra-ui/react";
import React,{useState,useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

import { Select } from "@chakra-ui/react";

function MyComponent(props) {
    const locations = props.locations
    console.log(locations);
  return (
    <Select size="sm" variant="filled" colorScheme="blue">
      {locations.map((lc) => (
        <option key={lc._id}>
          {lc.location}
        </option>
      ))}
    </Select>
  );
}



const Myanalytics = () => {
    const [activities, setActivities] = useState([]);
    const [hoursbyweek, setHoursByWeek]=useState({"Sunday":0,"Monday":0, "Tuesday":0,"Wednesday":0,"Thursday":0,"Friday":0,"Saturday":0});
    const [visitorsbytime, setVisitorsByTime] = useState({"Last Day":0,"Last Week":0,"Last Month":0});
    const [activitiesByUsers,setActivitiesByUsers] = useState({});
    const [equipmentmap, setEquipmentmap] = useState({});
    const [locationMap, setLocationMap] = useState({});
    const getLocations = async () => {
        const url = "http://localhost:8080/api/location";
        let lc = await axios.get(url);
        lc = lc.data;
        lc.map((item)=>{
            locationMap[item._id] = item.locations;
        });
        console.log(lc);
        setLocationMap(lc);
    }
    // const [daybyweek, setDayByweek]=useState({"Sunday":0,"Monday":0, "Tuesday":0,"Wednesday":0,"Thursday":0,"Friday":0,"Saturday":0})
    // const getClass= async()=>{
    //     const url="http://localhost:8080/api/class";
    //     const data  = await axios.get(url);
    //     const activityObjectList = data.data;
    //     let currentUserId = localStorage.getItem("token");
    //     currentUserId = currentUserId ? JSON.parse(localStorage.getItem("token")).data._id : undefined;
    //     let userActivity=activityObjectList;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const getEquipments=async()=>{
        const url="http://localhost:8080/api/equipment";
        let eq=await axios.get(url);
        eq = eq.data;
        eq.map((item)=>{
            equipmentmap[item._id] = item.name
            console.log(item._id, item.name);
    });
        console.log(equipmentmap);
      setEquipmentmap(equipmentmap);
    }
    const getActivities = async () => {
        const url = "http://localhost:8080/api/activity";
        const data  = await axios.get(url);
        const activityObjectList = data.data;
        let currentUserId = localStorage.getItem("token");
        currentUserId = currentUserId ? JSON.parse(localStorage.getItem("token")).data._id : undefined;
        let userActivity = activityObjectList; //activityObjectList.filter((obj) => obj.userId === currentUserId);
        console.log(userActivity)
        // const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let tmp3={"Sunday":0,"Monday":0, "Tuesday":0,"Wednesday":0,"Thursday":0,"Friday":0,"Saturday":0}

        let a = [];
        let tmp = {"Sunday":0,"Monday":0, "Tuesday":0,"Wednesday":0,"Thursday":0,"Friday":0,"Saturday":0};
        let tmp2 = {"Last Day":0,"Last Week":0,"Last Month":0};
        userActivity.map((item)=>{
            const now = new Date();
            const date = new Date(item.date);
            const difference = now.getTime() - date.getTime();
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            if (days <= 1){
                tmp2["Last Day"] += 1;
            }else if(days <= 7){
                tmp2["Last Week"] += 1;
            }else if(days <= 30){
                tmp2["Last Month"] += 1;
            }
            console.log(tmp2)
        });
        setVisitorsByTime(tmp2);
        userActivity.map((item)=>{
            const now = new Date();
            const date = new Date(item.date);
            const difference = now.getTime() - date.getTime();
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            if (days <= 7 && days >= 0) {
                console.log(date.getDay());
                let st = new Date(`2000-01-01T${item.startTime}:00`);
                let et = new Date(`2000-01-01T${item.endTime}:00`);
                tmp[daysOfWeek[(date.getDay()+1)%7]] += ((et.getTime() - st.getTime()) / (1000 * 60 * 60));
            }
            

        });
        console.log(tmp);
        setActivities(a);
        setHoursByWeek(tmp);
        let tmp4 = {};
        userActivity.map((item)=>{
            // within this week
            const now = new Date();
            const date = new Date(item.date);
            const difference = now.getTime() - date.getTime();
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            if (days <= 7 && days >=0){
                let st = new Date(`2000-01-01T${item.startTime}:00`);
                let et = new Date(`2000-01-01T${item.endTime}:00`);
                if (item.name in tmp4){
                    tmp4[equipmentmap[item.equipmentId]][daysOfWeek[(date.getDay())%7]] += 1;                     
                }else{
                    tmp4[equipmentmap[item.equipmentId]] = {"Monday":0,"Tuesday":0,"Wednesday":0,"Thursday":0,"Friday":0,"Saturday":0,"Sunday":0};
                    tmp4[equipmentmap[item.equipmentId]][daysOfWeek[(date.getDay())%7]] = 1;
                }
            }
            console.log(tmp4);
            setActivitiesByUsers(tmp4);
        });


    };


    // const gethoursbyweek()


        useEffect(() => {
            getEquipments();
            getActivities();
            getLocations()
          }, []);
    const userActivityData = {
        labels: Object.keys(visitorsbytime),
        datasets: [
          {
            label: 'User activity by day/week/month',
            data: Object.values(visitorsbytime),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const enrollmentData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Rowing',
            data: [5, 10, 15, 20, 25, 30, 35,40],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Treadmill',
            data: [5, 10, 15, 20, 25, 30, 35,40],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

    //   const LABELS = hoursbyweek.keys
    //   console.log(hoursbyweek);
      const gymHoursData = {
        // console.log(hoursbyweek.keys());

        labels:  Object.keys(hoursbyweek),
        datasets: [
          {
            label: 'Hours spent in the gym',
            data: Object.values(hoursbyweek),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      };
      function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function putdata(activitiesByUsers){
        let datasets = [];
        for(let activity in activitiesByUsers){
            let ob = {
                label: activity,
                data : Object.values(activitiesByUsers[activity]),
                borderColor: getRandomColor(),
                borderWidth: 1
            }
            datasets.push(ob);
        }
        return datasets;
      }
      console.log(putdata(activitiesByUsers));

      const data_ = {
        labels: daysOfWeek,
        datasets : putdata(activitiesByUsers)
        // datasets: [
        //   {
        //     label: 'Line 1',
        //     data: [3, 2, 5, 4, 6, 7, 8],
        //     borderColor: 'red',
        //     borderWidth: 1,
        //   },
        //   {
        //     label: 'Line 2',
        //     data: [5, 6, 4, 7, 8, 9, 10],
        //     borderColor: 'blue',
        //     borderWidth: 1,
        //   },
        // ],
      };
    // const data_ = data.map(({ label, values }) => ({
    //     label,
    //     data: values,
    //     borderColor: getRandomColor(), // optional styling options
    //     fill: false,
    //   }));

      const visitorsData = {
        labels: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        datasets: [
          {
            label: 'Visitors by hour',
            data: [
              10, 12, 15, 18, 25, 30, 40, 50, 70, 80, 90, 100, 120, 130, 110, 95,
              80, 70, 60, 50, 40, 35, 30, 20,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
     
      };
  
  return (

    <Box padding={"5%"}>
  <Heading as="h2" size="lg" mb={4} textAlign="center">
        View analytics dashboard
    </Heading>
<MyComponent locations = {Object.values(locationMap)}/>
  <div style={{ display: 'flex' }}>
    <div style={{ width: '50%' }}>
    <Heading as="h2" size="md" mb={4} textAlign="center">
        User activity summarized by day/week/month    
    </Heading>
      <Bar data={userActivityData} />
    </div>
    <div style={{ width: '50%', marginLeft: "4%" }}>
    <Heading as="h2" size="md" mb={4} textAlign="center">
        Classes and enrollment by day/week
    </Heading>

      <Line data={data_} />
    </div>
  </div>

  <div style={{ display: 'flex', marginLeft:"7%" }}>
    <div style={{ width: '100%' }}>
    <Heading as="h2" size="md" mb={4} textAlign="center">
        Hours spent in the gym by day/week/month
    </Heading>

      <Line data={gymHoursData} />
    </div>
    
  </div>
</Box>

  );
}

export default Myanalytics



// import React, { useState, useEffect } from 'react';
// import { Bar, Line } from 'react-chartjs-2';

// function MyAnalytics() {
//   const [userActivityData, setUserActivityData] = useState(null);
//   const [enrollmentData, setEnrollmentData] = useState(null);
//   const [gymHoursData, setGymHoursData] = useState(null);
//   const [visitorsData, setVisitorsData] = useState(null);

//   useEffect(() => {
//     fetch('/api/user-activity')
//       .then(response => response.json())
//       .then(data => setUserActivityData(data));

//     fetch('/api/enrollment')
//       .then(response => response.json())
//       .then(data => setEnrollmentData(data));

//     fetch('/api/gym-hours')
//       .then(response => response.json())
//       .then(data => setGymHoursData(data));

//     fetch('/api/visitors')
//       .then(response => response.json())
//       .then(data => setVisitorsData(data));
//   }, []);

//   if (!userActivityData || !enrollmentData || !gymHoursData || !visitorsData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>View analytics dashboard</h1>

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div>
//           <h2>User activity summarized by location</h2>
//           <Bar data={userActivityData} />
//         </div>

//         <div>
//           <h2>Classes and enrollment by day/week</h2>
//           <Line data={enrollmentData} />
//         </div>
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div>
//           <h2>Hours spent in the gym by day/week/month</h2>
//           <Line data={gymHoursData} />
//         </div>

//         <div>
//           <h2>Number of  of visitors by the hour each day, weekday, weekend</h2>
//           <Line data={visitorsData}/>
// user activity and gym hours and enrollment data and number of visitors data