import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BiHome,
  BiBookAlt,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
} from "react-icons/bi";
import "./Siderbar.css";

const Siderbar = () => {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <BiBookAlt className="logo-icon" />
        <h2>SwHR</h2>
      </div>
      <div className="menu--list">
        <a href="#" className="item active">
          <BiHome className="icon" />
          Dashboard
        </a>
        <a href="#" className="item">
          <BiTask className="icon" />
          Assignment
        </a>
        <a href="#" className="item">
          <BiSolidReport className="icon" />
          Reports
        </a>
        <a href="#" className="item">
          <BiStats className="icon" />
          Stats
        </a>
        <a href="#" className="item">
          <BiMessage className="icon" />
          Message
        </a>
        <a href="#" className="item">
          <BiHelpCircle className="icon" />
          Help
        </a>
      </div>
    </div>
  );
};

export default Siderbar;
