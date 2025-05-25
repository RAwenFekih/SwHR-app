import React, { useState, useEffect } from "react";
import Siderbar from "./Siderbar";
import Profile from "./Profile";
import Content from "./Content";
import RequestsPage from "./RequestsPage";
import DocumentsPage from "./DocumentsPage";
import PerformancePage from "./PerformancePage";
import HelpPage from "./HelpPage";
import AddEmployee from "../AddEmployee/AddEmployee";
import chatbotIcon from "../../assets/chatbot1.png";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPage = () => {
    switch (selectedPage) {
      case "Requests":
        return <RequestsPage />;
      case "Documents":
        return <DocumentsPage />;
      case "Performance":
        return <PerformancePage />;
      case "Help":
        return <HelpPage />;
      case "Add Employee":
        return <AddEmployee />;
      case "Dashboard":
      default:
        return <Content />;
    }
  };

  const profileContainerStyle = isSmallScreen
    ? {
        width: "100%",
        height: "500px",
        position: "static",
        boxShadow: "none",
        borderRadius: 0,
        padding: "10px",
        overflowY: "visible",
        zIndex: "auto",
      }
    : {
        width: "400px",
        height: "100vh",
        position: "fixed",
        right: "0",
        top: "0",
        backgroundColor: "white",
        boxShadow: "0 0 15px rgba(0, 123, 255, 0.5)",
        borderRadius: "10px 0 0 10px",
        padding: "20px",
        overflowY: "auto",
        zIndex: 1000,
      };

  return (
    <div className="dashboard">
      <Siderbar selectedPage={selectedPage} onSelectPage={setSelectedPage} />
      <div className="dashboard--content" style={{ display: "flex" }}>
        {selectedPage === "Dashboard" ? (
          <>
            {renderPage()}
            <Profile />
          </>
        ) : (
          <>
            <div style={profileContainerStyle}>
              <Profile />
            </div>
            <div
              style={{
                marginRight: isSmallScreen ? "0" : "350px",
                flexGrow: 1,
              }}
            >
              {renderPage()}
            </div>
          </>
        )}
      </div>
      <img src={chatbotIcon} alt="Chatbot Icon" className="chatbot-icon" />
    </div>
  );
};

export default Dashboard;
