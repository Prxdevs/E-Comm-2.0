import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, UnorderedList, ListItem, Input, Button } from '@chakra-ui/react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '',mobile:'',name:'',dob:'' });
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          // If token is not available, user is not logged in
          return;
        }
  
        // Fetch user data
        const userResponse = await fetch('http://localhost:4000/auth/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userResponse.json();
        console.log('User Data:', userData);
        setUser(userData);
  
        // Fetch user orders
        const ordersResponse = await fetch('http://localhost:4000/orders/get-orders', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userOrders = await ordersResponse.json();
        console.log('User Orders:', userOrders.orders);
        setUserOrders(userOrders.orders);
      } catch (error) {
        console.error('Error fetching user data or orders:', error);
      }
    };
  
    console.log('Token:', token);
    fetchData();
  }, [token]);
      

      const handleLogin = async () => {
        try {
          // Make a POST request to your login API endpoint
          const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginForm),
          });
      
          if (!response.ok) {
            // Handle login error here, e.g., show an error message
            console.error('Login failed:', response.status, await response.text());
            return;
          }
      
          const responseData = await response.json();
      
          if (!responseData.token) {
            // Handle missing token in the response
            console.error('Token is missing in the login response');
            return;
          }
      
          // Save the token in localStorage
          localStorage.setItem('token', responseData.token);
      
          // Update the state with the new token
          setToken(responseData.token);
        } catch (error) {
          console.error('Error during login:', error);
        }
      };
      
      const handleSignup = async () => {
        try {
          // Make a POST request to your signup API endpoint
          const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupForm),
          });
    
          const { token: newToken } = await response.json();
          setToken(newToken);
    
          // Now, you may want to save the token in a secure way (e.g., cookies, local storage)
          // For simplicity, I'm just setting it to the state here
    
          const userDataResponse = await fetch('http://localhost:4000/auth/user', {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
    
          const userData = await userDataResponse.json();
          setUser(userData);
        } catch (error) {
          console.error('Error during signup:', error);
        }
      };
      const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:4000/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const result = await response.json();
          console.log(result); // You can handle the result or show a message to the user
    
          // Clear the token and user data on logout
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

  const toggleForm = () => {
    setShowSignupForm(!showSignupForm);
  };
  return (
    <Box p={4}>
      {user ? (
        <>
          <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>
        User Profile
      </Heading>
      <Box mb={4}>
        <Heading as="h3" size="lg" mb={2}>
        Email: {user.email}
        </Heading>
        <Heading as="h3" size="lg" mb={2}>
        Name: {user.name}
        </Heading>
        <Heading as="h3" size="lg" mb={2}>
        Mobile: {user.mobile}
        </Heading>
        <Heading as="h3" size="lg" mb={2}>
        DOB: {user.dob}
        </Heading>
      </Box>
      <Box>
        <Heading as="h3" size="lg" mb={2}>
          Order History
        </Heading>
        <UnorderedList>
        {Array.isArray(userOrders) && userOrders.length === 0 ? (
            <ListItem>No orders available.</ListItem>
        ) : (
            Array.isArray(userOrders) &&
            userOrders.map((order) => (
            <ListItem key={order._id}>
                {order.product} - ${order.price}
            </ListItem>
            ))
        )}
        </UnorderedList>

        <Box>
            <Button onClick={handleLogout} colorScheme="red">
              Logout
            </Button>
          </Box>
      </Box>
    </Box>
        </>
      ) : (
        <>
        {showSignupForm ? (
          <>
           <Heading as="h2" size="xl" mb={4}>
                Signup
                </Heading>
                <Box mb={4}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    mt={2}
                />
                <Input
                    type="text"
                    placeholder="Mobile Number"
                    value={signupForm.mobile}
                    onChange={(e) => {
                        const inputVal = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                        const formattedValue = inputVal.slice(0, 10); // Take only the first 10 characters
                        setSignupForm({ ...signupForm, mobile: formattedValue });
                      }}
                    mt={2}
                    
                />
                <Input
                    type="text"
                    placeholder="Full Name"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    mt={2}
                />
                <Input
                    type="date"
                    placeholder="Date of Birth"
                    value={signupForm.dob}
                    onChange={(e) => setSignupForm({ ...signupForm, dob: e.target.value })}
                    mt={2}
                />
                <Button onClick={handleSignup} mt={4}>
                    Signup
                </Button>
                <Text mt={2} onClick={toggleForm} cursor="pointer" color="blue.500">
                    Already registered? Login
                </Text>
                </Box>
          </>
        ) : (
          <>
            <Heading as="h2" size="xl" mb={4}>
              Login
            </Heading>
            <Box mb={4}>
              <Input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                mt={2}
              />
              <Button onClick={handleLogin} mt={4}>
                Login
              </Button>
              <Text mt={2} onClick={toggleForm} cursor="pointer" color="blue.500">
                Not registered? Sign Up
              </Text>
            </Box>
          </>
        )}
      </>
      )}
    </Box>
  );
};

export default UserProfile;
