import React, { useEffect ,useState} from 'react';
import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
   
    useEffect(() => {
        // Fetch product data based on the productId
        const fetchProduct = async () => {
          try {
            const response = await fetch(`http://localhost:3999/products/${productId}`);
            
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
    
            const productData = await response.json();
            console.log(productData)
            setProduct(productData);
          } catch (error) {
            console.error('Error fetching product:', error);
            // Handle error as needed
          }
        };
    
        fetchProduct();
      }, [productId]);
      if (!product) {
        // Render loading state or handle the case when product is not found
        return <p>Loading...</p>;
      }
    
  return ( <>


<Flex
        direction={['column', 'column', 'row']} // Use column direction for small screens, row direction for larger screens
        maxW="1400px"
        mx="auto"
        p="20px"
        bg="white"
        boxShadow="lg"
        borderRadius="8px"
        mt="20px"
      >
        <Box flex={['none', 1]} mb={['20px', 0]}> {/* Use flex to control the size, mb to add margin only for small screens */}
          <Image src={product.images[0].url} alt="Product Image" borderRadius="8px" mb="20px" w="100%" h="auto" />
        </Box>

        <Box ml={['0', '20px']} textAlign="left" flex="1">
          <Heading color="gray.800" mb="4">
            {product.name}
          </Heading>
          <Text color="gray.600" mb="4">
            {product.description}
          </Text>
          <Text color="orange.500" fontSize="xl" fontWeight="bold" mb="4">
            {product.price}
          </Text>
          <Button
            colorScheme="orange"
            variant="solid"
            size="md"
            borderRadius="4px"
            cursor="pointer"
          >
            Buy Now
          </Button>
        </Box>
      </Flex>
      
  </>
  );
};

export default ProductDetails;
