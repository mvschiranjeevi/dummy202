import { HStack, Heading, Stack, Button, Image, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { color } from "framer-motion";

// const Classschedule = [
//   {
//     name: "Rowing",
//     description:
//       "Every stroke on the rower activates 85% of your body’s muscles. This low impact workout helps you improve endurance, strength and power.",
//     startDate: "05/20/2023",
//     endDate: "10/20/2023",
//     people: 5,
//     color: "#f2f2f2",
//     image: "./gym7.jpg",
//   },
//   {
//     name: "Boxing",
//     description:
//       "We intend to teach you real techniques that real fighters use and to help you achieve your health and fitness goals using metrically-driven improvement for targeted results,whether they be inside or outside of the ring",
//     startDate: "05/20/2023",
//     endDate: "10/20/2023",
//     people: 6,
//     color: "white",
//     image: "./gym4.jpg",
//   },

//   {
//     name: "Strength Training",
//     description:
//       "Our weight and floor exercises change daily so you can focus on different muscles. Your coach can provide options for any movement if you have injuries or limitations.",
//     startDate: "05/20/2023",
//     endDate: "10/20/2023",
//     people: 6,
//     color: "#f2f2f2",
//     image: "./gym5.jpg",
//   },
//   {
//     name: "Cardio",
//     description:
//       "Whether you walk, jog or run, you’ll go at your own pace based on your fitness level. We also have bikes and striders available as alternates to the treadmill.",
//     startDate: "05/20/2023",
//     endDate: "10/20/2023",
//     people: 6,
//     color: "white",
//     image: "./gym6.jpg",
//   },
// ];

function MyClasses() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const classes = [
    {
      day: "Monday",
      time: "10:00am - 11:00am",
      name: "Yoga",
      image: "./gym1.png",
      location: "San Jose",
    },
    {
      day: "Friday",
      time: "1:00pm - 2:00pm",
      name: "Pilates",
      image: "./gym2.jpg",
      location: "San Jose",
    },
    {
      day: "Monday",
      time: "1:00pm - 2:00pm",
      name: "Pilates",
      image: "./gym2.jpg",
      location: "San Jose",
    },
    {
      day: "Tuesday",
      time: "9:00am - 10:00am",
      name: "Zumba",
      image: "https://via.placeholder.com/150x150",
      location: "San Jose",
    },
    {
      day: "Tuesday",
      time: "9:00pm - 10:30pm",
      name: "Zumba",
      image: "https://via.placeholder.com/150x150",
      location: "San Jose",
    },
    {
      day: "Wednesday",
      time: "11:00am - 12:00pm",
      name: "Body Pump",
      image: "https://via.placeholder.com/150x150",
      location: "San Jose",
    },
    {
      day: "Thursday",
      time: "5:00pm - 6:00pm",
      name: "Spinning",
      image: "https://via.placeholder.com/150x150",
      location: "San Jose",
    },
    {
      day: "Saturday",
      time: "9:00am - 10:00am",
      name: "HIIT",
      image: "https://via.placeholder.com/150x150",
      location: "San Jose",
    },
    {
      day: "Sunday",
      time: "4:00pm - 5:00pm",
      name: "Boxing",
      image: "https://via.placeholder.com/150x150",
      location: "San Jose",
    },
  ];

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
