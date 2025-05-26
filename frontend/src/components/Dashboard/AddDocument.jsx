import React, { useState } from "react";
import "./AddDocument.css";

const AddDocument = () => {
  const [formData, setFormData] = useState({
    doc_id: "",
    user_id: "",
    doc_name: "",
    doc_type: "",
    file_path: "",
    upload_date: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.doc_id.trim()) newErrors.doc_id = "Document ID is required.";
    if (!formData.user_id.trim()) newErrors.user_id = "User ID is required.";
    if (!formData.doc_name.trim())
      newErrors.doc_name = "Document Name is required.";
    if (!formData.doc_type.trim())
      newErrors.doc_type = "Document Type is required.";
    if (!formData.file_path.trim())
      newErrors.file_path = "File Path is required.";
    if (!formData.upload_date.trim())
      newErrors.upload_date = "Upload Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (validate()) {
      setSuccessMessage(`Document "${formData.doc_name}" added successfully.`);
      setFormData({
        doc_id: "",
        user_id: "",
        doc_name: "",
        doc_type: "",
        file_path: "",
        upload_date: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="add-hr-container">
      <h2>Add Document</h2>
      <form onSubmit={handleSubmit} noValidate className="add-document-form">
        <div className="form-group">
          <label htmlFor="doc_id">Document ID:</label>
          <input
            type="text"
            id="doc_id"
            name="doc_id"
            value={formData.doc_id}
            onChange={handleChange}
            placeholder="Enter Document ID"
          />
          {errors.doc_id && <span className="error">{errors.doc_id}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="Enter User ID"
          />
          {errors.user_id && <span className="error">{errors.user_id}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="doc_name">Document Name:</label>
          <input
            type="text"
            id="doc_name"
            name="doc_name"
            value={formData.doc_name}
            onChange={handleChange}
            placeholder="Enter Document Name"
          />
          {errors.doc_name && <span className="error">{errors.doc_name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="doc_type">Document Type:</label>
          <input
            type="text"
            id="doc_type"
            name="doc_type"
            value={formData.doc_type}
            onChange={handleChange}
            placeholder="Enter Document Type"
          />
          {errors.doc_type && <span className="error">{errors.doc_type}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="file_path">File Path:</label>
          <input
            type="text"
            id="file_path"
            name="file_path"
            value={formData.file_path}
            onChange={handleChange}
            placeholder="Enter File Path"
          />
          {errors.file_path && (
            <span className="error">{errors.file_path}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="upload_date">Upload Date:</label>
          <input
            type="date"
            id="upload_date"
            name="upload_date"
            value={formData.upload_date}
            onChange={handleChange}
          />
          {errors.upload_date && (
            <span className="error">{errors.upload_date}</span>
          )}
        </div>
        <button type="submit" className="btn-submit">
          Add Document
        </button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default AddDocument;
