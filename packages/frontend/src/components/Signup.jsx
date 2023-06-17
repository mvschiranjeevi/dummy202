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
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import "./RegistrationForm.css";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/mockApi";
import ErrorMessage from "./ErrorMessage";
import {
  BsFillCalendar2EventFill,
  BsFillHouseDoorFill,
  BsHourglassSplit,
} from "react-icons/bs";
import { BiTimer, BiMobileAlt, BiTaskX } from "react-icons/bi";
import { TiPencil } from "react-icons/ti";
import { backendApi } from "../constants";

export default function Signup() {
  const [selectedMember, setSelectedMember] = useState([""]);
  // console.log(selectedMember);
  const [page, setPage] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    membershipId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendApi}/api/users`;
      const { data: res } = await axios.post(url, {
        ...data,
        isEmployee: false,
      });
      navigate("/employeehome");
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
  const member = [
    {
      id: 1,
      name: "Premier",
      money: "209",
      division: "15.20",
      desc1: "Unlimited Classes (recommended for usage of 3x/week or more)",
      desc2: "Money Back Guarantee",
    },
    {
      id: 2,
      name: "Elite",
      money: "149",
      division: "18.63",
      desc1: "8 Classes Monthly (avg. usage of 2x/week)",
      desc2: "Discounted Add-On Classes",
    },
    {
      id: 3,
      name: "Basic",
      money: "99",
      division: "24.75",
      desc1: "4 Classes Monthly (avg. usage of 1x/week)",
      desc2: "Discounted Add-On Classes",
    },
  ];

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex
      width="full"
      // height="120vh"
      align="center"
      justifyContent="center"
      paddingTop={150}
      paddingLeft={100}
      paddingRight={100}
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
            <HStack justify={"Center"}>
              <Text
                textAlign="center"
                fontStyle={"italic"}
                color={"orange"}
                fontWeight={"bold"}
              >
                Step 1
              </Text>
              <Text textAlign="center" fontStyle={"italic"}>
                of 2
              </Text>
            </HStack>
            <Heading
              fontStyle={"italic"}
              fontFamily={"sans-serif"}
              textAlign="center"
            >
              ADD NEW MEMBER
            </Heading>
            <p>All Fields are Mandatory</p>
            <Box my={4} textAlign="center" padding={10}>
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
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
                  />
                </FormControl>
                <FormControl isRequired mt={1} paddingBlock={5}>
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={data.password}
                      required
                      type={showPassword ? "text" : "password"}
                      size="lg"
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <Icon name="view-off" />
                        ) : (
                          <Icon name="view" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
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

                <HStack justify={"Center"}>
                  <Text
                    textAlign="center"
                    fontStyle={"italic"}
                    color={"orange"}
                    fontWeight={"bold"}
                  >
                    Step 2
                  </Text>
                  <Text textAlign="center" fontStyle={"italic"}>
                    of 2
                  </Text>
                </HStack>
                <Heading
                  fontStyle={"italic"}
                  fontFamily={"sans-serif"}
                  textAlign="center"
                >
                  SELECT MEMBERSHIP
                </Heading>
                <HStack
                  paddingTop={50}
                  // paddingLeft={200}
                  // paddingRight={200}
                  paddingBottom={50}
                  spacing={4}
                >
                  {member.map((variant, i) => (
                    <Card key={i} variant={variant.id} shadow="md" width={350}>
                      <CardHeader>
                        <Heading size="lg"> {variant.name}</Heading>
                        <Text color="orange" fontSize={"2xl"} as="b">
                          ${variant.money}
                        </Text>
                        <Text fontSize="xs">
                          {" "}
                          ${variant.division} / per class
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <HStack>
                          <TiPencil size={30}></TiPencil>
                          <Text> {variant.desc1}</Text>
                        </HStack>
                        <HStack>
                          <TiPencil size={20}></TiPencil>
                          <Text> {variant.desc2}</Text>
                        </HStack>
                      </CardBody>
                      <CardFooter>
                        {variant.id != data.membershipId ? (
                          <Button
                            color="white"
                            bgColor={"orange"}
                            onClick={() => {
                              setData({ ...data, membershipId: member[i].id });
                              console.log({
                                ...data,
                                membershipId: member[i].id,
                              });
                            }}
                          >
                            Select
                          </Button>
                        ) : (
                          <Button
                            color="white"
                            bgColor={"teal"}
                            onClick={() => {
                              console.log({
                                ...data,
                                membershipId: "",
                              });
                              setData({ ...data, membershipId: "" });
                            }}
                          >
                            Selected
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </HStack>
                <Stack alignItems="flex-end">
                  <Button
                    bg="#ffa500"
                    type="submit"
                    width="20"
                    mt={4}
                    color={"white"}
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
