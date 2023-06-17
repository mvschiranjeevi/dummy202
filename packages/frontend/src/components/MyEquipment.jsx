import React from "react";
import {
  Box,
  Flex,
  Image,
  Badge,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  useToast,
  HStack,
  Select,
  Spinner,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendApi } from "../constants";

import ErrorMessage from "./ErrorMessage";

const MyEquipment = () => {
  const d = new Date();

  var dd = String(d.getDate()).padStart(2, "0");
  var mm = String(d.getMonth() + 1).padStart(2, "0");
  var yyyy = d.getFullYear();

  var today = yyyy + "-" + mm + "-" + dd;
  console.log(today, "lkl");
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : undefined;

  var tokens = token
    ? JSON.parse(localStorage.getItem("token")).data
    : undefined;

  console.log(JSON.parse(localStorage.getItem("token")).data._id, "----");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [date, setDate] = useState("");
  const [loc, setLoc] = useState("");

  const toast = useToast();
  const [equipment, setEquipment] = useState([]);
  const [ErrorMes, setErrorMes] = useState("");

  const equipmentId = useParams();

  //write backend code to get equipment details based on its
  const getEquipment = async () => {
    const url = `${backendApi}/api/equipment`;
    const data = await axios.get(url);
    const allEquipments = data.data;
    const requiredEquipment = allEquipments.find(
      (item) => item._id === equipmentId.id
    );
    setEquipment(requiredEquipment);
  };

  useEffect(() => {
    getEquipment();
  }, []);
  const [location, setLocation] = useState([]);
  const [locvalue, setLocalvalue] = React.useState(null);
  //   console.log(locvalue);

  const getLocation = async () => {
    const url = `${backendApi}/api/location`;
    const { data } = await axios.get(url);
    // console.log(data, "djdj");
    setLocation(data);
  };

  useEffect(() => {
    getLocation();
  }, []);
  const [error, setError] = useState(false);
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // console.log(startTime, endTime, "jjjjjj");

      var split1 = startTime.split(":");
      var split2 = endTime.split(":");

      if (split1[0] > split2[0]) {
        setError(true);
        setErrorMes("From Time Cannot Be Greater Than To Time");
        return;

        console.log(error, "popo");
      } else if (split1[1] > split2[1]) {
        setError(true);
        setErrorMes("From Time Cannot Be Greater Than To Time");
        return;
      }

      if (date < today) {
        setError(true);
        setErrorMes("Date Cannot Be In The Past");

        return;
      }

      const url = `${backendApi}/api/activity`;

      const ob = {
        userId: JSON.parse(localStorage.getItem("token")).data._id,
        equipmentId: equipmentId.id,
        startTime: startTime,
        endTime: endTime,
        date: date,
        locationId: loc,
      };
      // console.log("--->" + ob.userId);
      // console.log("--->" + ob.equipmentId);
      // console.log("--->" + ob.startTime);
      // console.log("--->" + ob.endTime);
      // console.log("--->" + ob.date);
      // console.log("--->" + ob.locationId);

      const res = await axios.post(url, ob);
      const resp = res.data;
      const data = {
        startTime: startTime,
        date: date,
      };
      // console.log("Data:", data);
      toast({
        title: "Card submitted",
        description: "Your card has been submitted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setStartTime("");
      setEndTime("");
      setDate("");
      setLoc("");
      setError(false);
      console.log(res.data);
    } catch (error) {
      // console.log("ooo");
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }

    // if (!equipment.available) {
    //   alert("Equipment is Not Available!!");
    //   return;
    // }
    // if (!startTime || !date) {
    //   toast({
    //     title: "Form Incomplete",
    //     description: "Please fill all the fields",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }
  };
  return (
    <>
      {token != null && !token ? (
        <Flex
          my={20}
          justifyContent="center"
          alignItems="center"
          // borderWidth="1px"
          // borderRadius="lg"
          overflow="hidden"
          // p="4"
          flexDir={{ base: "column", md: "row" }}
        >
          <Stack
            p={8}
            width="full"
            height="full"
            borderWidth={2}
            borderRadius={15}
            boxShadow="2xl"
            border="2px"
            borderColor="white"
            alignItems="center"
          >
            <HStack>
              <Image
                src={equipment.image}
                alt="Card image"
                mr={{ base: 0, md: 4 }}
                boxSize={"400px"}
              />

              <Box mt={{ base: 4, md: 0 }}>
                {error && <ErrorMessage message={ErrorMes}></ErrorMessage>}
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  paddingBottom={3}
                  color="orange"
                >
                  <Text fontWeight={"bold"} fontSize={"2xl"}>
                    {equipment.name}
                  </Text>
                </Box>
                <Box d="flex" alignItems="baseline">
                  <HStack>
                    <Badge
                      borderRadius="full"
                      px="2"
                      colorScheme={equipment.available ? "green" : "red"}
                      mr="2"
                    >
                      {equipment.available ? "Available" : "Unavailable"}
                    </Badge>
                    <Text
                      textTransform="uppercase"
                      fontSize="sm"
                      fontWeight="bold"
                      color="gray.500"
                    >
                      #{equipmentId.id.substr(-4)}
                    </Text>
                  </HStack>
                </Box>

                <Box mt="4">
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                      <FormControl id="start-time" isRequired>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(event) => setStartTime(event.target.value)}
                        />
                        <FormHelperText>Enter the start time</FormHelperText>
                      </FormControl>
                      <FormControl id="end-time" isRequired>
                        <FormLabel>End Time</FormLabel>
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(event) => setEndTime(event.target.value)}
                        />
                        <FormHelperText>Enter the end time</FormHelperText>
                      </FormControl>

                      <FormControl id="date" isRequired>
                        <FormLabel>Date</FormLabel>
                        <Input
                          type="date"
                          value={date}
                          onChange={(event) => setDate(event.target.value)}
                        />
                        <FormHelperText>Enter the date</FormHelperText>
                      </FormControl>
                      <FormControl isRequired>
                        <Select
                          placeholder="Location"
                          size="lg"
                          isRequired
                          value={location._id}
                          onChange={(e) => {
                            setLoc(e.target.value);
                          }}
                        >
                          {/* <option value={""}></option> */}
                          {location.map((loc) => (
                            <option value={loc._id}>{loc.location}</option>
                          ))}
                        </Select>
                        {/* <Input
                      type="text"
                      placeholder="Location"
                      name="location"
                      onChange={handleChange}
                      value={data.location}
                      required
                      size="lg"
                    /> */}
                      </FormControl>

                      <Button
                        type="submit"
                        colorScheme={equipment.available ? "orange" : "red"}
                        disabled={!equipment.available}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Box>
            </HStack>
          </Stack>
        </Flex>
      ) : (
        <Stack
          height="40rem"
          padding={100}
          width={"full"}
          justify={"center"}
          align="center"
        >
          <Spinner />
          <Text>This Page is only accessed by members</Text>
        </Stack>
      )}
    </>
  );
};

export default MyEquipment;
