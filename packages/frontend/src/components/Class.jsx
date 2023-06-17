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
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SuccessMessage from "./Success";
import ErrorMessage from "./ErrorMessage";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { backendApi } from "../constants";

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
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;
  const [refresh, setRefresh] = useState(false);
  const memberId = JSON.parse(localStorage.getItem("token"));
  const memberIds = memberId.data._id;
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

  const [location, setLocation] = useState([]);
  const [locvalue, setLocalvalue] = React.useState(null);
  //   console.log(locvalue);

  const getLocation = async () => {
    const url = `${backendApi}/api/location`;
    const { data } = await axios.get(url);
    console.log(data);
    setLocation(data);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const [data, setData] = useState({});
  const [bool, setBool] = useState({});

  const getSchedule = async () => {
    const url =
      `${backendApi}/api/schedule?userId=` +
      memberIds +
      "&classId=" +
      routeParams.id;
    const { data } = await axios.get(url);
    if (data.length != 0) {
      setData(data);
      setBool(false);
      getLocationName(data[0].locationId).then((locationName) =>
        setData((data) => {
          return [{ ...data[0], locationName }];
        })
      );
    } else {
      setData({
        userId: memberIds,
        classId: classid,
        schedule: [],
        fromDate: "",
        toDate: "",
        locationId: "",
        locationName: "",
      });
      setBool(true);
    }

    console.log(bool);
  };

  useEffect(() => {
    getSchedule();
  }, [refresh]);

  const [error, setError] = useState("");
  const [errorMes, setErrorMes] = useState("");

  const [dateerror, setDateerror] = useState(false);

  //   const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendApi}/api/schedule`;
      const from = data.fromDate.split("-");
      const to = data.toDate.split("-");
      console.log(from);
      console.log(to);

      if (from[0] > to[0]) {
        setDateerror(true);
        setErrorMes("From Date Cannot Be Greater Than To Date");
        return;
      } else if (from[1] > to[1]) {
        // console.log(from[1], to[1]);
        setErrorMes("From Date Cannot Be Greater Than To Date");

        setDateerror(true);
        return;
      } else if (from[1] == to[1] && from[2] > to[2]) {
        // console.log(from[2], to[2]);
        setErrorMes("From Date Cannot Be Greater Than To Date");

        setDateerror(true);
        return;
      }
      const d = new Date();

      // console.log(today);
      // console.log(fromDate, today);
      var dd = String(d.getDate()).padStart(2, "0");
      var mm = String(d.getMonth() + 1).padStart(2, "0");
      var yyyy = d.getFullYear();

      var today = yyyy + "-" + mm + "-" + dd;
      // console.log(data);
      if (data.fromDate < today) {
        setDateerror(true);
        setErrorMes("From Date Cannot Be In The Past");
        return;
      }
      const { data: res } = await axios.post(url, {
        ...data,
        isDeleted: false,
      });
      setRefresh(!refresh);
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

  const deleteHandle = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendApi}/api/schedule/delete`;
      const { data: res } = await axios.post(url, {
        ...data,
      });
      setRefresh(!refresh);
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
  const getLocationName = async (locationId) => {
    const url =
      `${backendApi}/api/location/getName?classId=` + locationId;
    const { data } = await axios.get(url);
    return data[0].location;
  };

  return (
    <>
      {token != null && !token ? (
        <Stack spacing={0}>
          <form onSubmit={handleSubmit}>
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

            {bool && (
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
                            <Checkbox
                              size="md"
                              colorScheme="green"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setData((data) => {
                                    const schedule = data.schedule;
                                    schedule[i] = days[i] + " " + variant;
                                    data.schedule = schedule;
                                    return data;
                                  });
                                } else {
                                  setData((data) => {
                                    const schedule = data.schedule;
                                    schedule[i] = "";
                                    data.schedule = schedule;
                                    return data;
                                  });
                                }
                              }}
                            >
                              {days[i]} :- {variant} AM
                            </Checkbox>
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
                            <Checkbox
                              size="md"
                              colorScheme="green"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setData((data) => {
                                    const schedule = data.schedule;
                                    schedule[4 + i] =
                                      days[4 + i] + " " + variant;
                                    data.schedule = schedule;
                                    return data;
                                  });
                                } else {
                                  setData((data) => {
                                    const schedule = data.schedule;
                                    schedule[i] = "";
                                    data.schedule = schedule;
                                    return data;
                                  });
                                }
                              }}
                            >
                              {days[4 + i]} :- {variant} AM
                            </Checkbox>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                    <Stack paddingLeft={100}>
                      <Image src={image} width="30rem"></Image>
                    </Stack>
                  </HStack>
                </Stack>
                <Divider />
                <Stack padding={10} alignItems={"center"} width={"100%"}>
                  <Heading color={"orange"} textAlign={"center"}>
                    Enter Details
                  </Heading>

                  {dateerror && (
                    <Stack padding={2}>
                      <ErrorMessage message={errorMes}></ErrorMessage>
                    </Stack>
                  )}

                  <HStack>
                    <FormLabel>Location</FormLabel>

                    <Select
                      isRequired
                      value={location._id}
                      onChange={(e) => {
                        setData({
                          ...data,
                          locationId: e.target.value,
                          classId: classid,
                        });
                      }}
                    >
                      <option value={""}></option>
                      {location.map((loc) => (
                        <option value={loc._id}>{loc.location}</option>
                      ))}
                    </Select>
                    <FormLabel>From Date</FormLabel>
                    <FormControl isRequired>
                      <Input
                        placeholder="From Date"
                        name="formDate"
                        onChange={(e) => {
                          setData({
                            ...data,
                            fromDate: e.target.value,
                          });
                        }}
                        value={data.fromDate}
                        required
                        type="date"
                      />
                    </FormControl>
                    <FormLabel>To Date</FormLabel>
                    <FormControl isRequired>
                      <Input
                        placeholder="To Date"
                        name="toDate"
                        onChange={(e) => {
                          setData({
                            ...data,
                            toDate: e.target.value,
                          });
                        }}
                        value={data.toDate}
                        required
                        type="date"
                        // size="lg"
                      />
                    </FormControl>
                    <Button
                      bg="#ffa500"
                      type="submit"
                      width="60"
                      mt={4}
                      color={"white"}
                    >
                      Submit
                    </Button>
                  </HStack>
                </Stack>
              </>
            )}

            {!bool && (
              <Stack alignItems={"center"} width={"full"} padding={10}>
                <HStack>
                  <Heading color={"orange"}>
                    Your Class Schedule - {name}
                  </Heading>
                  <Stack paddingLeft={100}>
                    <Button colorScheme="orange" onClick={deleteHandle}>
                      Cancel Registration
                    </Button>
                  </Stack>
                </HStack>
                <TableContainer padding={10}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Day</Th>
                        <Th>From Date</Th>
                        <Th>Start Date</Th>
                        <Th>From</Th>
                        <Th>Day</Th>
                        <Th>Location</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data[0].schedule.map((member) => (
                        <Tr>
                          <Td>{member.split(" ")[0]}</Td>
                          <Td>{member.split(" ")[1]} AM</Td>
                          <Td>{member.split(" ")[3]} AM</Td>
                          <Td>{data[0].fromDate}</Td>
                          <Td>{data[0].toDate}</Td>

                          <Td>{data[0].locationName}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Stack>
            )}
          </form>
        </Stack>
      ) : (
        <Stack
          height="40rem"
          padding={100}
          width={"full"}
          justify={"center"}
          align="center"
        >
          <Spinner />
          <Text>This Page is only accessed by employees</Text>
        </Stack>
      )}
    </>
  );
}

export default Schedule;
