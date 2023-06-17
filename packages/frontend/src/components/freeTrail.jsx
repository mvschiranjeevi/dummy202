import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
  HStack,
  Center,
  Stack,
  CardFooter,
  VStack,
  Select,
} from "@chakra-ui/react";
import "./RegistrationForm.css";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/mockApi";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./Success";
import { backendApi } from "../constants";

import {
  BsFillCalendar2EventFill,
  BsFillHouseDoorFill,
  BsHourglassSplit,
} from "react-icons/bs";
import { BiTimer, BiMobileAlt, BiTaskX } from "react-icons/bi";
import { TiPencil } from "react-icons/ti";
import axios from "axios";
export default function Freetrail() {
  var current = new Date();
  var end = new Date();

  current.setDate(current.getDate());
  end.setMonth(current.getMonth() + 1);

  var date = current.toISOString().substring(0, 10);
  var endDate = end.toISOString().substring(0, 10);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState([]);

  const getLocation = async () => {
    const url = `${backendApi}/api/location`;
    const { data } = await axios.get(url);
    setLocation(data);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess("");
      setError("");
      const url = `${backendApi}/api/freeTrail`;
      const { data: res } = await axios.post(url, {
        ...data,
      });
      setSuccess(res.message);
      setData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        location: "",
      });
      // console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex
      width="full"
      // height="120vh"
      align="center"
      justifyContent="center"
      paddingTop={150}
      paddingLeft={150}
      paddingRight={150}
      paddingBottom={50}
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
        {isLoggedIn ? (
          <Box textAlign="center">
            <Text>{email} logged in!</Text>
            <Button
              // variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => setIsLoggedIn(false)}
            >
              Sign out
            </Button>
          </Box>
        ) : (
          <>
            <Heading
              fontStyle={"italic"}
              fontFamily={"sans-serif"}
              textAlign="center"
            >
              Register Free Trial
            </Heading>
            <HStack justify={"Center"}>
              <Text
                textAlign="center"
                fontStyle={"italic"}
                color={"orange"}
                fontWeight={"bold"}
              >
                Free Trial will be valid
              </Text>
              <Text textAlign="center" fontStyle={"italic"}>
                only for one month Per Person
              </Text>
            </HStack>
            <p>All Fields are Mandatory</p>
            <VStack>
              <Text
                textAlign="center"
                fontStyle={"italic"}
                color={"orange"}
                fontWeight={"bold"}
              >
                Trial Start Date : {date}
              </Text>
              <Text textAlign="center" fontStyle={"italic"}>
                Trial End Date : {endDate}
              </Text>
            </VStack>
            <Box my={4} textAlign="center" maxWidth={700} padding={10}>
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                {success && <SuccessMessage message={success} />}

                <HStack paddingBottom={5}>
                  <FormControl isRequired>
                    <Input
                      placeholder="First Name"
                      name="firstName"
                      onChange={handleChange}
                      value={data.firstName}
                      required
                      type="text"
                      size="lg"
                      // onChange={(event) =>
                      //   setFirstname(event.currentTarget.value)
                      // }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      value={data.lastName}
                      required
                      size="lg"
                      // onChange={(event) =>
                      //   setLastname(event.currentTarget.value)
                      // }
                    />
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    size="lg"
                    // onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={1} paddingBlock={3}></FormControl>
                <HStack paddingBottom={10}>
                  <FormControl isRequired>
                    <Input
                      name="phoneNumber"
                      onChange={handleChange}
                      value={data.phoneNumber}
                      required
                      type="number"
                      placeholder="Phone Number"
                      size="lg"
                      // onChange={(event) => setPhone(event.currentTarget.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Select
                      placeholder="Location"
                      size="lg"
                      isRequired
                      value={location._id}
                      onChange={(e) => {
                        setData({
                          ...data,
                          location: e.target.value,
                        });
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
                </HStack>
                <Stack alignItems="flex-end">
                  <Button
                    // variantColor="teal"
                    bg="#ffa500"
                    type="submit"
                    width="20"
                    mt={4}
                  >
                    {isLoading ? (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="teal"
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Stack>
              </form>
            </Box>
          </>
        )}
      </Stack>
    </Flex>
  );
}
