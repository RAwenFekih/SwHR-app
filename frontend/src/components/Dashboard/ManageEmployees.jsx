import React from "react";
import "./ManageEmployees.css";

const ManageEmployees = ({ onNavigate }) => {
  const requests = [
    {
      employee_id: "E001",
      email: "mohammed.makhloufi@gmail.com",
      password: "password123",
    },
    {
      employee_id: "E002",
      email: "nader.zini@gmail.com",
      password: "password456",
    },
    {
      employee_id: "E003",
      email: "rawia.nemria@gmail.com",
      password: "password789",
    },
    {
      employee_id: "E004",
      email: "azza.hajri@gmail.com",
      password: "password101",
    },
  ];

  return (
    <div className="manage-employees-container">
      <h1 className="manage-employees-h1">Manage Employees</h1>
      <table className="manage-employees-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Password</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index} className={index % 2 === 1 ? "alt-row" : ""}>
              <td>{req.employee_id}</td>
              <td>{req.email}</td>
              <td>{req.password}</td>
              <td>
                <div className="button-group-1">
                  <button
                    className="add-btn"
                    onClick={() => onNavigate("Add Employee")}
                  >
                    Add
                  </button>
                  <button className="remove-btn">Remove</button>
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
