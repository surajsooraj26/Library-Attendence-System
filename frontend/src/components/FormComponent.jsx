// FormComponent.js
import React, { useState } from "react";
import axios from "axios";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    programme: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/dashboard/students",
        formData
      );
      console.log("Response from server:", response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>programme</label>
        <input
          type="text"
          name="programme"
          value={formData.programme}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
