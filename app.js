import React, { useState } from "react";

export default function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format!");
      }
      setError("");

      const res = await fetch("https://your-backend-url.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();
      setResponse(result);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="container">
      <h1>Qualifier 1 - CU</h1>
      <textarea
        placeholder='Enter JSON: {"data":["A","1","C"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <>
          <select multiple onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <div>
            {selectedFilters.includes("numbers") && <p>Numbers: {response.numbers.join(", ")}</p>}
            {selectedFilters.includes("alphabets") && <p>Alphabets: {response.alphabets.join(", ")}</p>}
            {selectedFilters.includes("highest_alphabet") && <p>Highest Alphabet: {response.highest_alphabet.join(", ")}</p>}
          </div>
        </>
      )}
    </div>
  );
}
