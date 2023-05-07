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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const memberId = JSON.parse(localStorage.getItem("token"));
  const memberIds = memberId.data._id;
  const routeParams = useParams();
  const uri = "http://localhost:8080/api/class/schedule/?id=" + routeParams.id;

  const [classes, setClasses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [image, setImage] = useState([]);
  const [name, setName] = useState([]);
  const [startdate, setStartdate] = useState([]);
  const [classid, setClassid] = useState("");

  const [enddate, setEnddate] = useState([]);

  const getClass = async () => {
    const { data } = await axios.get(uri);
    console.log(data);
    const expandClass = data.map((el, i) => {
      console.log(images[el.name], el._id);
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
    setClassid(expandClass[0].name);
    console.log();
  };
  const firstSchedule = schedule.slice(0, 4);
  const secondSchedule = schedule.slice(4, 7);
  useEffect(() => {
    getClass();
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

  const [data, setData] = useState({
    userId: memberIds,
    classId: classid,
    Schedule: [],
    fromDate: "",
    toDate: "",
    locationId: "",
  });
  const [error, setError] = useState("");
  //   const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, {
        ...data,
        isEmployee: true,
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
  return (
    <Stack spacing={0}>
      <form>
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

        <Stack
          padding={50}
          maxWidth="full"
          // bgColor={variant.color}
          paddingLeft={100}
          borderWidth={1}
          // boxShadow="dark-lg"
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
                    <Checkbox size="md" colorScheme="green">
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
                  // bgColor={variant.color}
                  borderWidth={1}
                  border="2px"
                  borderColor="gray"
                >
                  <Box>
                    <Checkbox size="md" colorScheme="green" onClick={""}>
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
          <HStack>
            <FormLabel>Location</FormLabel>

            <Select isRequired onChange={handleChange}>
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
                onChange={handleChange}
                value={data.fromDate}
                required
                type="date"
                // size="lg"
              />
            </FormControl>
            <FormLabel>To Date</FormLabel>
            <FormControl isRequired>
              <Input
                placeholder="To Date"
                name="toDate"
                onChange={handleChange}
                value={data.fromDate}
                required
                type="date"
                // size="lg"
              />
            </FormControl>
            <Button
              bg="#ffa500"
              type="submit"
              width="60"
              onSubmit={""}
              mt={4}
              color={"white"}
            >
              Submit
            </Button>
          </HStack>
        </Stack>
      </form>
    </Stack>
  );
}

export default Schedule;
