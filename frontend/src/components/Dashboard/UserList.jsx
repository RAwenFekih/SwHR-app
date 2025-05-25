import React, { useState } from "react";
import "./UserList.css";
import image1 from "../../assets/user.webp";
import PerformanceChart from "./PerformanceChart";

const translations = {
  english: {
    documents: "My Documents",
    requests: "My Requests",
    performance: "My Performance",
    employees: "Manage Employees",
    users: "Users",
    requestType: "Request Type",
    datesOfRequest: "Dates of Request",
    totalDays: "Total Days",
    status: "Status",
    todo: "To Do",
  },
  french: {
    documents: "Mes Documents",
    requests: "Mes Demandes",
    performance: "Ma Performance",
    employees: "Gérer les Employés",
    users: "Utilisateurs",
    requestType: "Type de Demande",
    datesOfRequest: "Dates de la Demande",
    totalDays: "Nombre de Jours",
    status: "Statut",
    todo: "À Faire",
  },
  arabic: {
    documents: "مستنداتي",
    requests: "طلباتي",
    performance: "أدائي",
    employees: "إدارة الموظفين",
    users: "المستخدمون",
    requestType: "نوع الطلب",
    datesOfRequest: "تواريخ الطلب",
    totalDays: "إجمالي الأيام",
    status: "الحالة",
    todo: "المهام",
  },
};

const dataTranslations = {
  french: {
    // Example translations for data content fields
    "Document 1": "Document 1 (FR)",
    "Request A": "Demande A",
    "John Doe": "Jean Dupont",
    "Task 1": "Tâche 1",
  },
  arabic: {
    "Document 1": "المستند 1",
    "Request A": "طلب أ",
    "John Doe": "جون دو",
    "Task 1": "المهمة 1",
  },
};

const UserList = ({ data, selectedCard }) => {
  const [language, setLanguage] = useState("english");

  if (!selectedCard || data.length === 0) {
    return null; // Render nothing if no card selected or no data
  }

  const t = translations[language];

  const translateText = (text) => {
    if (language === "english") return text;
    return dataTranslations[language] && dataTranslations[language][text]
      ? dataTranslations[language][text]
      : text;
  };

  const renderHeader = () => {
    switch (selectedCard) {
      case "My Documents":
        return t.documents;
      case "My Requests":
        return t.requests;
      case "My Performance":
        return t.performance;
      case "Manage Employees":
        return t.employees;
      default:
        return t.users;
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (selectedCard === "My Requests") {
    return (
      <div className="user--list">
        <div className="list--header">
          <h2>{renderHeader()}</h2>
          <select value={language} onChange={handleLanguageChange}>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="arabic">Arabic</option>
          </select>
        </div>
        <table className="requests-table">
          <thead>
            <tr>
              <th>{t.requestType}</th>
              <th>{t.datesOfRequest}</th>
              <th>{t.totalDays}</th>
              <th>{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{translateText(item.title)}</td>
                <td>{item.date}</td>
                <td>{item.days !== undefined ? item.days : "-"}</td>
                <td>{item.status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const renderListItem = (item) => {
    switch (selectedCard) {
      case "My Documents":
        return (
          <div key={item.id} className="list">
            <div className="document--detail">
              <h2>{translateText(item.title)}</h2>
              <p>{translateText(item.description)}</p>
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
              <img src={item.image || image1} alt={translateText(item.name)} />
              <h2>{translateText(item.name)}</h2>
            </div>
            <span>{item.duration}</span>
            <span>{`DT${item.cost}/hr.`}</span>
            <span className="user--todo">{t.todo}</span>
          </div>
        );
    }
  };

  return (
    <div className="user--list">
      <div className="list--header">
        <h2>{renderHeader()}</h2>
        <select value={language} onChange={handleLanguageChange}>
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
