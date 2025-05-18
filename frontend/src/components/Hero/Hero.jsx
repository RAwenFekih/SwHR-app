import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import dark_arrow from "../../assets/dark-arrow.webp";
const Hero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/info");
  };

  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>Build Stronger Teams for a Brighter Future</h1>
        <p>
          Our smart HR management platform that centralizes employee records,
          automates HR processes, and enhances decision-making. Fast, secure,and
          user-friendly, it streamlines all HR operations in one place.
        </p>
        <button className="btn1" onClick={handleExploreClick}>
          Explore More <img src={dark_arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
