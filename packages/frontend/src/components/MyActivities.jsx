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
} from "@chakra-ui/react";
import axios from "axios";

function MyActivities() {
  const [equipments, setEquipments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [updatedActivities, setUpdatedActivities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("lastWeek");

  // const [equipmentMap, setEquipmentMap] = useState({});
  const getEquipments = async () => {
    const url = "http://3.136.112.20:8080/api/equipment";
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
    const url = "http://3.136.112.20:8080/api/activity";
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
    handleFilterChange({target: {value: 'lastWeek'}}, a)
  };

  function handleFilterChange(event, newActivities) {
    newActivities = newActivities ?? activities
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
    <Box p={4} my={10}>
      <Heading as="h1" mb={4}>
        My Gym Activities
      </Heading>
      <Select value={selectedFilter} onChange={(e) => handleFilterChange(e, undefined)} mb={4}>
        <option value="lastWeek">Last Week</option>
        <option value="lastMonth">Last Month</option>
        <option value="last6Months">Last 6 Months</option>
        <option value="all">All Activities</option>
      </Select>
      {updatedActivities.length ? (
        <List spacing={3} justifyContent="center" alignContent="center">
          {updatedActivities.sort((a, b) => new Date(b.date) - new Date(a.date)).map((activity, index) => (
            <ListItem key={index} display="flex">
              <Box width="100%" rounded="lg" bg="gray.100">
                <Flex align="center">
                  <Image
                    src={activity.equipmentImage}
                    boxSize={"100px"}
                    mr={4}
                    borderRadius="lg"
                  />
                  <Box>
                    <Heading as="h1" mb={4}>
                      {activity.equipmentName}{" "}
                    </Heading>
                    <Text>
                      {activity.startTime} to {activity.endTime}
                    </Text>
                    <Text>{activity.date}</Text>
                  </Box>
                </Flex>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No activities found.</Text>
      )}
    </Box>
  );
}
export default MyActivities;
