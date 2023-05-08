import { HStack, Heading, Stack, Button, Image, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { color } from "framer-motion";
import axios from 'axios';

function MyClasses() {

  const [classes, setClasses] = useState([]);

  let currentUserId = localStorage.getItem("token");
  currentUserId = currentUserId ? JSON.parse(localStorage.getItem("token")).data._id : undefined;
  console.log(currentUserId);

  const getClass = async () => {
    const url = "http://localhost:8080/api/class";
    const { data } = await axios.get(url);
    console.log(data);
    const expandClass = data.map((el, i) => ({
      id: el._id,
      name: el.name,
      startDate: el.startDate,
      endDate: el.endDate,
      color: el.color,
      description: el.description,
      schedule: el.schedule,
      image: el.image,
      day:"Monday"
    }));
    console.log(expandClass);
    // setData(members);
    // console.log(data);
    setClasses(expandClass);
  };

  useEffect(() => {
    getClass();
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
      <Heading as="h2" size="lg" mb={4}>
        Gym Class Schedule
      </Heading>
      <Table>
        <Tbody>
          {days.map((day, index) => (
            <Tr key={day}>
              <Td backgroundColor={"orange.200"} color={"black"}>
                {day}
              </Td>
              {classes
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
                      <Image src={c.image} alt={c.name} boxSize="100px" />
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
