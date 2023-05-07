import { useState } from "react";
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

const equipments = [
  {
    id: "001",
    name: "Treadmill",
    image:
      "https://cdn.shopify.com/s/files/1/0046/8752/8024/products/precor-trm-243-treadmill_4a16b4ff-4a28-47ef-8b60-9c5984de7d3d_5000x.jpg?v=1677791634",
    available: true,
  },
  {
    id: "002",
    name: "Weight Lifting Set",
    image:
      "https://www.360fitnesssuperstore.com/cdn/shop/products/Warrior_Elite_Squat_Rack_1_1512x.jpg?v=1629813880",
    available: false,
  },
  {
    id: "003",
    name: "Elliptical",
    image:
      "https://pushpedalpull.com/media/catalog/product/cache/d754d4fc72500c48b852725c7157ce6d/e/f/efx_815_2_2.png",
    available: true,
  },
];

const EquipmentCard = ({ equipment }) => {
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
              #{equipment.id}
            </Text>
          </Box>
  
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {equipment.name}
          </Box>
  
          <Box mt="2">
            <Link to="/myequipment">
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
  

const MyEquipments = () => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

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
            onClick={() => setSelectedEquipmentId(equipment.id)}
          />
        ))}
      </Stack>
    </Flex>
    </Box>

  );
};

export default MyEquipments;
