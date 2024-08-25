import React, { useState } from "react";
import axios from "axios";

function FirstPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post(
        "https://two1bce7394.onrender.com/bfhl",
        parsedData
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

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
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
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            style={{ borderRadius: "0.25rem" }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Submit
        </button>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {responseData && (
          <div style={{ marginTop: "20px" }}>
            <h6 className="mb-2">Multi Filter</h6>
            <select
              multiple
              onChange={handleOptionChange}
              className="form-select"
              style={{ width: "100%", height: "100px" }}
            >
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highest_lowercase_alphabet">
                Highest Lowercase Alphabet
              </option>
            </select>

            <div style={{ marginTop: "20px" }}>
              <h6>Filtered Response</h6>
              {selectedOptions.includes("alphabets") && (
                <p>Alphabets: {responseData.alphabets.join(",")}</p>
              )}
              {selectedOptions.includes("numbers") && (
                <p>Numbers: {responseData.numbers.join(",")}</p>
              )}
              {selectedOptions.includes("highest_lowercase_alphabet") && (
                <p>
                  Highest Lowercase Alphabet:{" "}
                  {responseData.highest_lowercase_alphabet.join(",")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FirstPage;
