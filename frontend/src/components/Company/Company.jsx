import React from "react";
import "./Company.css";
import gallery_1 from "../../assets/gallery-1.jpg";
import gallery_2 from "../../assets/gallery-2.jpg";
import gallery_3 from "../../assets/gallery-3.jpg";
import gallery_4 from "../../assets/gallery-4.jpg";
import white_arrow from "../../assets/white-arrow.png";

const Company = () => {
  return (
    <div className="company">
      <div className="gallery">
        <img src={gallery_1} alt="" />
        <img src={gallery_2} alt="" />
        <img src={gallery_3} alt="" />
        <img src={gallery_4} alt="" />
      </div>
      <button
        className="btn dark-btn"
        onClick={() => (window.location.href = "/company-info")}
      >
        See More Here <img src={white_arrow} alt="" />
      </button>
    </div>
  );
};

export default Company;
