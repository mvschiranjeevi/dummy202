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
} from "@chakra-ui/react";
// import { Button } from "react-scroll";
import ErrorMessage from "./ErrorMessage";
import { useState, useEffect } from "react";
import axios from "axios";
function CheckIn() {
  const [search, setSearch] = useState("");
  const [button, setButton] = useState("");

  const [data, setData] = useState([]);
  const getData = async () => {
    const url = "http://localhost:8080/api/users";
    const { data } = await axios.get(url);
    console.log(data);
    const members = data.data.map((el) => ({
      firstName: el.firstName,
      lastName: el.lastName,
      email: el.email,
      phoneNumber: el.phoneNumber,
    }));
    setData(members);
  };
  useEffect(() => {
    getData();
  }, []);

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
            <Box my={4}>
              <Alert status="success" borderRadius={4}>
                <AlertIcon />
                <AlertDescription>{getInfo(button)}</AlertDescription>
              </Alert>
            </Box>
          ) : (
            <ErrorMessage message={"User Already Checked-In Today"} />
          )}
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th isNumeric>Phone Number</Th>
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
                      <Button
                        colorScheme="orange"
                        size="sm"
                        onClick={() => setButton("checkIn")}
                      >
                        Check-In
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="orange"
                        size="sm"
                        onClick={() => setButton("checkOut")}
                      >
                        Check-Out
                      </Button>
                    </Td>
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
        </>
      </Stack>
    </Flex>
  );
}

export default CheckIn;
