import React, { useState, useEffect } from "react";
import "./ManageRequest.css";

const updateRequestStatus = async (request_id, status) => {
  try {
    console.log(request_id);
    console.log(status);
    
    const response = await fetch("http://localhost:8081/api/requests/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request_id, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update request status");
    }

  } catch (err) {
    console.error("Update failed:", err.message);
  }
};


const ManageRequest = () => {
    const [requests, setRequestsData] = useState([]);
    const [messages, setMessages] = useState([]); 
  
    useEffect(() => {
      fetch(`http://localhost:8081/api/requests/all`)
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
    });

  return (
    <div className="manage-request-container">
      <table className="manage-request-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Request Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index} className={index % 2 === 1 ? "alt-row" : ""}>
              <td>{req.name}</td>
              <td>{req.leave_type}</td>
              <td>{req.start_date.split('T')[0]}</td>
              <td>{req.end_date.split('T')[0]}</td>
              <td>{req.days_requested}</td>
              <td>
                <div className="button-group">
                  {req.status}
                  {req.status === 'pending' && (
                    <> :
                  <button className="accept-btn" onClick={() => updateRequestStatus(req.request_id, 'approved')}>Approve</button>
                  <button className="reject-btn" onClick={() => updateRequestStatus(req.request_id, 'rejected')}>Reject</button>
                  </>
                  )}
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