import React from "react";
import "./UserList.css";
import image1 from "../../assets/user.webp";
import PerformanceChart from "./PerformanceChart";

const UserList = ({ data, selectedCard }) => {
  if (!selectedCard || data.length === 0) {
    return null; // Render nothing if no card selected or no data
  }

  const renderHeader = () => {
    switch (selectedCard) {
      case "My Documents":
        return "Documents";
      case "My Requests":
        return "Requests";
      case "My Performance":
        return "Performance";
      case "Manage Employees":
        return "Employees";
      default:
        return "Users";
    }
  };

  const renderListItem = (item) => {
    switch (selectedCard) {
      case "My Documents":
      case "My Requests":
        return (
          <div key={item.id} className="list">
            <div className="document--detail">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <span>{item.date}</span>
          </div>
        );
      case "My Performance":
        return null;
      case "Manage Employees":
      default:
        return (
          <div key={item.id} className="list">
            <div className="user--detail">
              <img src={item.image || image1} alt={item.name} />
              <h2>{item.name}</h2>
            </div>
            <span>{item.duration}</span>
            <span>DT{item.cost}/hr.</span>
            <span className="user--todo">:</span>
          </div>
        );
    }
  };

  return (
    <div className="user--list">
      <div className="list--header">
        <h2>{renderHeader()}</h2>
        <select>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="arabic">Arabic</option>
        </select>
      </div>
      <div className="list--container">
        {selectedCard === "My Performance" ? (
          <PerformanceChart data={data} />
        ) : (
          data.map(renderListItem)
        )}
      </div>
    </div>
  );
};

export default UserList;
