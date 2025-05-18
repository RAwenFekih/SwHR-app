import React from "react";
import "./InfoPage.css";
import aboutImg from "../../assets/about.png";
import gallery1 from "../../assets/gallery-1.jpg";
import gallery2 from "../../assets/gallery-2.jpg";

const InfoPage = () => {
  return (
    <div className="info-page container">
      <h1>Welcome to SwHR</h1>
      <div className="info-content">
        <img src={aboutImg} alt="About SwHR" className="info-about-img" />
        <div className="info-text">
          <p>
            SwHR is a cutting-edge HR management platform designed to empower
            businesses with efficient, secure, and user-friendly tools.
          </p>
          <p>
            Our platform centralizes employee records, automates HR processes,
            and enhances decision-making to help your organization build
            stronger teams for a brighter future.
          </p>
          <p>
            Explore features like real-time tracking, automated workflows,
            insightful analytics, and seamless communication to elevate your HR
            management experience.
          </p>
          <p>
            Join us in transforming the way businesses manage their most
            valuable asset their people.
          </p>
          <button
            className="signin-btn"
            onClick={() => (window.location.href = "/auth")}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="info-gallery-grid">
        <div className="gallery-item">
          <p className="gallery-caption">Our happy and motivated team</p>
          <img src={gallery1} alt="Gallery 1" className="gallery-img-grid" />
        </div>
        <div className="gallery-item">
          <p className="gallery-caption">Collaborative business meetings</p>
          <img src={gallery2} alt="Gallery 2" className="gallery-img-grid" />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
