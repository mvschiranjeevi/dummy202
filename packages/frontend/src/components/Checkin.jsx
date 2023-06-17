import {
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  InputRightAddon,
  Flex,
  Heading,
  InputGroup,
  Button,
  HStack,
  Text,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";

import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./Success";
import { backendApi } from "../constants";

import { useState, useEffect } from "react";
import axios from "axios";
function CheckIn() {
  const d = new Date();

  var dd = String(d.getDate()).padStart(2, "0");
  var mm = String(d.getMonth() + 1).padStart(2, "0");
  var yyyy = d.getFullYear();

  var today = mm + "/" + dd + "/" + yyyy;
  const [search, setSearch] = useState("");
  const [button, setButton] = useState("");
  const [error, setError] = useState("");

  const [checkin, setCheckin] = useState({});
  const [checkInfo, setCheckInfo] = useState([]);
  const [checkbutton, setCheckbutton] = useState(false);
  const [locationNames, setLocastionNames] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...checkin, [input.name]: input.value });
  };

  const [data, setData] = useState([]);
  const getData = async () => {
    const url = `${backendApi}/api/users`;
    const { data } = await axios.get(url);
    console.log(data);
    const members = data.data.map((el) => ({
      userId: el._id,
      firstName: el.firstName,
      lastName: el.lastName,
      email: el.email,
      phoneNumber: el.phoneNumber,
      isRequired: true,
    }));
    console.log(members);
    setData(members);

    // Create Chekin Object
    const defaultCheckin = {
      userId: "",
      checkinTime: "",
      checkoutTime: "",
      date: { today },
      locationId: "",
    };
    members.forEach((member) => {
      setCheckin((checkin) => ({
        ...checkin,
        [member.userId]: defaultCheckin,
      }));
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const [refresh, setRefresh] = useState(true);

  // const getLocationNames = async (locationId) => {
  //   const url =
  //     "http://3.22.95.113:8080/api/location/getName?classId=" + locationId;
  //   const { data } = await axios.get(url);
  //   console.log("---", data[0].location);
  //   return data[0].location;
  // };
  //checkin info

  // const showLocation = async (userId) => {
  //   const checko = checkInfo.find((info) => info.userId === userId);
  //   return checko.locationId;
  //   // const x = await Promise.all(getLocationNames(checko["locationId"]));

  //   // console.log("ppo", x);
  //   // return checko[0].lo;
  // };

  const showCheckInButton = (userId) => {
    const checkInData = checkInfo.find((info) => info.userId === userId);
    console.log(checkInData, "Hello");
    console.log(checkInfo, "Hellol");

    if (!checkInData) {
      return true;
    }
    if (checkInData["isCompleted"] == undefined) {
      return true;
    }
    console.log(userId, checkInData["isCompleted"]);
    return !!checkInData["isCompleted"];
  };

  const getCheckin = async () => {
    let url = `${backendApi}/api/checkin/?userId=64555b8b8648824c963e1707&date=05/07/2023`;

    const checkInfos = {};
    const promises = data.map(async (member) => {
      console.log(member, "ppp");
      console.log(checkin, "ppppp");
      url = `${backendApi}/api/checkin/date/?userId=${member.userId}`;
      var datevalue = await axios.get(url);
      console.log(datevalue, "kdkd");
      datevalue = datevalue.data.data.date;
      console.log(datevalue, "lkl");
      var dateToday = "05/07/2023";
      console.log(dateToday, "ppp");
      url = `${backendApi}/api/checkin/?userId=${member.userId}&date=${datevalue}`;
      const res = await axios.get(url);
      const resp = res.data;
      return await resp.data;
    });
    setCheckInfo(await Promise.all(promises));
  };
  useEffect(() => {
    getCheckin();
  }, [data]);

  const [location, setLocation] = useState([]);

  const getLocation = async () => {
    const url = `${backendApi}/api/location`;
    const { data } = await axios.get(url);
    console.log(data);
    setLocation(data);
  };

  useEffect(() => {
    getLocation();
  }, []);
  const [value, setValue] = useState("");

  const getLocationName = (id) => {
    var result = location?.find((loc) => {
      return loc._id === id;
    });
    return result?.location ?? "Unknown Location";
  };

  const [buttonVal, setButtonVal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendApi}/api/checkin`;
      let payload = Object.values(checkin);
      payload = payload.filter((member) => !!member.userId);
      // console.log("176", payload);
      const res = await axios.post(url, payload);
      setRefresh(!refresh);
      setButtonVal(true);
      const resp = res.data;
      console.log(res.data);
      getCheckin();
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

  const getLocationNames = async (locationId) => {
    const url =
      `${backendApi}/api/location/getName?classId=` + locationId;
    const { data } = await axios.get(url);
    console.log("---", data[0].location);
    return data[0].location;
  };

  useEffect(() => {
    checkInfo.forEach(async (user) => {
      const locationName = await getLocationNames(user.locationId);
      setLocastionNames((names) => ({
        ...names,
        [user.userId]: locationName,
      }));
    });
  }, [checkInfo]);

  const getInfo = (buttons) => {
    if (buttons == "checkIn") {
      return "User Checked In/Checked Out Successfully";
    } else {
      return "User Checked In/Checked Out Successfully";
    }
  };
  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      paddingTop={150}
      paddingLeft={50}
      paddingRight={50}
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
        <>
          <HStack justify={"Center"} paddingBottom={10}>
            <Heading
              textAlign="center"
              fontStyle={"italic"}
              color={"orange"}
              fontWeight={"bold"}
            >
              Check-In/Check-Out
            </Heading>
            <Heading textAlign="center" fontStyle={"italic"}>
              Members
            </Heading>
          </HStack>
          {buttonVal ? <SuccessMessage message={getInfo(button)} /> : <></>}
          <form onSubmit={handleSubmit}>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                    <Th isNumeric>Phone Number</Th>
                    <Th>Location</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((member) => (
                    <Tr>
                      <Td size="sm">{member.firstName}</Td>
                      <Td size="sm">{member.lastName}</Td>
                      <Td size="sm">{member.email}</Td>
                      <Td size="sm">{member.phoneNumber}</Td>
                      <Td>
                        {showCheckInButton(member.userId) && (
                          <Select
                            w="10rem"
                            value={checkin[member.userId].locationId}
                            onChange={(e) => {
                              let memberCheckin = checkin[member.userId];
                              memberCheckin = {
                                ...memberCheckin,
                                locationId: e.target.value,
                              };
                              setCheckin((checkin) => ({
                                ...checkin,
                                [member.userId]: memberCheckin,
                              }));

                              const updateRequired = data.map((member) => {
                                return {
                                  ...member,
                                  isRequired: false,
                                };
                              });
                              setData(updateRequired);
                            }}
                          >
                            <option value={""}></option>
                            {location.map((loc) => (
                              <option value={loc._id}>{loc.location}</option>
                            ))}
                          </Select>
                        )}
                        {!showCheckInButton(member.userId) && (
                          <Text>{locationNames[member.userId]}</Text>
                        )}
                      </Td>
                      {/* {console.log("**", showCheckInButton(member.userId))} */}
                      {showCheckInButton(member.userId) && (
                        <Td width={"80%"}>
                          <Button
                            colorScheme="orange"
                            size="sm"
                            onClick={() => {
                              let memberCheckin = checkin[member.userId];
                              memberCheckin = {
                                ...memberCheckin,
                                date: today,
                                checkinTime:
                                  d.getHours() +
                                  ":" +
                                  d.getMinutes() +
                                  ":" +
                                  d.getSeconds(),
                                userId: member.userId,
                                isCompleted: false,
                              };
                              setCheckin((checkin) => {
                                console.log({
                                  ...checkin,
                                  [member.userId]: memberCheckin,
                                });
                                return {
                                  ...checkin,
                                  [member.userId]: memberCheckin,
                                };
                              });
                              setCheckbutton(true);
                            }}
                          >
                            Check-In
                          </Button>
                        </Td>
                      )}
                      {!showCheckInButton(member.userId) && (
                        <Td>
                          <Button
                            colorScheme="orange"
                            size="sm"
                            onClick={() => {
                              let memberCheckin = checkin[member.userId];
                              memberCheckin = {
                                ...memberCheckin,
                                date: today,
                                checkoutTime:
                                  d.getHours() +
                                  ":" +
                                  d.getMinutes() +
                                  ":" +
                                  d.getSeconds(),
                                userId: member.userId,
                                isCompleted: true,
                              };
                              setCheckin((checkin) => {
                                console.log({
                                  ...checkin,
                                  [member.userId]: memberCheckin,
                                });
                                return {
                                  ...checkin,
                                  [member.userId]: memberCheckin,
                                };
                              });
                              setCheckbutton(true);
                            }}
                          >
                            Check-Out
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {checkbutton && (
              <Stack width={"full"} alignItems={"flex-end"} paddingTop={10}>
                <Button colorScheme={"orange"} type="submit">
                  Save
                </Button>
              </Stack>
            )}
          </form>
        </>
      </Stack>
    </Flex>
  );
}

export default CheckIn;
