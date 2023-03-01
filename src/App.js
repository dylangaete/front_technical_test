import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`${API_BASE_URL}/products?search=${searchTerm}`)
      .then((response) => {
        setResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        {Array.isArray(results) ? (
          results.map((result) => (
            <div key={result.id}>
              <p>{result.id}</p>
              <p>{result.branch}</p>
              <p>{result.description}</p>
              <p>{result.price}</p>
            </div>
          ))
        ) : (
          <div key={results.id}>
            <p>{results.id}</p>
            <p>{results.branch}</p>
            <p>{results.description}</p>
            <p>{results.price}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
