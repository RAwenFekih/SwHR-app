import React, { useState } from "react";
import "./PasswordReset.css";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to server");
    }
    setEmail("");
  };

  return (
    <div className="form-container password-reset-container">
      <form onSubmit={handleSubmit} aria-label="Password reset form">
        <h1>Reset Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
        />
        <button type="submit" aria-label="Send password reset link">
          Send Reset Link
        </button>
        {message && <p role="alert">{message}</p>}
      </form>
    </div>
  );
}

export default PasswordReset;
