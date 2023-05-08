import {
    Box,
    Flex,
    Image,
    Badge,
    Text,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Stack,
    useToast
  } from "@chakra-ui/react";
  
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"

 const MyEquipment = () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [date, setDate] = useState("");
    const toast = useToast();
    const [equipment, setEquipment] = useState([]);
    
    const equipmentId  = useParams();


    //write backend code to get equipment details based on its
    const getEquipment = async () => {
      const url = "http://localhost:8080/api/equipment"
      const data  = await axios.get(url);
      const allEquipments = data.data;
      const requiredEquipment = allEquipments.find(item => item._id === equipmentId.id);
      // console.log('---->',requiredEquipment.name);
      setEquipment(requiredEquipment);
    };

    useEffect(() => {
      getEquipment();
    }, []);

    // const equipment = {
    //     id: "001",
    //     name: "Treadmill",
    //     image:
    //       "https://cdn.shopify.com/s/files/1/0046/8752/8024/products/precor-trm-243-treadmill_4a16b4ff-4a28-47ef-8b60-9c5984de7d3d_5000x.jpg?v=1677791634",
    //     available: true,
    // }

    const handleSubmit = async (event) => {
      try {
        const url = "http://localhost:8080/api/activity";
        let token = localStorage.getItem("token");
        token = token ? JSON.parse(localStorage.getItem("token")).data._id : undefined;
        const ob = {
          userId: token,
          equipmentId: equipmentId.id,
          startTime: startTime,
          endTime: endTime,
          date: date 
        }
        console.log("--->"+ob.userId);
        console.log("--->"+ob.equipmentId);
        console.log("--->"+ob.startTime);
        console.log("--->"+ob.endTime);
        console.log("--->"+ob.date);

          const res = await axios.post(url, ob);
        const resp = res.data;
        console.log(res.data);
        if (resp.data === null) {
          // setCheckin(true);
        } else {
          // setCheckin(false);
        }
        // navigate("/employeehome");
        // console.log(res.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }

  
      console.log("Form Submitted!");
      console.log(startTime,endTime,date,equipment);
        if (!equipment.available){
            alert("Equipment is Not Available!!");
            return;
        }
      event.preventDefault();
      if ( !startTime || !date) {
        toast({
          title: "Form Incomplete",
          description: "Please fill all the fields",
          status: "error",
          duration: 3000,
          isClosable: true
        });
        return;
      }
      const data = {
        startTime: startTime,
        date: date
      };
      console.log("Data:", data);
      toast({
        title: "Card submitted",
        description: "Your card has been submitted",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      setStartTime("");
      setDate("");

    
    };
        return (
            <Flex
            my={20}
            justifyContent="center" alignItems="center"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="4"
              flexDir={{ base: "column", md: "row" }}
            >
              <Image
                src={equipment.image}
                alt="Card image"
                mr={{ base: 0, md: 4 }} boxSize={"400px"}
              />
          
              <Box mt={{ base: 4, md: 0 }}>
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
                    #{(equipmentId.id.substr(-4))}
                  </Text>
                </Box>
          
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                  {equipment.name}
                </Box>
          
          
                <Box mt="4">
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
          
                      <FormControl id="start-time" isRequired>
                        <FormLabel>Start Time</FormLabel>
                        <Input 
                        
                          type="time"
                          value={startTime}
                          onChange={(event) => setStartTime(event.target.value)}
                        />
                        <FormHelperText>Enter the start time</FormHelperText>
                      </FormControl>
                      <FormControl id="end-time" isRequired>
                        <FormLabel>End Time</FormLabel>
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(event) => setEndTime(event.target.value)}
                        />
                        <FormHelperText>Enter the end time</FormHelperText>
                      </FormControl>
          
                      <FormControl id="date" isRequired>
                        <FormLabel>Date</FormLabel>
                        <Input
                          type="date"
                          value={date}
                          onChange={(event) => setDate(event.target.value)}
                        />
                        <FormHelperText>Enter the date</FormHelperText>
                      </FormControl>
                    
                      <Button type="submit" colorScheme={equipment.available? "green": "red"} disabled={!equipment.available}>
                        Submit
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Box>
            </Flex>
          );          
};

export default MyEquipment;