import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BiHome,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
} from "react-icons/bi";
import "./Siderbar.css";
import logo1 from "../../assets/logo.png";

const Siderbar = () => {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <div
        className="logo1"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img className="logo1" src={logo1} alt=""></img>
      </div>
      <div className="menu--list">
        <a href="#" className="item active">
          <BiHome className="icon" />
          Dashboard
        </a>
        <a href="#" className="item">
          <BiTask className="icon" />
          Requests
        </a>
        <a href="#" className="item">
          <BiSolidReport className="icon" />
          Documents
        </a>
        <a href="#" className="item">
          <BiStats className="icon" />
          Performance
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
