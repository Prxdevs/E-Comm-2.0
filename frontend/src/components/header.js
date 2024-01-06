// Header.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  Drawer,
  Text,
  Input,
  DrawerOverlay,
  Select,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "./logo.png";
const Header = () => {
  const [cartItems, setCartItems] = useState(["Item 1", "Item 2"]); // Example items in the cart
  const [shippingAddress, setShippingAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [isOpen, setIsOpen] = React.useState(false);
  const [isCartOpen, setCartOpen] = React.useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Checkout:", {
      items: cartItems,
      shippingAddress,
      pinCode,
      mobileNumber,
      paymentMethod,
    });
    if (paymentMethod === "Online") {
      // Redirect to Google.com (or your desired URL)
      window.location.href = "https://www.google.com";
    }
    if (paymentMethod === "COD") {
      // Redirect to Google.com (or your desired URL)
      window.location.href = "https://www.google.com";
    }
  };
  
  return (
    <Flex
      color="white"
      // p={4}
      // pl={200}
      // pr={200}
      p={4}
      pl={[0, 0, 10, 200]} // Responsive padding: 0px on mobile, 200px on desktop
      pr={[0, 0, 10, 200]} // Responsive padding: 0px on mobile, 200px on desktop
      height="100px"
      align="center"
      justifyContent="space-between"
    >
      <HStack spacing={4}>
        <IconButton
          icon={<HamburgerIcon fontSize="2xl" />}
          variant="ghost"
          onClick={handleToggle}
        />

        {/* Sidebar Drawer */}
        <Drawer placement="left" onClose={handleToggle} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <Link to="/profile">
              <DrawerHeader>Login</DrawerHeader>
              </Link>
             
              <Divider />
              <DrawerBody>
                {/* Add your sidebar content here */}
                <VStack align="left" fontFamily="sans-serif" spacing={4}>
                  {/* Your sidebar items go here */}
                  <Text>NEW ARRIVALS</Text>
                  <Divider />
                  <Text>MOST TRENDING</Text>
                  <Divider />
                  <Text>CUSTOMER SUPPORT</Text>
                  <Divider />
                  <Text>VISIT STORE</Text>
                  <Divider />
                  <Text>
                    <Link to="/about">ABOUT</Link>
                  </Text>
                  <Divider />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        <Drawer
          placement="right"
          onClose={() => setCartOpen(false)}
          isOpen={isCartOpen}
          size="auto"
        >
          <DrawerOverlay>
            <DrawerContent
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                width: "50%",
                backgroundColor: "white", // Adjust the background color as needed
                boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)", // Optional: Add a box shadow for better visibility
              }}
            >
              <DrawerCloseButton />
              <DrawerHeader>Shopping Cart</DrawerHeader>
              <DrawerBody>
                {cartItems.map((item, index) => (
                  <Text key={index}>{item}</Text>
                ))}
                <Divider my={4} />
                {/* Shipping Address */}
                <VStack spacing={2}>
                  <Input
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                  {/* Pin Code */}
                  <Input
                    placeholder="Pin Code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                  {/* Mobile Number */}
                  <Input
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  {/* Payment Method */}
                  <Select
                    placeholder="Select Payment Method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Online">Online</option>
                    <option value="COD">COD</option>
                  </Select>
                </VStack>
              </DrawerBody>
              <Button
                colorScheme="gray"
                size="md"
                mt={4}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </HStack>

      {/* Center (Logo) */}
      <Box align="center" color="black">
        <Link to="/">
          <img src={logo} height={"50%"} width={"50%"}></img>
        </Link>
      </Box>

      <Box display={"flex"}>
        <IconButton icon={<Search2Icon fontSize="xl" />} variant="ghost" />
        <Link to="/profile">
        <IconButton icon={<FaUser fontSize="2xl" />} variant="ghost" />
        </Link>
        
        <IconButton
          icon={<FaShoppingCart fontSize="2xl" />}
          variant="ghost"
          onClick={() => setCartOpen(!isCartOpen)}
        />
      </Box>
    </Flex>
  );
};

export default Header;
