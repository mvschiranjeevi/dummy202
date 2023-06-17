import { HStack, Heading, Stack, Button, Image, Box } from "@chakra-ui/react";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { backendApi } from "../constants";

import axios from "axios";

const images = ["./gym7.jpg", "./gym4.jpg", "./gym5.jpg", "./gym6.jpg"];

function Class() {
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;
  const [classes, setClasses] = useState([]);

  const getClass = async () => {
    const url = `${backendApi}/api/class`;
    const { data } = await axios.get(url);
    console.log(data);
    const expandClass = data.map((el, i) => ({
      id: el._id,
      name: el.name,
      startDate: el.startDate,
      endDate: el.endDate,
      color: el.color,
      description: el.description,
      schedule: el.schedule,
      image: images[i],
    }));
    console.log(expandClass);
    // setData(members);
    // console.log(data);
    setClasses(expandClass);
  };

  useEffect(() => {
    getClass();
  }, []);
  return (
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
          Available Classes
        </Heading>
      </Stack>
      {classes.map((variant, i) => (
        <Stack
          padding={100}
          maxWidth="full"
          bgColor={variant.color}
          borderWidth={1}
          boxShadow="dark-lg"
          border="2px"
          borderColor="white"
        >
          <Stack>
            <HStack
              width="full"
              flexDirection={i % 2 == 0 ? "row" : "row-reverse"}
            >
              <Box>
                <Heading color={"orange"}>{variant.name}</Heading>
                <p>{variant.description}</p>
                <HStack paddingTop={5} paddingBottom={5}>
                  <HStack>
                    <BsFillCalendarCheckFill></BsFillCalendarCheckFill>
                    <p>{variant.startDate} - </p>
                  </HStack>
                  <HStack>
                    <BsFillCalendarCheckFill></BsFillCalendarCheckFill>
                    <p> {variant.endDate}</p>
                  </HStack>
                </HStack>

                {!token && token != null && (
                  <Link to={"/schedule/" + variant.id}>
                    <Button colorScheme="orange">See Schedule</Button>
                  </Link>
                )}

                {token == null && (
                  <Link to={"/schedules/" + variant.id}>
                    <Button colorScheme="orange">See Schedule</Button>
                  </Link>
                )}
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
  );
}

export default Class;
