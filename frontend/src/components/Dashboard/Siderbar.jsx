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

const Siderbar = ({ selectedPage, onSelectPage, userRole }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    onSelectPage("Dashboard");
    navigate("/");
  };

  // Sidebar items with visibility based on role
  const menuItems = [
    {
      label: "Dashboard",
      icon: <BiHome className="icon" />,
      visible: true,
    },
    {
      label: "Requests",
      icon: <BiTask className="icon" />,
      visible: userRole !== "admin",
    },
    {
      label: "ManageRequest",
      icon: <BiSolidReport className="icon" />,
      visible: userRole === "hr",
    },
    {
      label: "Performance",
      icon: <BiStats className="icon" />,
      visible: true,
      visible: userRole === "hr",
    },
    {
      label: "Add Employee",
      icon: <BiUserPlus className="icon" />,
      visible: userRole === "admin",
    },
     {
      label: "ManageEmployees",
      icon: <BiGroup className="icon" />,
      visible: userRole === "admin" || userRole === "hr",
    },
    {
      label: "AddDocument",
      icon: <BiFileBlank className="icon" />,
      visible: userRole === "hr",
    },
    {
      label: "Help",
      icon: <BiHelpCircle className="icon" />,
      visible: true,
    },
    
  ];

  return (
    <div className="menu">
      <div className="logo1" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img className="logo1" src={logo1} alt="Logo" />
      </div>
      <div className="menu--list">
        {menuItems
          .filter((item) => item.visible)
          .map((item) => (
            <div
              key={item.label}
              className={`item ${selectedPage === item.label ? "active" : ""}`}
              onClick={() => onSelectPage(item.label)}
              style={{ cursor: "pointer" }}
            >
              {item.icon}
              {item.label === "ManageRequest" ? "Manage Requests" :
               item.label === "Add Employee" ? "Add Employee" :
               item.label === "Performance" ? "Review Performances" :
               item.label === "Requests" ? "Add Request" :
               item.label === "ManageEmployees" ? "Manage Employees" :
               item.label === "AddDocument" ? "Add Document" :
               item.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Siderbar;
