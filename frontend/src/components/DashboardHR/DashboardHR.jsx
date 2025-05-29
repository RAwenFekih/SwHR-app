import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "./DashboardHR.css";

const ageData = [
  { ageGroup: "20-30", count: 20 },
  { ageGroup: "31-40", count: 40 },
  { ageGroup: "41-50", count: 60 },
  { ageGroup: "51-60", count: 50 },
  { ageGroup: "61+", count: 30 },
];

const performanceData = [
  { month: "Jan", performance: 3 },
  { month: "Feb", performance: 4 },
  { month: "Mar", performance: 5 },
  { month: "Apr", performance: 4.5 },
  { month: "May", performance: 5 },
];

const requestsData = [
  { type: "Vacation", count: 50 },
  { type: "Wedding", count: 80 },
  { type: "Child Born", count: 40 },
  { type: "Relatives Death", count: 10 },
];

const COLORS = ["#174b6e", "#007bff"];

const DashboardHR = () => {
  return (
    <div className="dashboard-hr-container">
      <div className="dashboard-header">
        <div className="dashboard-title-box">
          <div className="red-circle"></div>
          <div className="dashboard-title-text">
            <div className="title-main">HR Dashboard</div>
            <div className="title-sub">Full insights</div>
          </div>
        </div>
        <div className="dashboard-info-box total-employees">
          <div className="info-label">Total Employees</div>
          <div className="info-number">8</div>
        </div>
        <div className="dashboard-info-box male-info">
          <div className="info-icon">👨</div>
          <div className="info-number">5</div>
          <div className="info-percentage">60%</div>
        </div>
        <div className="dashboard-info-box female-info">
          <div className="info-icon">👩</div>
          <div className="info-number">3</div>
          <div className="info-percentage">40%</div>
        </div>
      </div>

      <div className="middle-section">
        <div className="chart age-chart">
          <h3>Age</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={ageData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis dataKey="ageGroup" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#174b6e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart performance-chart">
          <h3>Total Performances</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart
              data={performanceData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#007bff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bottom-section">
        <div className="chart requests-chart">
          <h3>Total Requests</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={requestsData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#174b6e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHR;
