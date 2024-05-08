// Header.js

import React from "react";
import {
  Box,
  Text,
  Stack,
  SimpleGrid,
  Divider,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Divider pt={10} />
      <Stack pt={10} align="center" justify="center">
        <SimpleGrid columns={[1, 2, 4]} spacing={150} alignItems="stretch">
          <Box>
            <Stack spacing={0} direction="column" align="left" justify="center">
              <Text size="sm">VISIT OFFLINE STORE</Text>
              <Text color="gray" mt={4} fontSize="x">
                Jayanagar, Bangalore:
              </Text>
              <Text textDecor={"underline"}>Get Directions</Text>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={0} direction="column" align="left" justify="center">
              <Link to="/refund">
                <Text color="gray.700" mt={4} fontSize="x">
                  PLACE RETURN/EXCHANGE REQUEST
                </Text>
              </Link>
              <Link to="/privacy">
                <Text color="gray.700" mt={4} fontSize="x">
                  PRIVACY POLICY
                </Text>
              </Link>
              <Link to="/termsandcondition">
                <Text color="gray.700" mt={4} fontSize="x">
                  Terms & Conditions
                </Text>
              </Link>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={0} direction="column" align="left" justify="center">
            <Text color="gray.700" mt={4} fontSize="x">
                Contact Us
              </Text>
              <Text color="gray.700" mt={4} fontSize="x">
                FAQ
              </Text>
              <Text color="gray.700" mt={4} fontSize="x">
                Blogs
              </Text>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={0} direction="column" align="left" justify="center">
              <Text size="sm">CUSTOMER CARE</Text>
              <Text color="gray" mt={4} fontSize="x">
                Timings: 10 AM - 8 PM (Mon - Sun)
              </Text>
              <Text textDecor={"underline"}>Whatsapp : +91 6366966283</Text>
              <Text color="gray.700" fontSize="x">
                Instagram: @snitch.co.in
              </Text>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={0} direction="column" align="left" justify="center">
              <Text size="sm">SIGN UP AND SAVE</Text>
              <Text mt={2} color="gray" fontSize="sm">
                latest fashion trends & style tips!
              </Text>
              <Stack mt={1} direction="row" align="left" justify="center">
                <Input
                  placeholder="Enter Your Email"
                  textDecor="underline"
                  type="email"
                  borderRadius={0}
                />
                <IconButton
                  borderRadius={0}
                  aria-label="Send"
                  icon={<EmailIcon />}
                  colorScheme="black"
                  variant="outline"
                  size="md"
                />
              </Stack>
            </Stack>
          </Box>
        </SimpleGrid>

        <Text pt={10}>© 2023 PRXDEVS | All Rights Reserved</Text>
      </Stack>
    </>
  );
};

export default Footer;

{
  /* <li><Link to="/">Home</Link></li>
<li><Link to="/about">About</Link></li> */
}
