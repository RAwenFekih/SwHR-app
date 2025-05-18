import React from "react";
import "./Programs.css";
import program_1 from "../../assets/Program1.webp";
import program_2 from "../../assets/Program2.jpg";
import program_3 from "../../assets/Program3.jpg";
import program_icon_1 from "../../assets/program_icon_1.png";
import program_icon_2 from "../../assets/program_icon_2.png";
import program_icon_3 from "../../assets/program_icon_3.png";

const programs = () => {
  return (
    <div className="programs">
      <div className="program">
        <img src={program_1} alt="" />
        <div className="caption">
          <img src={program_icon_1} alt="" />
          <p>Expert Team</p>
        </div>
      </div>
      <div className="program">
        <img src={program_2} alt="" />
        <div className="caption">
          <img src={program_icon_2} alt="" />
          <p>Creative Minds</p>
        </div>
      </div>
      <div className="program">
        <img src={program_3} alt="" />
        <div className="caption">
          <img src={program_icon_3} alt="" />
          <p>Top Team</p>
        </div>
      </div>
    </div>
  );
};

export default programs;
