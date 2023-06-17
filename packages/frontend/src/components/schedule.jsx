import {
  HStack,
  Heading,
  Stack,
  Button,
  Image,
  Box,
  VStack,
  FormControl,
  Input,
  Text,
  Divider,
  FormLabel,
  Select,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendApi } from "../constants";

import { BsFillCalendarCheckFill } from "react-icons/bs";
const images = {
  Rowing: "/gym7.jpg",
  Boxing: "/gym4.jpg",
  "Strength Training": "/gym5.jpg",
  Cardio: "/gym6.jpg",
};
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Schedule() {
  //   const [refresh, setRefresh] = useState(false);
  //   const memberId = JSON.parse(localStorage.getItem("token"));
  //   const memberIds = memberId.data._id;
  const routeParams = useParams();
  const uri = `${backendApi}/api/class/schedule/?id=` + routeParams.id;

  const [classes, setClasses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [image, setImage] = useState([]);
  const [name, setName] = useState([]);
  const [startdate, setStartdate] = useState([]);
  const [classid, setClassid] = useState("");

  const [enddate, setEnddate] = useState([]);

  const getClass = async () => {
    const { data } = await axios.get(uri);
    const expandClass = data.map((el, i) => {
      return {
        id: el._id,
        name: el.name,
        startDate: el.startDate,
        endDate: el.endDate,
        color: el.color,
        description: el.description,
        schedule: el.schedule,
        image: images[el.name],
      };
    });
    setSchedule(expandClass[0].schedule);

    // setData(members);
    // console.log(data);
    setClasses(expandClass);
    setImage(expandClass[0].image);
    setStartdate(expandClass[0].startDate);
    setEnddate(expandClass[0].endDate);
    setName(expandClass[0].name);
    setClassid(expandClass[0].id);
    // console.log();
  };
  const firstSchedule = schedule.slice(0, 4);
  const secondSchedule = schedule.slice(4, 7);
  useEffect(() => {
    getClass();
  }, []);

  //   const [location, setLocation] = useState([]);
  //   const [locvalue, setLocalvalue] = React.useState(null);
  //   console.log(locvalue);

  //   const getLocation = async () => {
  //     const url = "http://3.22.95.113:8080/api/location";
  //     const { data } = await axios.get(url);
  //     // console.log(data);
  //     setLocation(data);
  //   };

  //   useEffect(() => {
  //     getLocation();
  //   }, []);

  //   const [data, setData] = useState({});
  //   const [bool, setBool] = useState({});

  //   const getSchedule = async () => {
  //     const url =
  //       "http://3.22.95.113:8080/api/schedule?userId=" +
  //       memberIds +
  //       "&classId=" +
  //       routeParams.id;
  //     const { data } = await axios.get(url);
  //     if (data.length != 0) {
  //       setData(data);
  //       setBool(false);
  //       getLocationName(data[0].locationId).then((locationName) =>
  //         setData((data) => {
  //           return [{ ...data[0], locationName }];
  //         })
  //       );
  //     } else {
  //       setData({
  //         userId: memberIds,
  //         classId: classid,
  //         schedule: [],
  //         fromDate: "",
  //         toDate: "",
  //         locationId: "",
  //         locationName: "",
  //       });
  //       setBool(true);
  //     }

  //     console.log(bool);
  //   };

  //   useEffect(() => {
  //     getSchedule();
  //   }, [refresh]);

  return (
    <Stack spacing={0}>
      <Stack
        // padding={100}
        bgImage="url(/gym2.jpg)"
        height={"35rem"}
        bgSize={"cover"}
        justify="center"
        align="center"
        backgroundPosition="center"
      >
        <Heading size="3xl" color="white">
          Class Schedule
        </Heading>
      </Stack>
      <>
        <Stack
          padding={50}
          maxWidth="full"
          paddingLeft={100}
          borderWidth={1}
          border="2px"
          borderColor="white"
        >
          <Stack paddingBottom={10}>
            <Heading
              size="3xl"
              color="Orange"
              textAlign={"center"}
              paddingBottom={10}
            >
              Available Classes - {name}
            </Heading>
            <HStack justifyContent={"center"}>
              <Text as="b" textAlign={"center"} fontSize={"1xl"}>
                From Date - {startdate} ---
              </Text>
              <Text as="b" textAlign={"center"} fontSize={"1xl"}>
                To Date - {enddate}
              </Text>
            </HStack>
          </Stack>

          <HStack spacing={85}>
            <VStack>
              {firstSchedule.map((variant, i) => (
                <HStack
                  width="full"
                  padding={5}
                  maxWidth="full"
                  borderWidth={1}
                  border="2px"
                  borderColor="gray"
                >
                  <Box>
                    <Text size="md">
                      {days[i]} :- {variant} AM
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
            <VStack>
              {secondSchedule.map((variant, i) => (
                <HStack
                  width="full"
                  padding={5}
                  maxWidth="full"
                  borderWidth={1}
                  border="2px"
                  borderColor="gray"
                >
                  <Box>
                    <Text size="md">
                      {days[4 + i]} :- {variant} AM
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
            <Stack paddingLeft={100}>
              <Image src={image} width="30rem"></Image>
            </Stack>
          </HStack>
        </Stack>
      </>
    </Stack>
  );
}

export default Schedule;
