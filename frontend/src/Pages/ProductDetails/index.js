import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Input,
  SimpleGrid,
  Collapse,
  useDisclosure,
  Select,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";



const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const [selectedSize, setSelectedSize] = useState(""); // New state for selected size
  const [selectedColor, setSelectedColor] = useState("");
  const [imagee, setImagee] = useState("");
  const [zoomedImage, setZoomedImage] = useState("");
  

  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false); // New state for wishlist
  const toast = useToast();

  const { isOpen, onToggle, onClose } = useDisclosure();
  const { isOpenn, onTogglee, onClosee } = useDisclosure();
  useEffect(() => {
    // Fetch product data based on the productId
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/product/${productId}`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const productData = await response.json();
        console.log(productData);
        setProduct(productData);
        setImagee(`http://localhost:4000${productData.image[0]}`);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error as needed
      }
    };
    
    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      // Call your cart API to add the product to the cart
      const response = await fetch("http://localhost:4000/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      // Display a success toast
      toast({
        title: "Item added to cart",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle error as needed
      toast({
        title: "Error adding item to cart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addToWishlist = () => {
    // Add logic to add the product to the wishlist
    // This is just a placeholder. You need to implement your own wishlist logic.
    setIsAddedToWishlist(true);

    // Display a success toast
    toast({
      title: "Item added to wishlist",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (!product) {
    // Render loading state or handle the case when the product is not found
    return <p>Loading...</p>;
  }

  const handleImageHover = (imagePath) => {
    setZoomedImage(`http://localhost:4000${imagePath}`);
    onToggle();
  };

  const handleMouseMove = (e) => {
    const target = e.target;
    const boundingBox = target.getBoundingClientRect();

    const mouseX = e.clientX - boundingBox.left;
    const mouseY = e.clientY - boundingBox.top;

    const percentX = (mouseX / boundingBox.width) * 100;
    const percentY = (mouseY / boundingBox.height) * 100;

    target.style.transformOrigin = `${percentX}% ${percentY}%`;
  };

  return (
    <>
      <Flex
        direction={["column", "column", "row"]}
        maxW="1400px"
        mx="auto"
        p="20px"
        mt="20px"
      >
        <Stack display={'flex'}>

         <Box
            boxSize={{ base: "100%", md: "300px", lg: "500px" }}
            maxW={{ base: "100%", md: "300px", lg: "500px" }}
            mb="4"
            onMouseMove={handleMouseMove}
            overflow='hidden'
          >
            <Image
              src={imagee}
              objectFit="contain"
              h="100%"
              w="100%" 
              onClick={() => handleImageHover(product.image[0])}
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.3)' }}
              overflow='hidden'
            />
          </Box>

        <Box display='flex' flex={["none", 1]} mb={["20px", 0]} sx={{}}>
          {product.image.map((imagePath, index) => (
            <Box key={index} h="auto" w="100%" overflow="hidden" onClick={() => setImagee(`http://localhost:4000${imagePath}`)}>
              <Image
                key={index}
                src={`http://localhost:4000${imagePath}`}
                alt={`Product Image ${index + 1}`}
                borderRadius="2px"
                objectFit="contain"
                h="100px"
                w="100%"
                />
            </Box>
          ))}
        </Box>
          </Stack>

        {/* <Image src={`http://localhost:4000${product.image[0]}`} alt="Product Image" borderRadius="2px" w="100%" h="auto" /> */}

        <Box ml={["0", "30px"]} textAlign="left" flex="1">
          <Heading color="gray.800" mb="4">
            {product.name}
          </Heading>
          <Text color="orange.500" fontSize="xl" fontWeight="bold" mb="1">
            Rs. {product.price}
          </Text>
          <Text color="orange.500" fontSize="sm" fontWeight="light" mb="4">
            (incl. of all taxes)
          </Text>

          <Flex
            direction={["column", "column", "row"]}
            maxW="1400px"
            mx="auto"
            p="20px"
            bg="white"
            boxShadow="lg"
            borderRadius="8px"
            mt="20px"
          >
            <Box ml={["0", "20px"]} textAlign="left" flex="1">
              <Button
                colorScheme="gray"
                variant="solid"
                size="md"
                borderRadius="1px"
                cursor="pointer"
                onClick={onToggle}
                mb="4"
                w="full"
              >
                {isOpen ? "Description" : "Description"}
              </Button>

              <Collapse in={isOpen} unmountOnExit>
                <Box
                  mt="4"
                  mb="5"
                  p="4"
                  borderWidth="1px"
                  borderColor="gray.300"
                >
                  <Text color="gray.600">{product.description}</Text>
                </Box>
              </Collapse>

              <Text color="gray.600" mb="4">
                Size:
                <SimpleGrid
                  columns={[5, 5, 4, 5]}
                  spacing={3}
                  alignItems="stretch"
                >
                  {product.sizes[0].split(",").map((size, index) => (
                    <Button
                      key={index}
                      colorScheme="black"
                      borderColor={"#e8e8e1"}
                      variant="outline"
                      rounded="none"
                      onClick={() => setSelectedSize(size)}
                      // Optionally, you can add a style to highlight the selected size
                      bg={selectedSize === size ? "black" : ""}
                      color={selectedSize === size ? "white" : ""}
                    >
                      {size.trim()}{" "}
                    </Button>
                  ))}
                </SimpleGrid>
              </Text>
              <Text color="gray.600" mb="4">
                Color:
                <Select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  placeholder="Select Color"
                  size="md"
                  mt="2"
                >
                  {product.colors[0].split(",").map((color, index) => (
                    <option key={index} value={color}>
                      {color.trim()}{" "}
                    </option>
                  ))}
                </Select>
              </Text>
              <Text color="gray.600" mb="6">
                Quantity:
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </Text>

              <Button
                colorScheme="orange"
                variant="solid"
                size="md"
                borderRadius="1px"
                cursor="pointer"
                onClick={addToCart}
                mb="4"
                w="full"
                isDisabled={!selectedSize || !selectedColor}
              >
                {!selectedSize || !selectedColor
                  ? "Select Size and Color"
                  : "Add to Cart"}
              </Button>

              <Button
                colorScheme="teal"
                variant="solid"
                size="md"
                borderRadius="1px"
                cursor="pointer"
                onClick={addToWishlist}
                mb="4"
                isDisabled={isAddedToWishlist}
                w="full"
              >
                {isAddedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
              </Button>
            </Box>
          </Flex>
        </Box>
        <Modal isOpen={isOpenn} onClose={onClosee} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Box
              maxH="80vh"
              maxW="80vw"
              mx="auto"
              position="relative"
              overflow="hidden"
              onMouseMove={handleMouseMove}
            >
              <Image
                src={zoomedImage}
                alt="Zoomed Image"
                objectFit="contain"
                h="100%"
                w="100%"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.9)' }}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      </Flex>
    </>
  );
};

export default ProductDetails;
