import { useState, useEffect } from 'react';
import { Flex,Image,Box, Button, Heading, List, ListItem, Select, Text,Badge } from '@chakra-ui/react';
import axios from "axios"

function MyActivities() {
  // const [equipmentMap, setEquipmentMap] = useState({});
  const [equipments, setEquipments] = useState([]);
  const [activities, setActivities] = useState([
    // { name: 'Activity 1', startTime: '1 hour', date: '2023-05-01',image: "./gym1.png" },
    // { name: 'Activity 3', startTime: '30 minutes', date: '2023-04-03',image:"./gym1.png" },
    // { name: 'Activity 2', startTime: '45 minutes', date: '2023-04-02',image:"./gym1.png" },
    // { name: 'Activity 4', startTime: '1.5 hours', date: '2023-04-30' ,image:"./gym1.png"},
    // { name: 'Activity 5', startTime: '1 hour', date: '2023-04-28'    ,image:"./gym1.png"  },
    // { name: 'Activity 6', startTime: '45 minutes', date: '2023-04-26',image:"./gym1.png" },
    // { name: 'Activity 7', startTime: '1 hour', date: '2023-03-30'    ,image:"./gym1.png" },
    // { name: 'Activity 8', startTime: '45 minutes', date: '2023-03-25',image:"./gym1.png"    },
    // { name: 'Activity 9', startTime: '1 hour', date: '2023-03-15'    ,image:"./gym1.png"  },
  ]);
  const [selectedFilter, setSelectedFilter] = useState('lastWeek');

  const getEquipments = async () => {
    const url = "http://localhost:8080/api/equipment";
    const data  = await axios.get(url);
    setEquipments(data.data);
  };

  const getActivities = async () => {
    const url = "http://localhost:8080/api/activity";
    const data  = await axios.get(url);
    const activityObjectList = data.data;
    let currentUserId = localStorage.getItem("token");
    currentUserId = currentUserId ? JSON.parse(localStorage.getItem("token")).data._id : undefined;
    let userActivity = activityObjectList.filter((obj) => obj.userId === currentUserId);
    let a = [];
    userActivity.map((item)=>{
      equipments.map((eq)=>{
        if (item.equipmentId === eq._id){
          // console.log("----->",eq);
          // item = {equipmentName:eq.name, ...item};
          item['equipmentName'] = eq.name;
          item['equipmentImage'] = eq.image
        }
        a.push(item);
      });
    });
    setActivities(a);
    };
  
  useEffect(() => {
    getActivities();
    getEquipments();
  }, []);


  // Get the filtered activities based on the selected time period
  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date((activity.date));
    const currentDate = new Date();
    if (selectedFilter === 'lastWeek') {
      const lastWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
      return activityDate >= lastWeekDate;
    } else if (selectedFilter === 'lastMonth') {
      const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      return activityDate >= lastMonthDate;
    } else if (selectedFilter === 'last6Months') {
      const last6MonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
      return activityDate >= last6MonthsDate;
    } else {
      return true; // show all activities if no filter is selected
    }
  });

  function handleFilterChange(event) {
    setSelectedFilter(event.target.value);
  }

  return (
        <Box p={4} my={10}>
        <Heading as="h1" mb={4}>My Gym Activities</Heading>
        <Select value={selectedFilter} onChange={handleFilterChange} mb={4}>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="last6Months">Last 6 Months</option>
            <option value="all">All Activities</option>
        </Select>
        {filteredActivities.length > 0 ? (
            <List spacing={3} justifyContent="center" alignContent="center">
            {filteredActivities.map((activity, index) => (
                <ListItem key={index} display="flex">
<Box width="100%" rounded="lg" bg="gray.100"  >
  <Flex align="center">
    <Image src={activity.equipmentImage} boxSize={"100px"} mr={4} borderRadius="lg" />
    <Box>
    <Heading as="h1" mb={4}>{activity.equipmentName} </Heading>
      <Text>{activity.startTime} to {activity.endTime}</Text>
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