import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LeaveRequestForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    leave_type: "vacation",
    start_date: "",
    end_date: "",
    days_requested: 0,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "start_date" || name === "end_date") {
      const start = new Date(name === "start_date" ? value : formData.start_date);
      const end = new Date(name === "end_date" ? value : formData.end_date);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setFormData((prev) => ({
        ...prev,
        days_requested: days > 0 ? days : 0,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const requestPayload = {
        request_id: uuidv4(),
        user_id: userId,
        leave_type: formData.leave_type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        days_requested: formData.days_requested,
        status: "pending",
        created_at: new Date().toISOString()
      };

      await submitLeaveRequest(requestPayload);
      alert("Leave request submitted successfully!");
      setFormData({
        leave_type: "vacation",
        start_date: "",
        end_date: "",
        days_requested: 0,
      });
    } catch (error) {
      setError(error.message || "Failed to submit leave request");
      alert(error.message || "Failed to submit leave request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-4 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Submit Leave Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Leave Type</label>
            <select
              name="leave_type"
              value={formData.leave_type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="vacation">Vacation</option>
              <option value="sick">Sick</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Days Requested</label>
            <input
              type="number"
              value={formData.days_requested}
              readOnly
              className="w-full p-2 border bg-gray-100 rounded"
            />
          </div>
          <div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const submitLeaveRequest = async (data) => {
  try {
    const response = await fetch("http://localhost:8081/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "X-Request-ID": uuidv4()
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting leave request:", error);
    throw error;
  }
};

export default LeaveRequestForm;
