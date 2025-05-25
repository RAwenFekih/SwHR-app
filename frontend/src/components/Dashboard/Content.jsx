import React, { useState, useEffect } from "react";
import ContentHeader from "./ContentHeader";
import "./Content.css";
import Card from "./Card";
import UserList from "./UserList";
import userImage from "../../assets/user.webp";

const documents = [
  {
    id: 1,
    title: "Employee Contract",
    date: "2023-01-01",
    description: "Contract document",
  },
  {
    id: 2,
    title: "Performance Review",
    date: "2025-01-10",
    description: "Mid-year performance review",
  },
  {
    id: 3,
    title: "Training Certificate",
    date: "2024-03-22",
    description: "Completed React training",
  },
];

const employees = [
  {
    id: 1,
    image: userImage,
    name: "Employee A",
    duration: "Full-time",
    cost: "120",
  },
  {
    id: 2,
    image: userImage,
    name: "Employee B",
    duration: "Part-time",
    cost: "80",
  },
];

const Content = ({userId}) => {
  const [selectedCard, setSelectedCard] = useState("My Documents");
  const [performances, setPerformanceData] = useState([]);
  const [requests, setRequestsData] = useState([]);


  // Simulate user role: "employee" or "hr"
  const [userRole] = React.useState("employee");
  const [messages, setMessages] = useState([]); // Ensure messages state exists

  useEffect(() => {
    fetch(`http://localhost:8081/api/performance/user/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => setPerformanceData(data))
      .catch((err) => {
        console.error("Error fetching performance:", err);
        setMessages((prev) => [
          ...prev,
          {
            content: `❌ Error fetching performance. Please try again later.`,
          },
        ]);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/requests/user/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => setRequestsData(data))
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setMessages((prev) => [
          ...prev,
          {
            content: `❌ Error fetching requests. Please try again later.`,
          },
        ]);
      });
  }, [userId]);

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };
 console.log("perf:", performances);
  let listData = [];
  switch (selectedCard) {
    case "My Documents":
      listData = documents;
      break;
    case "My Requests":
      listData = requests;
      break;
    case "My Performance":
      listData = performances;
      console.log("listData:", listData);
      break;
    case "Manage Employees":
      listData = employees;
      break;
    default:
      listData = [];
  }

  return (
    <div className="content">
      <ContentHeader />
      <Card
        selectedCard={selectedCard}
        onCardClick={handleCardClick}
        userRole={userRole}
      />
      <UserList data={listData} selectedCard={selectedCard} />
    </div>
  );
};

export default Content;
