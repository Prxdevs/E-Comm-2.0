import React,{useEffect,useState} from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,Heading,Box,Link, useColorModeValue as mode,Flex,
  Input,Image,
  Select,
  Button,
  Text,
  Divider,
  List,
  ListItem,
  ListIcon,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const ShoppingCartDrawer = ({
  isCartOpen,
  setCartOpen,

}) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const getCartData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const response = await fetch('http://localhost:4000/cart/get-cart', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cartData = await response.json();
        setCartItems(cartData.items);
        console.log(cartItems)
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (isCartOpen) {
      getCartData();
    }
  }, [isCartOpen]);

  
  
  return (
    <Drawer
      placement="right"
      onClose={() => setCartOpen(false)}
      isOpen={isCartOpen}
      size="auto"
    >
      <DrawerOverlay>
        <DrawerContent style={{ maxWidth: "100%", width: "40%" }}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading fontSize="2xl" fontWeight="extrabold">
              Cart ({cartItems.length} items)
            </Heading>
          </DrawerHeader>
          <Divider my={4} />
          <DrawerBody>
            <Box
              maxW={{ base: "3xl", lg: "7xl" }}
              mx="auto"
              px={{ base: "4", md: "8", lg: "12" }}
              py={{ base: "6", md: "8", lg: "12" }}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
                spacing={{ base: "8", md: "16" }}
              >
                <Stack
                  spacing={{ base: "8", md: "10" }}
                  flex="2"
                  position="relative"
                >
                  <Stack spacing="6">
                    {cartItems && cartItems.length > 0 ? (
                      cartItems.map((item, index) => (
                        <HStack
                          display="flex"
                          key={index}
                          spacing={4}
                          borderBottom="1px solid"
                          borderColor="gray.200"
                        >
                          <Image
                            src={`http://localhost:4000${item.productId.image[0]}`}
                            alt={item.productId.name}
                            boxSize="80px"
                            objectFit="cover"
                          />
                          <Stack flex="1">
                            <Text fontSize="md" fontWeight="bold">
                              {item.productId.name}
                            </Text>
                            <Text fontSize="xs">
                              Color: {item.selectedColor}
                            </Text>
                            <Text fontSize="xs">Size: {item.selectedSize}</Text>
                            <Text fontSize="xs">Quantity: {item.quantity}</Text>
                          </Stack>
                          <Stack marginTop={20}>
                            <Text fontSize="xs" fontWeight="bold">
                              Price: ${item.totalPrice}
                            </Text>
                          </Stack>
                        </HStack>
                      ))
                    ) : (
                      <Text textAlign="center" color="gray.500">
                        No items in the cart
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </Stack>

              <Flex direction="column" align="center" flex="1">
                {/* Additional components related to cart summary can be added here */}
              </Flex>
              <Stack
                position="sticky"
                bottom="0"
                bg="white" 
                p={4}
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="lg" fontWeight="bold">
                Subtotal: ${/* Add your logic to calculate subtotal */}
                </Text>
                <Button bg="black" color="white" _hover={{}} size="md" mt={2}>
                  Proceed to Checkout
                </Button>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
