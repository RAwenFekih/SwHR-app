import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BiHome,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
  BiUserPlus,
  BiFileBlank,
  BiGroup,
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
          className={`item ${selectedPage === "Help" ? "active" : ""}`}
          onClick={() => onSelectPage("Help")}
          style={{ cursor: "pointer" }}
        >
          <BiHelpCircle className="icon" />
          Help
        </div>
        <div
          className={`item ${selectedPage === "ManageRequest" ? "active" : ""}`}
          onClick={() => onSelectPage("ManageRequest")}
          style={{ cursor: "pointer" }}
        >
          <BiSolidReport className="icon" />
          Manage Requests
        </div>
        <div
          className={`item ${selectedPage === "Performance" ? "active" : ""}`}
          onClick={() => onSelectPage("Performance")}
          style={{ cursor: "pointer" }}
        >
          <BiStats className="icon" />
          Review Performances
        </div>
        <div
          className={`item ${selectedPage === "Add Employee" ? "active" : ""}`}
          onClick={() => onSelectPage("Add Employee")}
          style={{ cursor: "pointer" }}
        >
          <BiUserPlus className="icon" />
          Add Employee
        </div>
        <div
          className={`item ${selectedPage === "Add Document" ? "active" : ""}`}
          onClick={() => onSelectPage("Add Document")}
          style={{ cursor: "pointer" }}
        >
          <BiFileBlank className="icon" />
          Add Document
        </div>
        <div
          className={`item ${
            selectedPage === "Manage Employees" ? "active" : ""
          }`}
          onClick={() => onSelectPage("Manage Employees")}
          style={{ cursor: "pointer" }}
        >
          <BiGroup className="icon" />
          Manage Employees
        </div>
      </div>
    </div>
  );
};

export default Siderbar;
