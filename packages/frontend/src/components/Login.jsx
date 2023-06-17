import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
  Stack,
  Image,
  useBreakpointValue,
  Card,
  CardBody,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";
import { userLogin } from "../services/mockApi";
import ErrorMessage from "./ErrorMessage";
import { color } from "framer-motion";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { backendApi } from "../constants";

export default function Login() {
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   setIsLoading(true);

  //   try {
  //     await userLogin({ email, password });
  //     setIsLoggedIn(true);
  //     setIsLoading(false);
  //     setShowPassword(false);
  //   } catch (error) {
  //     setError("Invalid username or password");
  //     setIsLoading(false);
  //     setEmail("");
  //     setPassword("");
  //     setShowPassword(false);
  //   }
  // };

  const [data, setData] = useState({ email: "", password: "" });
  // const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendApi}/api/auth`;
      const result = await axios.post(url, data);
      localStorage.setItem("token", JSON.stringify(result.data));

      if (result.data.data.isEmployee === true) {
        window.location = "/employeehome";
      } else {
        window.location = "/MyClasses";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      {token == null ? (
        <Stack
          minH={"100vh"}
          direction={{ base: "column", md: "row" }}
          spacing={10}
        >
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Flex
              width="full"
              height="100vh"
              align="center"
              justifyContent="center"
              paddingTop={200}
              paddingBottom={100}
            >
              <Box
                p={8}
                maxWidth="500px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="dark-lg"
                border="2px"
                borderColor="white"
              >
                {isLoggedIn ? (
                  <Box textAlign="center">
                    <Text>{email} logged in!</Text>
                    <Button
                      // variantColor="orange"
                      variant="outline"
                      width="full"
                      mt={4}
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Sign out
                    </Button>
                  </Box>
                ) : (
                  <>
                    <Heading textAlign="center">Login</Heading>
                    <Box my={4} textAlign="left">
                      <form onSubmit={handleSubmit}>
                        {error && <ErrorMessage message={error} />}
                        <FormControl isRequired>
                          <FormLabel>Email</FormLabel>
                          <Input
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            variant="filled"
                            type="email"
                            placeholder="test@test.com"
                            size="lg"
                          />
                        </FormControl>
                        <FormControl isRequired mt={6} paddingBlock={5}>
                          <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Input
                              // type="password"
                              placeholder="Password"
                              name="password"
                              onChange={handleChange}
                              value={data.password}
                              required
                              variant="filled"
                              type={showPassword ? "text" : "password"}
                              size="lg"
                            />
                            <InputRightElement width="3rem">
                              <Button
                                h="1.5rem"
                                size="sm"
                                onClick={handlePasswordVisibility}
                              >
                                {showPassword ? (
                                  <Icon name="view-off" />
                                ) : (
                                  <Icon name="view" />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                        <Button bg="#ffa500" type="submit" width="full" mt={4}>
                          {isLoading ? (
                            <CircularProgress
                              isIndeterminate
                              size="24px"
                              color="teal"
                            />
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </form>
                    </Box>
                  </>
                )}
              </Box>
            </Flex>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={"Login Image"}
              objectFit={"cover"}
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            />
          </Flex>
        </Stack>
      ) : (
        <Stack
          height="40rem"
          padding={100}
          width={"full"}
          justify={"center"}
          align="center"
        >
          <Spinner />
          <Text>You are already logged In</Text>
        </Stack>
      )}
    </>
  );
}
