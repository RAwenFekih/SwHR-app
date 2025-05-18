import React from "react";
import Siderbar from "./Siderbar";
import Profile from "./Profile";
import Content from "./Content";
import chatbotIcon from "../../assets/chatbot1.png";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Siderbar />
      <div className="dashboard--content">
        <Content />
        <Profile />
      </div>
      <img src={chatbotIcon} alt="Chatbot Icon" className="chatbot-icon" />
    </div>
  );
};

export default Dashboard;
