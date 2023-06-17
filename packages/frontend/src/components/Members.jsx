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
  Spinner,
} from "@chakra-ui/react";
// import { Button } from "react-scroll";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./Success";
import { backendApi } from "../constants";

import { useState, useEffect } from "react";
import axios from "axios";
function Members() {
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;

  const getLocationNames = async (locationId) => {
    const url =
      `${backendApi}/api/location/getName?classId=` + locationId;
    const { data } = await axios.get(url);
    console.log("---", data[0].location);
    return data[0].location;
  };
  const [data, setData] = useState([]);
  const getData = async () => {
    const url = `${backendApi}/api/users`;
    const { data } = await axios.get(url);
    console.log(data);
    const members = data.data.map(async (el) => ({
      userId: el._id,
      firstName: el.firstName,
      lastName: el.lastName,
      email: el.email,
      phoneNumber: el.phoneNumber,
      isRequired: true,
      location: el.location,
      locationName: await getLocationNames(el.location),
    }));
    console.log(await Promise.all(members));
    setData(await Promise.all(members));

    // Create Chekin Object
    // const defaultCheckin = {
    //   userId: "",
    //   checkinTime: "",
    //   checkoutTime: "",
    //   date: { today },
    //   locationId: "",
    // };
  };
  useEffect(() => {
    getData();
  }, []);

  const [location, setLocation] = useState([]);

  const getLocation = async () => {
    const url = `${backendApi}/api/location`;
    const { data } = await axios.get(url);
    console.log(data);
    setLocation(data);
  };

  return (
    <>
      {token ? (
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
                <Heading textAlign="center" fontStyle={"italic"}>
                  All
                </Heading>
                <Heading
                  textAlign="center"
                  fontStyle={"italic"}
                  color={"orange"}
                  fontWeight={"bold"}
                >
                  Members
                </Heading>
              </HStack>
              {/* <Stack alignItems="flex-start" width={"full"} paddingLeft={90}> */}

              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>First Name</Th>
                      <Th>Last Name</Th>
                      <Th>Email</Th>
                      <Th isNumeric>Phone Number</Th>
                      <Th>Location</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((member) => (
                      <Tr>
                        <Td>{member.firstName}</Td>
                        <Td>{member.lastName}</Td>
                        <Td>{member.email}</Td>
                        <Td>{member.phoneNumber}</Td>
                        <Td>{member.locationName}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
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
          <Text>This Page is only accessed by employees</Text>
        </Stack>
      )}
    </>
  );
}

export default Members;
