import React, { useState } from "react";
import "./PerformancePage.css";

const PerformancePage = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    rating: "",
    review_date: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      user_id: "",
      rating: "",
      review_date: "",
      comment: "",
    });
  };

  return (
    <div
      className="performance-page"
      style={{ backgroundColor: "white", height: "100%", padding: "20px" }}
    >
      <form className="performance-form" onSubmit={handleSubmit}>
        <h2>Performance Review Form</h2>

        <div className="form-group">
          <label htmlFor="user_id">User ID</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            placeholder="Enter user ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="review_date">Review Date</label>
          <input
            type="date"
            id="review_date"
            name="review_date"
            value={formData.review_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Enter your comments"
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default PerformancePage;
