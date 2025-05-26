import React, { useState } from "react";
import ContentHeader from "./ContentHeader";
import "./Content.css";
import Card from "./Card";
import UserList from "./UserList";

const documents = [
  {
    id: 1,
    title: "Employee Contract",
    date: "2024-01-15",
    description: "Contract document for Rawen Fekih",
  },
  {
    id: 2,
    title: "Performance Review",
    date: "2024-06-10",
    description: "Mid-year performance review for Rawen Fekih",
  },
  {
    id: 3,
    title: "Training Certificate",
    date: "2024-03-22",
    description: "Completed React training by Rawen Fekih",
  },
];

const requests = [
  {
    id: 1,
    title: "Vacation",
    date: "01-06-2025 / 15-06-2025",
    description: "Request for vaction",
    days: 15,
    status: "Approved",
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
  { id: 1, date: "2024-01", score: 75 },
  { id: 2, date: "2024-02", score: 80 },
  { id: 3, date: "2024-03", score: 85 },
  { id: 4, date: "2024-04", score: 90 },
  { id: 5, date: "2024-05", score: 88 },
  { id: 6, date: "2024-06", score: 92 },
];

const Content = () => {
  const [selectedCard, setSelectedCard] = useState("My Documents");

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
  }

  return (
    <div className="content">
      <ContentHeader />
      <Card selectedCard={selectedCard} onCardClick={handleCardClick} />
      <UserList data={listData} selectedCard={selectedCard} />
    </div>
  );
};

export default Content;
