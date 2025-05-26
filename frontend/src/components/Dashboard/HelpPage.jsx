import React from "react";
import "./HelpPage.css";

const HelpPage = () => {
  return (
    <div className="help-page">
      <h1>Help & Support</h1>
      <p>
        Welcome to the Help Page. Here you can find information and assistance
        on how to use the dashboard and its features.
      </p>

      <h2>Navigation</h2>
      <p>
        Use the sidebar on the left to navigate between different sections of
        the dashboard, including Requests, Manage Requests, Performance Reviews,
        and more.
      </p>

      <h2>Common Tasks</h2>
      <ul>
        <li>
          <strong>Leave Request:</strong> Send your requests in the Requests
          section.
        </li>
        <li>
          <strong>Manage Requests:</strong> Approve or reject employees requests
          in the Manage Requests section.
        </li>
        <li>
          <strong>Performance Reviews:</strong> Review employees performances in
          the Performance section.
        </li>
        <li>
          <strong>Add Employee:</strong> Add new employees to the system in the
          Add Employee section.
        </li>
      </ul>

      <h2>Contact Support</h2>
      <p>
        If you need further assistance, please contact our support team at{" "}
        <a href="mailto:contact@swconsultings.com">contact@swconsultings.com</a>
        .
      </p>
    </div>
  );
};

export default HelpPage;