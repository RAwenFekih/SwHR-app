import React, { useState } from "react";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    nationality: "",
    sex: "",
    role: "",
    passHash: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");


  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.passHash) newErrors.passHash = "Password is required.";
    else if (formData.passHash.length < 6)
      newErrors.passHash = "Password must be at least 6 characters.";
    setErrors(newErrors);
    
    if (!formData.age.trim()) newErrors.age = "Age is required.";
    else if (formData.age.trim().length > 3)
      newErrors.age = "Age must be lower.";
    setErrors(newErrors);

    if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required.";
    setErrors(newErrors);

    if (!formData.sex) newErrors.sex = "sex is required.";
    setErrors(newErrors);

    if (!formData.role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setServerError("");

    if (validate()) {
      try {
        const response = await fetch("http://localhost:8081/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to add employee");
        }

        setSuccessMessage(
          `Employee "${formData.name}" added. Email: ${formData.email}`
        );
        setFormData({
          name: "",
          email: "",
          age: "",
          nationality: "",
          sex: "",
          role: "",
          passHash: "",
        });
        setErrors({});
      } catch (error) {
        setServerError(error.message);
      }
    }
  };

  return (
    <div className="add-hr-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="age"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="nationality"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Enter nationality"
          />
          {errors.nationality && <span className="error">{errors.nationality}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="sex">Sex</label>
          <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="-">-</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          {errors.sex && <span className="error">{errors.sex}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="-">-</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="passHash">Password</label>
          <input
            type="passHash"
            id="passHash"
            name="passHash"
            value={formData.passHash}
            onChange={handleChange}
            placeholder="Set password"
          />
          {errors.passHash && <span className="error">{errors.passHash}</span>}
        </div>

        <button type="submit" className="btn-submit">
          Add Employee
        </button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default AddEmployee;
