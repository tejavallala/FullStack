import React, { useState } from "react";
import axios from "axios";

function FirstPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);

      // Prepare form data
      const formData = new FormData();
      formData.append("data", JSON.stringify(parsedData));
      if (fileInput) formData.append("file", fileInput);

      // Make POST request
      const response = await axios.post(
        "https://two1bce7394.onrender.com/bfhl",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResponseData(response.data);
      setError("");
    } catch (error) {
      if (error.response) {
        setError(`Server Error: ${error.response.data.error}`);
      } else if (error.request) {
        setError("Network error: No response received from server");
      } else if (error instanceof SyntaxError) {
        setError("Invalid JSON format");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const formatResponse = () => {
    if (!responseData) return null;

    switch (selectedOption) {
      case "alphabets":
        return `"alphabets": ${JSON.stringify(responseData.alphabets || [])}`;
      case "numbers":
        return `"numbers": ${JSON.stringify(responseData.numbers || [])}`;
      case "highest_lowercase_alphabet":
        return `"highest_lowercase_alphabet": ${JSON.stringify(
          responseData.highest_lowercase_alphabet || []
        )}`;
      default:
        return `{
  "is_success": ${responseData.is_success},
  "user_id": "${responseData.user_id}",
  "email": "${responseData.email}",
  "roll_number": "${responseData.roll_number}",
  "numbers": ${JSON.stringify(responseData.numbers || [])},
  "alphabets": ${JSON.stringify(responseData.alphabets || [])},
  "highest_lowercase_alphabet": ${JSON.stringify(
    responseData.highest_lowercase_alphabet || []
  )},
  "file": {
    "is_file_valid": ${responseData.file?.is_file_valid || false},
    "mime_type": "${responseData.file?.mime_type || "N/A"}",
    "size_kb": "${responseData.file?.size_kb || "N/A"}"
  }
}`;
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", marginTop: "50px" }}>
      <div
        className="card"
        style={{
          padding: "20px",
          borderRadius: "0.5rem",
          boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
        }}
      >
        <h6 className="mb-3">API Input</h6>

        {/* JSON Input Field */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Enter JSON here"
            style={{ borderRadius: "0.25rem" }}
          />
        </div>

        {/* File Input Field */}
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            style={{ borderRadius: "0.25rem" }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Submit
        </button>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {/* Display API Response */}
        {responseData && (
          <div style={{ marginTop: "20px" }}>
            <h6 className="mb-2">Filter</h6>

            {/* Dropdown to Filter Response */}
            <select
              onChange={handleOptionChange}
              className="form-select"
              style={{ width: "100%" }}
              value={selectedOption}
            >
              <option value="">Show All</option>
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highest_lowercase_alphabet">
                Highest Lowercase Alphabet
              </option>
            </select>

            {/* Filtered Response */}
            <div style={{ marginTop: "20px" }}>
              <h6>Filtered Response</h6>
              <pre
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "5px",
                }}
              >
                {formatResponse()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FirstPage;
