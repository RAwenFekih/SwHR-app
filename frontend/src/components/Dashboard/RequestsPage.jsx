import React, { useState, useEffect } from "react";
import "./RequestsPage.css";

const RequestsPage = () => {
  const [leaveType, setLeaveType] = useState("vacation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("pending");
  // eslint-disable-next-line no-unused-vars
  const [requestDate, setRequestDate] = useState(null);
  const [daysRequested, setDaysRequested] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  // Calculate days requested whenever startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        setError("End date cannot be before start date");
        setDaysRequested(0);
      } else {
        setError("");
        // add 1 to include both start and end dates
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
        setDaysRequested(diffDays);
      }
    } else {
      setDaysRequested(0);
      setError("");
    }
  }, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }
    if (daysRequested <= 0) {
      setError("Invalid date range");
      return;
    }
    const now = new Date();
    setRequestDate(now.toISOString());
    setStatus("pending");

    const data = {
      leaveType,
      startDate,
      endDate,
      status: "pending",
      requestDate: now.toISOString(),
      daysRequested,
    };
    setSubmittedData(data);
    setError("");
  };

  return (
    <div className="container_1">
      <h2 className="heading_1">Leave Request Form</h2>
      <form onSubmit={handleSubmit} className="form_1">
        <label className="label_1">
          Leave Type:
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="select_1"
            required
          >
            <option value="vacation">Vacation</option>
            <option value="wedding">Wedding</option>
            <option value="child born">Child Born</option>
            <option value="relatives death">Relatives Death</option>
          </select>
        </label>
        <label className="label_1">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input_1"
            required
          />
        </label>
        <label className="label_1">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input_1"
            required
          />
        </label>
        <label className="label_1">
          Status:
          <input
            type="text"
            value={status}
            readOnly
            className="input_1 input-disabled"
          />
        </label>
        <label className="label_1">
          Days Requested:
          <input
            type="number"
            value={daysRequested}
            readOnly
            className="input_1 input-disabled"
          />
        </label>
        {error && <p className="error_1">{error}</p>}
        <button type="submit" className="button_1">
          Submit Request
        </button>
      </form>

      {submittedData && (
        <div className="result_1">
          <h3>Request Submitted</h3>
          <p>
            <strong>Leave Type:</strong> {submittedData.leaveType}
          </p>
          <p>
            <strong>Start Date:</strong> {submittedData.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {submittedData.endDate}
          </p>
          <p>
            <strong>Status:</strong> {submittedData.status}
          </p>
          <p>
            <strong>Request Date:</strong>{" "}
            {new Date(submittedData.requestDate).toLocaleString()}
          </p>
          <p>
            <strong>Days Requested:</strong> {submittedData.daysRequested}
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
