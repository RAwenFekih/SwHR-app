import React from "react";
import "./ManageRequest.css";

const ManageRequest = () => {
  const requests = [
    {
      employee: "Mohammed Makhloufi",
      requestType: "Vacation",
      dates: "01-06-2025 / 15-06-2025",
      totalDays: 15,
    },
    {
      employee: "Nader Zini",
      requestType: "Wedding",
      dates: "28-05-2025 / 15-06-2025",
      totalDays: 19,
    },
    {
      employee: "Rawia Nemria",
      requestType: "Child Born",
      dates: "05-08-2025 / 08-08-2025",
      totalDays: 3,
    },
    {
      employee: "Azza Hajri",
      requestType: "Vacation",
      dates: "15-08-2025 / 25-08-2025",
      totalDays: 10,
    },
  ];

  return (
    <div className="manage-request-container">
      <table className="manage-request-table">
        <thead>
          <tr>
            <th>Employees</th>
            <th>Request Type</th>
            <th>Dates of Request</th>
            <th>Total Days</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index} className={index % 2 === 1 ? "alt-row" : ""}>
              <td>{req.employee}</td>
              <td>{req.requestType}</td>
              <td>{req.dates}</td>
              <td>{req.totalDays}</td>
              <td>
                <div className="button-group">
                  <button className="accept-btn">Accept</button>
                  <button className="reject-btn">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequest;
