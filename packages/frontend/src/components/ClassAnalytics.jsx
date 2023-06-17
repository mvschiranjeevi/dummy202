import React, { useState, useEffect } from "react";
import {
  HStack,
  Heading,
  Stack,
  Button,
  Image,
  Box,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { backendApi } from "../constants";

function ClassAnalytics() {
  const [schedules, setSchedules] = useState([]);
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;
  const [data, setData] = useState([]);
  const [allmem, setAllmem] = useState([]);

  const getUnique = (data, mem) => {
    console.log(data);
    let output = data.filter((obj) => obj.userName == mem);
    console.log(output);
    return output;
  };
  const getClassName = async (classId) => {
    const url = `${backendApi}/api/class/className?id=` + classId;
    const { data } = await axios.get(url);
    return data[0].name;
  };
  const getMemberName = async (memberId) => {
    const url = `${backendApi}/api/auth/memberName?id=` + memberId;
    const { data } = await axios.get(url);
    return data[0].firstName;
  };
  const getData = async () => {
    const url = `${backendApi}/api/schedule/prev`;
    const { data } = await axios.get(url);

    const allClasses = data.map(async (el) => ({
      className: await getClassName(el.classId),
      isDeleted: el.isDeleted,
      fromDate: el.fromDate,
      toDate: el.toDate,
      userId: await getMemberName(el.userId),
      userName: el.userId,
    }));
    const allUsers = data.map(async (el) => ({
      userId: await getMemberName(el.userId),
      userName: el.userId,
    }));
    const mem = await Promise.all(allUsers);
    console.log(mem);
    console.log(await Promise.all(allClasses));

    var unique = mem.filter(
      (o, i) => i === mem.findIndex((oo) => o.userId === oo.userId)
    );

    console.log(unique);
    setAllmem(unique);
    setData(await Promise.all(allClasses));

    console.log(data[0]);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {token ? (
        <Flex
          width="full"
          // height="120vh"
          align="center"
          justifyContent="center"
          paddingTop={100}
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
            <Stack width={"full"}>
              <HStack justify={"Center"} paddingBottom={10}>
                <Heading textAlign="center" fontStyle={"italic"}>
                  Members
                </Heading>
                <Heading
                  textAlign="center"
                  fontStyle={"italic"}
                  color={"orange"}
                  fontWeight={"bold"}
                >
                  Class Schedules
                </Heading>
              </HStack>
              {allmem.map((users) => (
                <HStack spacing={10} width={"full"}>
                  <Link to="/">
                    <Text
                      as="b"
                      fontSize={"2xl"}
                      paddingLeft={100}
                      color="orange"
                    >
                      {users.userId}
                    </Text>
                  </Link>

                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Class Name</Th>
                          <Th>From Date</Th>
                          <Th>To Date</Th>
                          <Th>Deleted Registration</Th>
                          {/* <Th>Location</Th> */}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {getUnique(data, users.userName).map((member) => (
                          <Tr>
                            <Td>{member.className}</Td>
                            <Td>{member.fromDate}</Td>
                            <Td>{member.toDate}</Td>
                            <Td textAlign="center">
                              {JSON.stringify(member.isDeleted)}
                            </Td>
                            {/* <Td>{member.location}</Td> */}
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </HStack>
              ))}
            </Stack>
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

export default ClassAnalytics;
