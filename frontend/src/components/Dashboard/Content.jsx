import React, { useState } from "react";
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

const performances = [
  { id: 1, date: "2025-01", score: 75 },
  { id: 2, date: "2025-02", score: 80 },
  { id: 3, date: "2025-03", score: 85 },
  { id: 4, date: "2024-04", score: 90 },
  { id: 5, date: "2024-05", score: 88 },
  { id: 6, date: "2024-06", score: 92 },
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

const Content = () => {
  const [selectedCard, setSelectedCard] = useState("My Documents");

  // Simulate user role: "employee" or "hr"
  const [userRole] = React.useState("employee");

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

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
