import React, { useState, useEffect } from "react";

import { backendApi } from "../constants";
import {
  Box,
  Flex,
  Image,
  Badge,
  Text,
  Button,
  Stack,
  HStack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { BsFillCalendarCheckFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import axios from "axios";

const EquipmentCard = ({ equipment }) => {
  // write backend code to get equpment list

  return (
    <Box>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        alignItems="center"
        p="4"
      >
        <Image
          src={equipment.image}
          alt={equipment.name}
          mr="4"
          boxSize={"200px"}
        />

        <Box>
          <Box d="flex" alignItems="baseline">
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={equipment.available ? "green" : "red"}
              mr="2"
            >
              {equipment.available ? "Available" : "Unavailable"}
            </Badge>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
              color="gray.500"
            >
              #{equipment._id.substr(-4)}
            </Text>
          </Box>

          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {equipment.name}
          </Box>

          <Box mt="2">
            <Link to={`/myequipment/${equipment._id}`}>
              <Button
                colorScheme="orange"
                size="sm"
                disabled={!equipment.available}
              >
                Book
              </Button>
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const MyEquipments = (props) => {
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;

  let tokens = token
    ? JSON.parse(localStorage.getItem("token")).data._id
    : null;
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const [equipments, setEquipments] = useState([]);

  const getEquipments = async () => {
    const url = `${backendApi}/api/equipment`;
    const data = await axios.get(url);
    console.log(data.data);
    setEquipments(data.data);
    console.log(equipments);
  };

  useEffect(() => {
    getEquipments();
  }, []);

  const handleClick = (equipment) => {
    setSelectedEquipmentId(equipment.id);
    props.getEquipmentId(equipment);
  };
  return (
    <>
      {token != null && !token ? (
        <Stack spacing={0}>
          <Stack
            // padding={100}
            bgImage="url(gym2.jpg)"
            height={"35rem"}
            bgSize={"cover"}
            justify="center"
            align="center"
            backgroundPosition="center"
          >
            <Heading size="3xl" color="white">
              Available Gym Equipment
            </Heading>
          </Stack>

          {equipments.map((variant, i) => (
            <Stack
              padding={100}
              maxWidth="full"
              bgColor={i % 2 == 0 ? "white" : "#f2f2f"}
              borderWidth={1}
              boxShadow="dark-lg"
              border="1px"
              borderColor={i % 2 == 0 ? "white" : "#f2f2f  "}
            >
              <Stack spacing={0}>
                <HStack
                  width="full"
                  flexDirection={i % 2 == 0 ? "row" : "row-reverse"}
                >
                  <Box>
                    <Heading color={"orange"}>{variant.name}</Heading>
                    <HStack>
                      <Stack padding={2}>
                        <p> #{variant._id.substr(-4)}</p>
                      </Stack>
                      <Badge
                        borderRadius="full"
                        px="2"
                        colorScheme={variant.available ? "green" : "red"}
                        mr="2"
                      >
                        {variant.available ? "Available" : "Unavailable"}
                      </Badge>
                    </HStack>

                    <p>{variant.description}</p>

                    <p>
                      A device moved by persons treading on steps set around the
                      rim of a wide wheel or by animals walking on an endless
                      belt
                    </p>
                    <Stack paddingTop={3}>
                      {!token && token != null && (
                        <Link
                          to={`/myequipment/${variant._id}`}
                          disabled={!variant.available}
                        >
                          <Button colorScheme="orange">Book</Button>
                        </Link>
                      )}
                    </Stack>
                  </Box>
                  <Image
                    src={variant.image}
                    width="30rem"
                    paddingLeft={i % 2 == 0 ? "5rem" : "0rem"}
                    paddingRight={i % 2 == 0 ? "0rem" : "5rem"}
                  ></Image>
                </HStack>
              </Stack>
            </Stack>
          ))}
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
          <Text>This Page is only accessed by members</Text>
        </Stack>
      )}
    </>
  );
};

export default MyEquipments;
