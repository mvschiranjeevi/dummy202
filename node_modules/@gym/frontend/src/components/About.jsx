import React from "react";
import aboutimg from "../images/about.png";
import { color } from "framer-motion";

function About() {
  return (
    <div id="about">
      <div className="about-image">
        <img src={aboutimg} alt=""></img>
      </div>
      <div className="about-text">
        <h1> LEARN MORE ABOUT US</h1>
        <p style={{ color: "black" }}>
          GYM started as a bit less of a dream, and more of a hobby to us. We
          are working as high-tech sales executive in Silicon Valley and, while
          always athletic and sporty, we had only recently discovered a passion
          for weight training and competing in bodybuilding competitions, with
          the guidance of our coaches. With a background in business, we
          initially intended to help overselves and we got our dream started
        </p>
        <button>READ MORE</button>
      </div>
    </div>
  );
}
export default About;
