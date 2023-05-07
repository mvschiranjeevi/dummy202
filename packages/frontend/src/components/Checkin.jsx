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
// import { Button } from "react-scroll";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./Success";

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
  const [checkinfo, setCheckinfo] = useState({});
  const [checkbutton, setCheckbutton] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...checkin, [input.name]: input.value });
  };

  const [data, setData] = useState([]);
  const getData = async () => {
    const url = "http://localhost:8080/api/users";
    const { data } = await axios.get(url);
    console.log(data);
    const members = data.data.map((el) => ({
      userId: el._id,
      firstName: el.firstName,
      lastName: el.lastName,
      email: el.email,
      phoneNumber: el.phoneNumber,
    }));
    console.log(members);
    setData(members);

    // Create Chekin Object
    const defaultCheckin = {
      userId: "",
      checkinTime: "",
      checkoutTime: "",
      date: "",
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

  //checkin info

  const getCheckin = async () => {
    const url = "http://localhost:8080/api/checkin";
    const res = await axios.get(url);
    const resp = res.data;
    console.log(res.data);
    if (resp.data === null) {
      setCheckinfo(true);
    } else {
      setCheckinfo(false);
    }

    // console.log(members);
    // setData(members);
  };
  useEffect(() => {
    getCheckin();
  }, []);

  const [location, setLocation] = useState([]);

  const getLocation = async () => {
    const url = "http://localhost:8080/api/location";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/checkin";
      const res = await axios.post(url, { ...checkin });
      const resp = res.data;
      console.log(res.data);
      if (resp.data === null) {
        // setCheckin(true);
      } else {
        // setCheckin(false);
      }
      // navigate("/employeehome");
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
  // const result = data.items.map((el) => ({
  //   firstName: el.firstName,
  //   lastName: el.lastName,
  //   email: el.email,
  //   phoneNumber: el.phoneNumber,
  // }));

  // const members = [
  //   {
  //     firstName: "Chiranjeevi",
  //     lastName: "Medam",
  //     email: "mvschiranjeevi@gmail.com",
  //     phoneNumber: "2679164820",
  //   },
  //   {
  //     firstName: "John",
  //     lastName: "Gash",
  //     email: "gash@gmail.com",
  //     phoneNumber: "2679164820",
  //   },
  //   {
  //     firstName: "Steph",
  //     lastName: "Curry",
  //     email: "curry@gmail.com",
  //     phoneNumber: "2679164820",
  //   },
  // ];

  const getInfo = (buttons) => {
    if (buttons == "checkIn") {
      return "User Checked In";
    } else {
      return "User Checked Out";
    }
  };
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
          {/* <Stack alignItems="flex-start" width={"full"} paddingLeft={90}> */}
          <HStack spacing={0} paddingBottom={5}>
            <Input
              placeholder="Enter Name"
              onClick={(e) => setSearch(e.target.value)}
            ></Input>
            <Button onClick={() => console.log(search)}>Search</Button>
          </HStack>
          {true ? (
            <SuccessMessage message={getInfo(button)} />
          ) : (
            <ErrorMessage message={"User Already Checked-In Today"} />
          )}
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
                      <Td>{member.firstName}</Td>
                      <Td>{member.lastName}</Td>
                      <Td>{member.email}</Td>
                      <Td>{member.phoneNumber}</Td>
                      <Td>
                        <Select
                          isRequired
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
                          }}
                        >
                          <option value={""}></option>
                          {location.map((loc) => (
                            <option value={loc._id}>{loc.location}</option>
                          ))}
                        </Select>
                      </Td>
                      {setCheckin && (
                        <Td>
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
                      {!setCheckinfo && (
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
                {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
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
