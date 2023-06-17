import { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Select,
  Text,
  Badge,
  HStack,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { backendApi } from "../constants";

function MyActivities() {
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;
  const [equipments, setEquipments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [updatedActivities, setUpdatedActivities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("lastWeek");

  // const [equipmentMap, setEquipmentMap] = useState({});
  const getEquipments = async () => {
    const url = `${backendApi}/api/equipment`;
    const data = await axios.get(url);
    let eqMap = data.data;
    let tmp = {};
    eqMap.map((eq) => {
      tmp[eq._id] = eq;
    });
    setEquipments(eqMap);
    return tmp;
  };

  const getActivities = async (equipmentMap) => {
    const url = `${backendApi}/api/activity`;
    const activities = await axios.get(url);
    const activityObjectList = activities.data;
    let currentUserId = localStorage.getItem("token");
    currentUserId = currentUserId
      ? JSON.parse(localStorage.getItem("token")).data._id
      : undefined;
    let userActivity = activityObjectList.filter(
      (obj) => obj.userId === currentUserId
    );
    let a = [];
    userActivity.map((item) => {
      item["equipmentName"] = equipmentMap[item.equipmentId].name;
      item["equipmentImage"] = equipmentMap[item.equipmentId].image;
      a.push(item);
    });
    console.log("------>", a);
    setActivities(a);
    handleFilterChange({ target: { value: "lastWeek" } }, a);
  };

  function handleFilterChange(event, newActivities) {
    // console.log(event);
    newActivities = newActivities ?? activities;
    setSelectedFilter(event.target.value);
    // setFiltererdActivities
    // Get the filtered activities based on the selected time period
    const filteredActivities = newActivities.filter((activity) => {
      const activityDate = new Date(activity.date);
      const currentDate = new Date();
      if (event.target.value === "lastWeek") {
        const lastWeekDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
        console.log(lastWeekDate, "----", activityDate);
        return activityDate >= lastWeekDate;
      } else if (event.target.value === "lastMonth") {
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        return activityDate >= lastMonthDate;
      } else if (event.target.value === "last6Months") {
        const last6MonthsDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 6,
          currentDate.getDate()
        );
        return activityDate >= last6MonthsDate;
      } else {
        return true; // show all activities if no filter is selected
      }
    });
    setUpdatedActivities(filteredActivities);
  }

  useEffect(() => {
    getEquipments().then((equipmentMap) => {
      console.log(equipmentMap);
      getActivities(equipmentMap);
    });
  }, []);

  return (
    <>
      {token != null && !token ? (
        <Flex
          width="full"
          // height="120vh"
          align="center"
          justifyContent="center"
          paddingTop={100}
          paddingLeft={100}
          paddingRight={100}
          paddingBottom={50}
        >
          <Stack
            // p={8}
            width="full"
            // height="full"
            borderWidth={2}
            borderRadius={15}
            boxShadow="2xl"
            border="2px"
            borderColor="white"
            alignItems="center"
          >
            <Stack width={"full"} padding={10}>
              <Heading mb={4} paddingTop={5} align="center" color={"orange"}>
                My Gym Activities
              </Heading>
              <Select
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e, undefined)}
                mb={4}
                paddingBottom={5}
              >
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="last6Months">Last 6 Months</option>
                <option value="all">All Activities</option>
              </Select>
              {updatedActivities.length ? (
                <List spacing={3} justifyContent="center" alignContent="center">
                  {updatedActivities
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((activity, index) => (
                      <ListItem key={index} display="flex">
                        <Box
                          width="full"
                          rounded="lg"
                          bg="#f2f2f"
                          padding={5}
                          border={"1px"}
                          borderColor={"black"}
                        >
                          <Flex align="center">
                            <Image
                              src={activity.equipmentImage}
                              boxSize={"100px"}
                              mr={4}
                              borderRadius="lg"
                            />
                            <Box>
                              <Heading as="h1" mb={4} color="orange">
                                {activity.equipmentName}{" "}
                              </Heading>
                              <HStack>
                                <Text>
                                  {activity.startTime} to {activity.endTime}
                                </Text>
                                <Text>- {activity.date}</Text>
                              </HStack>
                            </Box>
                          </Flex>
                        </Box>
                      </ListItem>
                    ))}
                </List>
              ) : (
                <Text>No activities found.</Text>
              )}

              {/* <ClassAnalytics></ClassAnalytics> */}
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
          <Text>This Page is only accessed by members</Text>
        </Stack>
      )}
    </>
  );
}
export default MyActivities;
