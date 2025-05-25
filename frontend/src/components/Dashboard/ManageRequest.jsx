import React from "react";
import "./ManageRequest.css";

const ManageRequest = () => {
  const requests = [
    {
      employee: "Nader Zini",
      requestType: "Wedding",
      startDate: "28-05-2025",
      endDate: "15-06-2025",
      totalDays: 19,
    },
    {
      employee: "Rawia Nemria",
      requestType: "Child Born",
      startDate: "05-08-2025",
      endDate: "08-08-2025",
      totalDays: 3,
    },
    {
      employee: "Azza Hajri",
      requestType: "Vacation",
      startDate: "15-08-2025",
      endDate: "25-08-2025",
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
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index} className={index % 2 === 1 ? "alt-row" : ""}>
              <td>{req.employee}</td>
              <td>{req.requestType}</td>
              <td>{req.startDate}</td>
              <td>{req.endDate}</td>
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