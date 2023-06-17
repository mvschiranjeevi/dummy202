import { HStack, Heading, Stack, Button, Image, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  BsFillCalendarCheckFill,
  BsWrenchAdjustableCircleFill,
} from "react-icons/bs";
import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import axios from "axios";
import { backendApi } from "../constants";

function MyClasses() {
  const [locationMap, setLocationMap] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [classMap, setClassMap] = useState({});
  let currentUserId = localStorage.getItem("token");
  currentUserId = currentUserId
    ? JSON.parse(localStorage.getItem("token")).data._id
    : undefined;

  const getLocation = async () => {
    const url = `${backendApi}/api/location`;
    const { data } = await axios.get(url);
    data.map((item) => {
      locationMap[item._id] = item.location;
    });
    setLocationMap(locationMap);
  };

  const getClass = async () => {
    const url = `${backendApi}/api/class`;
    const { data } = await axios.get(url);

    data.map((item) => {
      console.log(item);
      classMap[item._id] = item.name;
    });
    console.log(classMap);
    setClassMap(classMap);
  };

  const getSchedule = async () => {
    let currentUserId = localStorage.getItem("token");
    currentUserId = currentUserId
      ? JSON.parse(localStorage.getItem("token")).data._id
      : undefined;
    console.log("***", currentUserId);
    const url =
      `${backendApi}/api/schedule/all/?userId=` + currentUserId;
    const { data } = await axios.get(url);

    const activeSchedules = data.filter((d) => !d.isDeleted);
    const filteredSchedulesMap = [];
    activeSchedules.forEach((schedule) => {
      // const temp = []
      schedule.schedule.forEach((dayTime) => {
        const firstIndex = dayTime.indexOf(" ");
        filteredSchedulesMap.push({
          name: classMap[schedule.classId],
          location: locationMap[schedule.locationId],
          day: dayTime.substring(0, firstIndex),
          time: dayTime.substring(firstIndex + 1),
        });
      });
    });
    console.log(filteredSchedulesMap);
    setSchedules(filteredSchedulesMap);
    // data.map((item)=>{
    // console.log(item);
    // if (item.isDeleted == false){
    // item['day'] = "Monday";
    // item['className'] = classMap[item.classId]
    // activeSchedules.push(item)

    // }
    // });
    // console.log("------>",activeSchedules);
    // setSchedules(activeSchedules);
  };
  const getDayTime = (dayString) => {
    let day = dayString.split(" ")[0];
    let time = dayString.split(" ")[1];
    return [day, time];
  };

  useEffect(() => {
    getClass();
    getLocation();
    getSchedule();
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // const classes = [
  //   {
  //     day: "Monday",
  //     time: "10:00am - 11:00am",
  //     name: "Yoga",
  //     image: "./gym1.png",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Friday",
  //     time: "1:00pm - 2:00pm",
  //     name: "Pilates",
  //     image: "./gym2.jpg",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Monday",
  //     time: "1:00pm - 2:00pm",
  //     name: "Pilates",
  //     image: "./gym2.jpg",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Tuesday",
  //     time: "9:00am - 10:00am",
  //     name: "Zumba",
  //     image: "https://via.placeholder.com/150x150",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Tuesday",
  //     time: "9:00pm - 10:30pm",
  //     name: "Zumba",
  //     image: "https://via.placeholder.com/150x150",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Wednesday",
  //     time: "11:00am - 12:00pm",
  //     name: "Body Pump",
  //     image: "https://via.placeholder.com/150x150",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Thursday",
  //     time: "5:00pm - 6:00pm",
  //     name: "Spinning",
  //     image: "https://via.placeholder.com/150x150",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Saturday",
  //     time: "9:00am - 10:00am",
  //     name: "HIIT",
  //     image: "https://via.placeholder.com/150x150",
  //     location: "San Jose",
  //   },
  //   {
  //     day: "Sunday",
  //     time: "4:00pm - 5:00pm",
  //     name: "Boxing",
  //     image: "https://via.placeholder.com/150x150",
  //     location: "San Jose",
  //   },
  // ];

  const [hover, setHover] = useState({});

  return (
    <Box my={20}>
      <Heading as="h2" size="lg" mb={4} marginLeft={"40%"}>
        Gym Class Schedule
      </Heading>
      <Table>
        <Tbody>
          {days.map((day, index) => (
            <Tr key={day}>
              <Td backgroundColor={"orange.200"} color={"black"}>
                {day}
              </Td>
              {schedules
                .filter((c) => c.day === day)
                .map((c) => (
                  <Td>
                    <HStack
                      color="black"
                      _hover={{ bg: "orange.100" }}
                      width="full"
                      justify="space-between"
                      padding="2rem"
                    >
                      <Text width="8rem"> {c.time}</Text>
                      <Stack width="10rem">
                        <Text>{c.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {c.location}
                        </Text>
                      </Stack>
                    </HStack>
                  </Td>
                ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default MyClasses;
