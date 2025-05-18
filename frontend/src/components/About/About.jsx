import React from "react";
import "./About.css";
import about_img from "../../assets/about.png";
import play_icon from "../../assets/play_icon.png";

const About = ({ setPlayState }) => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="" className="about-img" />
        <img
          src={play_icon}
          alt=""
          className="play-icon"
          onClick={() => {
            setPlayState(true);
          }}
        />
      </div>
      <div className="about-right">
        <h3>About Us</h3>
        <h2>
          Empowering Your Business With Top HR Experts and Skilled Talent.
        </h2>
        <p>
          SwHR is our innovative HR management platform designed to simplify and
          enhance employee management processes. By integrating intelligent
          tools and a user-friendly interface, SwHR helps companies connect with
          top talent, streamline administrative tasks, and optimize HR
          operations. Our mission is to empower businesses with efficient,
          secure, and modern solutions that meet the evolving demands of human
          resources management.
        </p>
        <p>
          With SwHR, your HR team gains powerful tools for real-time tracking,
          automated workflows, and insightful analytics. Whether it's managing
          employee records, processing requests, or enhancing communication,
          SwHR ensures a seamless and productive HR experience—designed to grow
          with your business.
        </p>
        <p>Simplify. Automate. Elevate your HR management with ease.</p>
      </div>
    </div>
  );
};

export default About;
