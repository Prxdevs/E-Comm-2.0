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
import ShoppingCartDrawer from "../components/cart"
const Header = () => {


  const [isOpen, setIsOpen] = React.useState(false);
  const [isCartOpen, setCartOpen] = React.useState(false);
  const handleToggle = () => setIsOpen(!isOpen);


  
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
      <HStack spacing={10}>
        <IconButton
          icon={<HamburgerIcon fontSize="2xl" />}
          variant="ghost"
          onClick={handleToggle}
        />
        <IconButton
          visibility='hidden'
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

        <ShoppingCartDrawer
          isCartOpen={isCartOpen}
          setCartOpen={setCartOpen}
        />
       
      </HStack>

      {/* Center (Logo) */}
      <Box display='flex' justifyContent='center' alignItems='center' align="center" color="black" width='100px' height='100px'>
        <Link to="/">
          <img src={logo} width='100%' height='100%'></img>
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
