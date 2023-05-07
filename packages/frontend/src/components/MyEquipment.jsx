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
  
import { useState } from "react";
import { Link } from 'react-router-dom';
 
 const MyEquipment = () => {
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [date, setDate] = useState("");
    const toast = useToast();
    
    const equipment = {
        id: "001",
        name: "Treadmill",
        image:
          "https://cdn.shopify.com/s/files/1/0046/8752/8024/products/precor-trm-243-treadmill_4a16b4ff-4a28-47ef-8b60-9c5984de7d3d_5000x.jpg?v=1677791634",
        available: true,
    }

    const handleSubmit = (event) => {
        if (!equipment.available){
            alert("Equipment is Not Available!!");
            return;
        }
      event.preventDefault();
      if (!startDate || !startTime || !date) {
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
        startDate: startDate,
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
      setStartDate("");
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
                src="https://cdn.shopify.com/s/files/1/0046/8752/8024/products/precor-trm-243-treadmill_4a16b4ff-4a28-47ef-8b60-9c5984de7d3d_5000x.jpg?v=1677791634"
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
                    #{equipment.id}
                  </Text>
                </Box>
          
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                  {equipment.name}
                </Box>
          
          
                <Box mt="4">
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                      <FormControl id="start-date">
                        <FormLabel>Start Date</FormLabel>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(event) => setStartDate(event.target.value)}
                        />
                        <FormHelperText>Enter the start date</FormHelperText>
                      </FormControl>
          
                      <FormControl id="start-time">
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(event) => setStartTime(event.target.value)}
                        />
                        <FormHelperText>Enter the start time</FormHelperText>
                      </FormControl>
          
                      <FormControl id="date">
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