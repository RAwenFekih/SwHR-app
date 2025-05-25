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

const requests = [
  {
    id: 1,
    title: "Leave Request",
    date: "2025-04-01",
    description: "Request for annual leave",
  },

  {
    id: 2,
    title: "Wedding",
    date: "28-05-2025 / 15-06-2025",
    description: "Request for wedding",
    days: 19,
    status: "Rejected",
  },
  {
    id: 3,
    title: "Child Born",
    date: "05-08-2025 / 08-08-2025",
    description: "Request for child born",
    days: 3,
    status: "Pending",
  },
];

/*const performances = [
  { id: 1, date: "2023-12", score: 50 },
  { id: 2, date: "2024-01", score: 65 },
  { id: 3, date: "2024-04", score: 80 },
  { id: 4, date: "2024-08", score: 85 },
];*/

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
