import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import Header from "./Header";
import Feature from "./Feature";
import Offer from "./Offer";
import About from "./About";
import Contact from "./Contact";
import { Divider } from "@chakra-ui/react";

const Home = () => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   PostService.getAllPublicPosts().then(
  //     (response) => {
  //       setPosts(response.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, []);

  // return (
  //   <div>
  //     <h3>
  //       {posts.map((post, index) => (
  //         <div key={index}>{post.content}</div>
  //       ))}
  //     </h3>
  //   </div>
  // );

  return (
    <>
      <Header></Header>
      <Feature></Feature>
      <Offer></Offer>
      <About></About>
      <Divider />
      <Contact></Contact>
    </>
  );
};

export default Home;
