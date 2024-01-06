// src/components/UserProfile.js
import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const UserProfile = () => {
  const user = {
    id: 1,
    username: 'john_doe',
    email: 'john.doe@example.com',
    orders: [
      { id: 101, product: 'Product A', price: 20.0 },
      { id: 102, product: 'Product B', price: 30.0 },
    ],
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>
        User Profile
      </Heading>
      <Box mb={4}>
        <Heading as="h3" size="lg" mb={2}>
          Username: {user.username}
        </Heading>
        <Text>Email: {user.email}</Text>
      </Box>
      <Box>
        <Heading as="h3" size="lg" mb={2}>
          Order History
        </Heading>
        <UnorderedList>
          {user.orders.map((order) => (
            <ListItem key={order.id}>
              {order.product} - ${order.price}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default UserProfile;
