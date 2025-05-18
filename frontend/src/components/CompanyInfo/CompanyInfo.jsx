import React from "react";
import "./CompanyInfo.css";
import newPhoto1 from "../../assets/gallery-4.jpg";

const CompanyInfo = () => {
  return (
    <div className="company-info container">
      <h1>About Our Company</h1>
      <div className="company-info-content">
        <div className="company-info-gallery">
          <img
            src={newPhoto1}
            alt="Company Photo 1"
            className="company-photo"
          />
        </div>
        <div className="company-info-text">
          <p>
            Our company is dedicated to helping businesses take care of their
            most valuable asset — their people.
          </p>
          <p>
            We provide innovative HR solutions that streamline operations,
            improve employee engagement, and drive organizational success.
          </p>
          <p>
            With a focus on technology and customer service, we empower
            businesses to build stronger, more productive teams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
