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

const options = [
  "🏖 Submit leave/vacation request",
  "🔄 View request status",
  "📨 Check assignments",
  "Chat Freely with me"
];

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
const Dashboard = ({ user }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);

  // ✅ Parse user from localStorage
  const storedUser = localStorage.getItem("user");
  console.log(storedUser)
  const userId = storedUser ? JSON.parse(storedUser).id : null;
  console.log(userId)

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8081/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("User fetch error:", err));
  }, [userId]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! 😊 I'm your HR assistant. How can I help you? Please choose an option below:"
        }
      ]);
    }
  };

  const handleOptionClick = async (option) => {
    const newUserMessage = { role: "user", content: option };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch("http://localhost:8081/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: option })
      });

      const data = await response.json();
      const botReply = { role: "assistant", content: data.response };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
      <Siderbar />
      <div className="dashboard--content">
        <Content />
        <Profile user={userData} />
      </div>

      <img
        src={chatbotIcon}
        alt="Chatbot Icon"
        className="chatbot-icon"
        onClick={toggleChat}
      />

      {isChatOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>HR Assistant</h3>
            <button onClick={toggleChat}>X</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}-${msg.content}`}
                className={`message ${msg.role}`}
              >
                <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
                {msg.content}
              </div>
            ))}
          </div>

          <div className="chatbot-options">
            {["🏖 Submit leave/vacation request", "🔄 View request status", "📨 Check assignments", "Chat Freely with me"].map((opt) => (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className="option-button"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
