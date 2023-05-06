import { HStack, Heading, Stack, Button, Image, Box } from "@chakra-ui/react";
import React from "react";
import { BsFillCalendarCheckFill } from "react-icons/bs";

const Classschedule = [
  {
    name: "Rowing",
    description:
      "Every stroke on the rower activates 85% of your body’s muscles. This low impact workout helps you improve endurance, strength and power.",
    startDate: "05/20/2023",
    endDate: "10/20/2023",
    people: 5,
    color: "#f2f2f2",
    image: "./gym7.jpg",
  },
  {
    name: "Boxing",
    description:
      "We intend to teach you real techniques that real fighters use and to help you achieve your health and fitness goals using metrically-driven improvement for targeted results,whether they be inside or outside of the ring",
    startDate: "05/20/2023",
    endDate: "10/20/2023",
    people: 6,
    color: "white",
    image: "./gym4.jpg",
  },

  {
    name: "Strength Training",
    description:
      "Our weight and floor exercises change daily so you can focus on different muscles. Your coach can provide options for any movement if you have injuries or limitations.",
    startDate: "05/20/2023",
    endDate: "10/20/2023",
    people: 6,
    color: "#f2f2f2",
    image: "./gym5.jpg",
  },
  {
    name: "Cardio",
    description:
      "Whether you walk, jog or run, you’ll go at your own pace based on your fitness level. We also have bikes and striders available as alternates to the treadmill.",
    startDate: "05/20/2023",
    endDate: "10/20/2023",
    people: 6,
    color: "white",
    image: "./gym6.jpg",
  },
];
function Class() {
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
      {Classschedule.map((variant, i) => (
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
                <Button colorScheme="orange">Register</Button>
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
