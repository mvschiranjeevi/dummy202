import React, { useState , useEffect} from "react"
import {
  Box,
  Flex,
  Image,
  Badge,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";

import {Link} from 'react-router-dom';
import axios from "axios"




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
        <Image src={equipment.image} alt={equipment.name} mr="4" boxSize={"200px"}/>
  
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
                colorScheme="blue"
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
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const [equipments, setEquipments] = useState([]);

  const getEquipments = async () => {
    const url = "http://localhost:8080/api/equipment";
    const data  = await axios.get(url);
    console.log(data.data);
    setEquipments(data.data);
    console.log(equipments)
  };
  
  useEffect(() => {
    getEquipments();
  }, []);



  const handleClick = (equipment) => {
    setSelectedEquipmentId(equipment.id);
    props.getEquipmentId(equipment);
   
  }
  return (
    <Box my={20}>
    <Flex direction="column" alignItems="center" p="5">
      <h1>
        Gym Equipments
      </h1>

      <Stack spacing="4">
        {equipments.map((equipment) => (
          <EquipmentCard
            key={equipment.id}
            equipment={equipment}
            onClick={(equipment) => {handleClick}}
          />
        ))}
      </Stack>
    </Flex>
    </Box>

  );
};

export default MyEquipments;
