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

const Siderbar = ({ selectedPage, onSelectPage }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    onSelectPage("Dashboard");
    navigate("/");
  };

  return (
    <div className="menu">
      <div
        className="logo1"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img className="logo1" src={logo1} alt=""></img>
      </div>
      <div className="menu--list">
        <div
          className={`item ${selectedPage === "Dashboard" ? "active" : ""}`}
          onClick={() => onSelectPage("Dashboard")}
          style={{ cursor: "pointer" }}
        >
          <BiHome className="icon" />
          Dashboard
        </div>
        <div
          className={`item ${selectedPage === "Requests" ? "active" : ""}`}
          onClick={() => onSelectPage("Requests")}
          style={{ cursor: "pointer" }}
        >
          <BiTask className="icon" />
          Requests
        </div>
        <div
          className={`item ${selectedPage === "Documents" ? "active" : ""}`}
          onClick={() => onSelectPage("Documents")}
          style={{ cursor: "pointer" }}
        >
          <BiSolidReport className="icon" />
          Documents
        </div>
        <div
          className={`item ${selectedPage === "Performance" ? "active" : ""}`}
          onClick={() => onSelectPage("Performance")}
          style={{ cursor: "pointer" }}
        >
          <BiStats className="icon" />
          Performance
        </div>
        <div
          className={`item ${selectedPage === "Help" ? "active" : ""}`}
          onClick={() => onSelectPage("Help")}
          style={{ cursor: "pointer" }}
        >
          <BiHelpCircle className="icon" />
          Help
        </div>
      </div>
    </div>
  );
};

export default Siderbar;
