import React, { useEffect ,useState} from 'react';
import { Box, Heading, Text, Fade,Stack,Button,SimpleGrid,Card, CardHeader,Flex, CardBody, CardFooter,Image,
Divider,ButtonGroup } from '@chakra-ui/react';  
import sdsd from './sdsd.png';
import dddd from './dddd.webp';
import Slider from 'react-slick';
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

    <Box display={'flex'}>
        <Box >
            {product.images.map((image, index) => (
             <Image height='auto' width='100%' src={image.url} />
             ))}
        </Box>

        <Box>
            <Heading> {product.name}</Heading>
           
        </Box>
    
    </Box>
      
  </>
  );
};

export default ProductDetails;
