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
} from "@chakra-ui/react";
import axios from "axios";

function ClassAnalytics() {
  const [schedules, setSchedules] = useState([]);
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;
  const [data, setData] = useState([]);

  const getClassName = async (classId) => {
    const url = "http://localhost:8080/api/class/className?id=" + classId;
    const { data } = await axios.get(url);
    // console.log(data);
    return data[0].name;
  };
  const getMemberName = async (memberId) => {
    const url = "http://localhost:8080/api/auth/memberName?id=" + memberId;
    const { data } = await axios.get(url);
    // console.log(data);
    return data[0].firstName + " " + data[0].lastName;
  };
  const getData = async () => {
    const url = "http://localhost:8080/api/schedule/prev";
    const { data } = await axios.get(url);

    const allClasses = data.map(async (el) => ({
      className: await getClassName(el.classId),
      isDeleted: el.isDeleted,
      fromDate: el.fromDate,
      toDate: el.toDate,
      userId: await getMemberName(el.userId),
    }));
    console.log(await Promise.all(allClasses));
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
              <HStack spacing={10}>
                <Text as="b" fontSize={"2xl"}>
                  {data[0].userId}
                </Text>
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
                      {data.map((member) => (
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

export default ClassAnalytics;
