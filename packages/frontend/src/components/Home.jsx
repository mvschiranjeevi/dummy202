import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import Header from "./Header";
import Feature from "./Feature";
import Offer from "./Offer";
import About from "./About";
import Contact from "./Contact";
import { Divider, Spinner, Stack, Text } from "@chakra-ui/react";

const Home = () => {
  let token = localStorage.getItem("token");
  token = token
    ? JSON.parse(localStorage.getItem("token")).data.isEmployee
    : null;

  return (
    <>
      {token == null ? (
        <>
          <Header></Header>
          <Feature></Feature>
          <Offer></Offer>
          <About></About>
          <Divider />
          <Contact></Contact>
        </>
      ) : (
        <Stack
          height="40rem"
          padding={100}
          width={"full"}
          justify={"center"}
          align="center"
        >
          <Spinner />
          <Text>This Page is accessed by only non-members</Text>
        </Stack>
      )}
    </>
  );
};

export default Home;
