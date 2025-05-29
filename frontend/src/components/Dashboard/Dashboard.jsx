import React, { useState, useEffect } from "react";
import Siderbar from "./Siderbar";
import Profile from "./Profile";
import Content from "./Content";
import RequestsPage from "./RequestsPage";
import ManageRequest from "./ManageRequest";
import ManageEmployees from "./ManageEmployees";
import AddDocument from "./AddDocument";
import PerformancePage from "./PerformancePage";
import DashboardHR from "../DashboardHR/DashboardHR";
import HelpPage from "./HelpPage";
import AddEmployee from "../AddEmployee/AddEmployee";
import chatbotIcon from "../../assets/chatbot1.png";
import "./Dashboard.css";

function generateUUID() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c) => c ^ crypto.getRandomValues(new Uint8Array(1))[0].toString(16)
  );
}

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [chatState, setChatState] = useState(null);
  const [requestData, setRequestData] = useState({});
  const [userInput, setUserInput] = useState("");
  const [awaitingCustomQuestion, setAwaitingCustomQuestion] = useState(false);


  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            "Hello! 😊 I'm your HR assistant. How can I help you today? Please choose an option below:",
        },
      ]);
    }
  };

  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { role: "user", content: option }]);

    if (option.includes("Submit leave")) {
      setChatState("leave_type");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Great! What type of leave would you like to request?\n\n" +
            "Available options:\n" +
            "1. Vacation 🏖\n" +
            "2. Wedding 💒\n" +
            "3. Child born 👶\n" +
            "4. Relative's death 😢",
        },
      ]);
    } else if (option.includes("View request status")) {
      if (!userId) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "❌ You need to be logged in to view your requests.",
          },
        ]);
        return;
      }

      fetch(`http://localhost:8081/api/requests/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.length) {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "📭 You have no leave requests yet.",
              },
            ]);
          } else {
            const formatted = data
              .map(
                (req) =>
                  `📌🔹 Type: ${req.leave_type.replace(/_/g, " ")} \n 📅 ${
                    req.start_date
                  } → ${req.end_date} (${req.days_requested} days)\n Status: ${
                    req.status
                  }\n\n`
              )
              .join("\n\n");

            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: `📋 Your Leave Requests:\n\n${formatted}`,
              },
            ]);
          }
        })
        .catch((err) => {
          console.error("Error fetching leave requests:", err);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `❌ Error fetching your leave requests. Please try again later.`,
            },
          ]);
        });
    } else if (option.includes("Other questions")) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sure! Please type your question below.",
        },
      ]);
      setAwaitingCustomQuestion(true); // You’ll use this to show the input box
    } else {
      // Handle regular options
      fetch(`http://localhost:8081/api/chat`)
        .then((res) => res.json())
        .then((data) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.response }, // <-- Add response here
          ]);
        });
    }
  };

  const submitLeaveRequest = async (payload) => {
    try {
      const response = await fetch("http://localhost:8081/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-ID": payload.request_id || generateUUID(),
        },
        body: JSON.stringify({
          ...payload,
          status: "pending",
          created_at: new Date().toISOString(),
          user_id: userId,
          days_requested: payload.days_requested || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Leave request submission error:", error);
      throw new Error(
        error.message || "Failed to submit leave request. Please try again."
      );
    }
  };

  const handleUserInputSubmit = async () => {
    if (!userInput.trim()) return;

    const input = userInput.trim();
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setUserInput("");

    try {
      if (!userId)
        throw new Error("You must be logged in to submit a leave request");

      if (chatState === "leave_type") {
        const leaveTypeMap = {
          1: "vacation",
          vacation: "vacation",
          2: "wedding",
          wedding: "wedding",
          3: "child_born",
          "child born": "child_born",
          child: "child_born",
          4: "relatives_death",
          death: "relatives_death",
        };
        const leaveType = leaveTypeMap[input.toLowerCase()];
        if (!leaveType) {
          throw new Error("Please select a valid leave type (1-4).");
        }

        setRequestData({
          leave_type: leaveType,
          user_id: userId,
          request_id: generateUUID(),
        });
        setChatState("start_date");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "📅 When should the leave start? (YYYY-MM-DD)",
          },
        ]);
        return;
      }

      if (chatState === "start_date") {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
          throw new Error("Invalid date format. Please use YYYY-MM-DD");
        }

        const startDate = new Date(input);
        if (startDate < new Date()) {
          throw new Error("Start date must be in the future");
        }

        setRequestData((prev) => ({ ...prev, start_date: input }));
        setChatState("end_date");
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "📅 When should it end? (YYYY-MM-DD)" },
        ]);
        return;
      }

      if (chatState === "end_date") {
        const endDate = new Date(input);
        const startDate = new Date(requestData.start_date);
        if (endDate <= startDate) {
          throw new Error("End date must be after start date");
        }

        const diffDays =
          Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        setRequestData((prev) => ({
          ...prev,
          end_date: input,
          days_requested: diffDays,
        }));
        setChatState("description");
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "📝 Any additional notes? (Optional)" },
        ]);
        return;
      }

      if (chatState === "description") {
        const payload = {
          ...requestData,
          description: input || "No additional notes provided",
        };
        const result = await submitLeaveRequest(payload);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              `✅ Leave request submitted successfully!\n\n` +
              `🔹 Type: ${requestData.leave_type.replace(/_/g, " ")}\n` +
              `🔹 Dates: ${requestData.start_date} to ${requestData.end_date}\n` +
              `🔹 Days: ${requestData.days_requested}\n` +
              `🔹 Status: Pending\n` +
              (result.remainingDays !== undefined
                ? `🔹 Remaining: ${result.remainingDays} days`
                : ""),
          },
        ]);

        setChatState(null);
        setRequestData({});
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ ${error.message}\nPlease try again.`,
        },
      ]);
    }

    if (awaitingCustomQuestion) {
      try {
        const res = await fetch("http://localhost:8081/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `❌ Error getting response: ${error.message}`,
          },
        ]);
      } finally {
        setAwaitingCustomQuestion(false);
      }
      return;
    }
  };

  const renderPage = () => {
    switch (selectedPage) {
      case "Requests":
        return <RequestsPage />;
      case "ManageRequest":
        return <ManageRequest />;
      case "Performance":
        return <PerformancePage />;
      case "AddDocument":
        return <AddDocument />;
      case "Add Employee":
        return <AddEmployee />;
      case "ManageEmployees":
        return <ManageEmployees />;
      case "DashboardHR":
        return <DashboardHR />;
      case "Help":
        return <HelpPage />;
      case "Dashboard":
      default:
        return <Content userId={userId} />;
    }
  };

  const profileContainerStyle = isSmallScreen
    ? {
        width: "100%",
        height: "auto",
        position: "static",
        boxShadow: "none",
        borderRadius: 0,
        padding: "10px",
        overflowY: "visible",
        zIndex: "auto",
      }
    : {
        width: selectedPage === "ManageRequest" ? "370px" : "400px",
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
      <Siderbar
        selectedPage={selectedPage}
        onSelectPage={setSelectedPage}
        userRole={userData?.role}
      />
      <div className="dashboard--content" style={{ display: "flex" }}>
        {selectedPage === "Dashboard" ? (
          <>
            {renderPage()}
            <Profile user={userData} />
          </>
        ) : (
          <>
            <div style={profileContainerStyle}>
              <Profile user={userData} />
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
                key={`${msg.role}-${index}`}
                className={`message ${msg.role}`}
              >
                <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
                {msg.content}
              </div>
            ))}
          </div>

          <div className="chatbot-options">
            {!chatState && !awaitingCustomQuestion &&
              [
                "🏖 Submit leave/vacation request",
                "🔄 View request status",
                "💬 Other questions",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  className="option-button"
                >
                  {opt}
                </button>
              ))}
          </div>

          {(chatState|| awaitingCustomQuestion) && (
            <div className="chatbot-input">
              <input
                type="text"
                value={userInput}
                placeholder={
                  chatState === "leave_type"
                    ? "Enter leave type (1-4)"
                    : chatState === "start_date"
                    ? "Enter start date (YYYY-MM-DD)"
                    : chatState === "end_date"
                    ? "Enter end date (YYYY-MM-DD)"
                    : "Type your notes..."
                }
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUserInputSubmit()}
              />
              <button onClick={handleUserInputSubmit}>Send</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
