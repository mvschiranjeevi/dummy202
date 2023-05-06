import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
  Center,
  Text,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import {
  BsFillCalendar2EventFill,
  BsFillHouseDoorFill,
  BsHourglassSplit,
} from "react-icons/bs";
import { BiTimer, BiMobileAlt, BiTaskX } from "react-icons/bi";
import { TiPencil } from "react-icons/ti";

function Membership() {
  const [selectedMember, setSelectedMember] = useState([""]);
  console.log(selectedMember);
  const member = [
    {
      id: 1,
      name: "Premier",
      money: "209",
      division: "15.20",
      desc1: "Unlimited Classes (recommended for usage of 3x/week or more)",
      desc2: "Money Back Guarantee",
    },
    {
      id: 2,
      name: "Elite",
      money: "149",
      division: "18.63",
      desc1: "8 Classes Monthly (avg. usage of 2x/week)",
      desc2: "Discounted Add-On Classes",
    },
    {
      id: 3,
      name: "Basic",
      money: "99",
      division: "24.75",
      desc1: "4 Classes Monthly (avg. usage of 1x/week)",
      desc2: "Discounted Add-On Classes",
    },
  ];

  return (
    <Stack alignItems={"center"} marginTop={100}>
      <Heading>Membership Prices</Heading>
      <Text>
        Our month-to-month memberships are flexible to fit your lifestyle and
        fitness goals. Select from a variety of fitness membership options
        below.
      </Text>
      <HStack
        paddingTop={50}
        paddingLeft={200}
        paddingRight={200}
        paddingBottom={50}
        spacing={4}
        // templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {member.map((variant, i) => (
          <Card key={i} variant={variant.id} shadow="md" width={350}>
            <CardHeader>
              <Heading size="lg"> {variant.name}</Heading>
              <Text color="orange" fontSize={"2xl"} as="b">
                ${variant.money}
              </Text>
              <Text fontSize="xs"> ${variant.division} / per class</Text>
            </CardHeader>
            <CardBody>
              <HStack>
                <TiPencil size={30}></TiPencil>
                <Text> {variant.desc1}</Text>
              </HStack>
              <HStack>
                <TiPencil size={20}></TiPencil>
                <Text> {variant.desc2}</Text>
              </HStack>
            </CardBody>
            <CardFooter>
              <Button
                color="white"
                bgColor={"orange"}
                onClick={() => setSelectedMember(member[i])}
              >
                Purchase
              </Button>
              {/* <Button>Current Plan</Button> */}
            </CardFooter>
          </Card>
        ))}

        {/* <Card shadow="md">
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card> */}
      </HStack>

      <Heading>Fitness Membership Benefits</Heading>
      <HStack paddingBottom={10}>
        <VStack>
          <Card shadow="md" width={450}>
            <CardBody>
              <HStack>
                <BsFillHouseDoorFill
                  size={30}
                  color="orange"
                ></BsFillHouseDoorFill>
                <Text>Access to gym facilities Nationwide Privileges</Text>
              </HStack>
            </CardBody>
          </Card>
          <Card shadow="md" width={450}>
            <CardBody>
              <HStack>
                <BsFillCalendar2EventFill
                  size={30}
                  color="orange"
                ></BsFillCalendar2EventFill>
                <Text>Month-to-Month Contract 30-Day Cancellation</Text>
              </HStack>
            </CardBody>
          </Card>
          <Card shadow="md" width={450}>
            <CardBody>
              <HStack>
                <BiTimer size={30} color="orange"></BiTimer>
                <Text>Flexible Class Time Open 7 Days per Week</Text>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
        <VStack>
          <Card shadow="md" width={450}>
            <CardBody>
              <HStack>
                <BiMobileAlt size={30} color="orange"></BiMobileAlt>
                <Text>Mobile App to book class and track performance </Text>
              </HStack>
            </CardBody>
          </Card>
          <Card shadow="md" width={450}>
            <CardBody>
              <HStack>
                <BsHourglassSplit size={30} color="orange"></BsHourglassSplit>
                <Text>Freeze Privileges Max 60-days up to 2x/year </Text>
              </HStack>
            </CardBody>
          </Card>
          <Card shadow="md" width={450}>
            <CardBody>
              <HStack>
                <BiTaskX size={30} color="orange"></BiTaskX>
                <Text>No Long Term Contracts</Text>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </HStack>
    </Stack>
  );
}

export default Membership;
