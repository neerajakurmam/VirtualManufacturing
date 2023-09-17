import React, { useState } from "react";
import "./ForkListMovement.css"; // Import the CSS file
import ForkListMovement from "./ForkListMovement";

function NewProject() {
const [title, setTitle] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [unit, setUnit] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [textFile, setTextFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [dataLog, setDataLog] = useState("");
  const [stopPoints, setStopPoints] = useState("");
  const [errorMsg, setErrorMsg] = useState("");



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleTextFileChange = (e) => {
    const file = e.target.files[0];
    setTextFile(file);
  };


  const stopPoints1 = [
    { x: 1.581, y: -7.360, title: 'Stop 1', name: 'Point A' },
    { x: 1.499, y: -6.419, title: 'Stop 2', name: 'Point B' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("deviceId", deviceId);
    formData.append("unit", unit);
    formData.append("image", imageFile);
    formData.append("textFile", textFile);

    // Replace 'your-backend-url' with the actual backend API endpoint
    const response = await fetch("http://localhost:8004/api/vm/submitProject/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setDataLog(result.logJsonDataList); // Assuming the backend returns the image URL
      setImageUrl(result.imageUrl);
      setStopPoints(result.stopPoints);
      setErrorMsg(result.errorMsg);
      setUnit(result.unit);
      setDeviceId(result.deviceId);

    }
  };

  const handleUnitChange = (e) => {
    const newValue = e.target.value;

    // Use a regular expression to check if the input contains only numeric characters
    if (/^\d*$/.test(newValue) && newValue.length <= 3) {
      setUnit(newValue);
    }
  };

  const handleTitleChange = (e) => {
    const newValue = e.target.value;

    // Use a regular expression to check if the input contains only alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(newValue) && newValue.length <= 10) {
      setTitle(newValue);
    }
  };

  const handleDeviceIdChange = (e) => {
    const newValue = e.target.value;

    // Use a regular expression to check if the input contains only alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(newValue) && newValue.length <= 10) {
      setDeviceId(newValue);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
      <table>
      <thead>
              <tr>
                <th colSpan={2} align="left"><h2>Add Project</h2></th>
              </tr>
            </thead>
        <tbody>
        <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              </tr>
              <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              </tr>
       
          <tr>
            <td>
              <label htmlFor="title">Title:</label>
            </td>
            <td>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              maxLength={10}
              pattern="[a-zA-Z0-9]*"
            />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="deviceId">Device Id:</label>
            </td>
            <td>
              <input
                type="text"
                id="deviceId"
                value={deviceId}
                onChange={handleDeviceIdChange}
                required
                maxLength={10}
                pattern="[a-zA-Z0-9]*"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="image">Upload Image:</label>
            </td>
            <td>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="textFile">Upload Text File:</label>
            </td>
            <td>
              <input
                type="file"
                id="textFile"
                accept=".txt"
                onChange={handleTextFileChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="unit">Unit</label>
            </td>
            <td>
              <input
                type="text"
                id="unit"
                value={unit}
                onChange={handleUnitChange}
                required
                maxLength={3}
                pattern="\d*"
                placeholder="Enter numeric value (max 3 characters)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Submit</button>
      </form>
      {errorMsg && (
        
        <div className="error-message">
          {errorMsg}</div>
      )}
      {         
      dataLog && (
        <div className="img-container">
                <ForkListMovement path={dataLog} stopPoints={stopPoints} imageUrl={imageUrl} unit={unit} deviceId={deviceId}/>

        </div>
      )}
    </div>
  );
}

export default NewProject;
