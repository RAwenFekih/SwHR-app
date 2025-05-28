import React, { useState, useEffect } from "react";
import "./ManageEmployees.css";

const ManageEmployees = () => {
  const [employees, setEmployeesData] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/users/all/all`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => setEmployeesData(data))
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setMessages((prev) => [
          ...prev,
          {
            content: `❌ Error fetching employees. Please try again later.`,
          },
        ]);
      });
  });

  return (
    <div className="manage-employees-container">
      <h1 className="manage-employees-h1">Manage Employees</h1>
      <table className="manage-employees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Vacation Days Left</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((req, index) => (
            <tr key={index} className={index % 2 === 1 ? "alt-row" : ""}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.role}</td>
              <td>{req.vacation_days_left}</td>
              <td>{req.year}</td>
              <td>
                <div className="button-group-1">
                  <button className="remove-btn">Remove</button>
                  <button className="add-btn">Edit</button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;
