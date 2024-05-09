// Home.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Fade,
  Stack,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  CardBody,
  CardFooter,
  Image,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import sdsd from "./sdsd.png";
import dddd from "./dddd.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "@fontsource/pt-sans";

const Home = ({}) => {
  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const imagePaths = [
    sdsd,
    sdsd,
    sdsd,
    // Add more image paths as needed
  ];
  const posterPaths = [
    dddd,
    dddd,
    dddd,
    // Add more image paths as needed
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  //  mouse hover on card
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleHover = (productId) => {
    setHoveredProductId(productId);
  };

  const handleHoverOut = () => {
    setHoveredProductId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product", {
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        console.log(response.data);
        const productsData = response.data;
        setProducts(productsData);
        console.log("haha", productsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts

    // Cleanup function (optional) - will be called if the component is unmounted
    return () => {
      // Any cleanup code (e.g., aborting ongoing requests) can go here
    };
  }, []);
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredProducts = selectedTag
    ? products.filter((product) => product.tag === selectedTag)
    : products;

  useEffect(() => {
    // Extract unique categories from products
    const categoriesSet = new Set(products.map((product) => product.category));
    const uniqueCategoriesArray = [...categoriesSet];
    setUniqueCategories(uniqueCategoriesArray);
  }, [products]);

  return (
    <>
      <Box overflowX="hidden" overflowY="hidden">
        {/* First Slider with Image Paths */}
        <Slider {...sliderSettings}>
          {imagePaths.map((path, index) => (
            <Fade
              key={index}
              in={true}
              style={{ transitionDelay: `${index * 0.5}s` }}
            >
              <Box>
                <img
                  src={path}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Fade>
          ))}
        </Slider>

        {/* Second Slider with Poster Paths */}
        <Slider {...sliderSettings}>
          {posterPaths.map((path, index) => (
            <Fade
              key={index}
              in={true}
              style={{ transitionDelay: `${index * 0.5}s` }}
            >
              <Box mb={4}>
                <img
                  src={path}
                  alt={`Poster ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Fade>
          ))}
        </Slider>
      </Box>

      <Stack
        direction="column"
        spacing={4}
        align="center"
        justify="center"
        display="flex"
        flexWrap="wrap"
      >
        <Stack direction="row" spacing={4} mb={4} width={{ base: "100%", md: "auto" }}>
          <Button
            colorScheme="black"
            variant="outline"
            rounded="full"
            onClick={() => setSelectedTag("New Drops")}
            width={{ base: "100%", md: "auto" }}
          >
            New Drops
          </Button>
          <Button
            colorScheme="black"
            variant="outline"
            rounded="full"
            onClick={() => setSelectedTag("Winter Flex")}
            width={{ base: "100%", md: "auto" }}
          >
            Winter Flex
          </Button>
          <Button
            colorScheme="black"
            variant="outline"
            rounded="full"
            onClick={() => setSelectedTag("Trending")}
            width={{ base: "100%", md: "auto" }}
          >
            Trending
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={4} align="center" justify="center" marginTop={2}>
        <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} alignItems="stretch">
          {filteredProducts.map((product) => (
            <Link
              to={{
                pathname: `/productdetails/${product._id}`,
                state: { product },
              }}
              key={product._id}
            >
              <Card
                shadow={"none"}
                maxW={["100%", "100%", "xs"]}
                height="487px"
                width="325px"
              >
                <CardBody p={0}>
                  <Stack sx={{ objectFit: "contain" }}>
                    {/* <Image
                      height="366px"
                      width="244px"
                      src={`http://localhost:4000${product.image[0]}`}
                      onMouseOver={handlelala}
                      // Replace 'your-base-url' with the actual base URL
                      // key={index}
                      alt={product.name}
                    /> */}
                    <Image
                      objectFit="contain"
                      src={`http://localhost:4000${
                        hoveredProductId === product._id
                          ? product.image[1]
                          : product.image[0]
                      }`}
                      onMouseOver={() => handleHover(product._id)}
                      onMouseOut={handleHoverOut}
                      alt={product.name}
                    />
                  </Stack>
                  <Stack direction="column" align="center" justify="center">
                    {/* <Heading size="sm" fontFamily="PT Sans" fontWeight={400}>{product.name}</Heading>
                    <Text color="blue.600" mb={2} fontSize="x">
                      ₹ {product.price}
                    </Text> */}
                    <Text marginBottom={"5px"} size="xs">
                      {product.name}
                      <br />
                      <Text m={1} fontSize="xs">
                        ₹ {product.price}
                      </Text>
                    </Text>
                  </Stack>
                </CardBody>

                <CardFooter
                  p={0}
                  justifyContent="center"
                  mb={2}
                  alignItems="center"
                >
                  <SimpleGrid
                    // columns={[5, 5, 4, 5]}
                    columns={[4]}
                    spacing={3}
                    alignItems="stretch"
                  >
                    {product.sizes[0].split(",").map((size, index) => (
                      <Button
                        key={index}
                        size={"sm"}
                        colorScheme="black"
                        borderColor={"#e8e8e1"}
                        variant="outline"
                        rounded="none"
                      >
                        {size.trim()}{" "}
                        {/* Use trim to remove any leading/trailing whitespace */}
                      </Button>
                    ))}
                  </SimpleGrid>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Stack>
      <br></br>
      <br></br>
      {/* //category */}
      <Stack direction="column" spacing={4} align="center" justify="center">
        <Stack direction="row" spacing={4} mb={4}>
          <Heading colorScheme="black" variant="outline" rounded="full">
            {" "}
            All Categories
          </Heading>
        </Stack>
      </Stack>
      <br></br>
      <br></br>

      <Stack spacing={4} align="center" justify="center">
        <Stack spacing={4} align="center" justify="center">
          {/* Display unique categories and images */}

          <SimpleGrid columns={[1, 2, 4]} spacing={4} alignItems="stretch">
            {uniqueCategories.map((category) => (
              <React.Fragment key={category}>
                {/* Find the first product for the current category */}
                {products.find((product) => product.category === category) && (
                  <Link to={`/collection?category=${category}`}>
                    <Card shadow={"none"} maxW={["100%", "100%", "xs"]}>
                      <CardBody p={0}>
                        <Image
                          height="auto"
                          width="100%"
                          src={`http://localhost:4000${
                            products.find(
                              (product) => product.category === category
                            ).image[0]
                          }`}
                          alt={
                            products.find(
                              (product) => product.category === category
                            ).name
                          }
                        />
                        <Stack
                          direction="column"
                          align="center"
                          justify="center"
                        >
                          <Heading size="sm">{category}</Heading>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
