import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Card,
  CardBody,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

export default function EmployeeHome() {
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;
  return (
    <>
      {token ? (
        <Stack
          minH={"100vh"}
          direction={{ base: "column", md: "row" }}
          spacing={10}
        >
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <VStack spacing={5} padding={100}>
              <Link to="/signup">
                <Card
                  w={450}
                  size={"lg"}
                  _hover={{ color: "orange", boxShadow: "dark-lg" }}
                >
                  <CardBody>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={196}
                    >
                      <Text fontSize={20} fontWeight={"bold"}>
                        Add New Member
                      </Text>

                      <MdArrowForwardIos
                        rounded="md"
                        color="orange"
                        size={"30px"}
                        align={"center"}
                        justify={"center"}
                      ></MdArrowForwardIos>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>

              <Link to="/freetrail">
                <Card
                  w={450}
                  size={"lg"}
                  _hover={{ color: "orange", boxShadow: "dark-lg" }}
                >
                  <CardBody>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={183}
                    >
                      <Text fontSize={20} fontWeight={"bold"}>
                        Register Free Trails
                      </Text>
                      <MdArrowForwardIos
                        rounded="md"
                        color="orange"
                        size={"30px"}
                        align={"center"}
                        justify={"center"}
                      ></MdArrowForwardIos>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>

              <Link to="/checkin">
                <Card
                  w={450}
                  size={"lg"}
                  _hover={{ color: "orange", boxShadow: "dark-lg" }}
                >
                  <CardBody>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={169}
                    >
                      <Text fontSize={20} fontWeight={"bold"}>
                        Check-In/Check-Out
                      </Text>
                      <MdArrowForwardIos
                        rounded="md"
                        color="orange"
                        size={"30px"}
                        align={"center"}
                        justify={"center"}
                      ></MdArrowForwardIos>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>

              <Link to="/Myanalytics">
                <Card
                  w={450}
                  size={"lg"}
                  _hover={{ color: "orange", boxShadow: "dark-lg" }}
                >
                  <CardBody>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={225}
                    >
                      <Text fontSize={20} fontWeight={"bold"}>
                        View Analytics
                      </Text>
                      <MdArrowForwardIos
                        rounded="md"
                        color="orange"
                        size={"30px"}
                        align={"center"}
                        justify={"center"}
                      ></MdArrowForwardIos>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            </VStack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={"Login Image"}
              objectFit={"cover"}
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            />
          </Flex>
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
