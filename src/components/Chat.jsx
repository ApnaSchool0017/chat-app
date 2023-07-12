import axios from "axios";
import React, { useState } from "react";
import { FaSun, FaMoon, FaArrowRight, FaRocketchat } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";

function Chat() {
  // states for query and response result
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");

  // state for dark and light mode
  const [mode, setMode] = useState("light");

  // state for spinner
  const [isLoading, setIsLoading] = useState(false);

  // query submit ftn
  const handleSubmit = async (e) => {
    e.preventDefault();

    // make loader true
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/chat", {
        prompt: query,
      });
      const responseData = response.data;
      // Update the results state with the response data
      setResults(responseData);
      setIsLoading(false);
    } catch (error) {
      // Handle error or display an error message
      console.log("API Error:", error);
      setResults("Network error.");
      setIsLoading(false);
    }

    // Clear the query input
    setQuery("");
  };

  // clear query input
  const handleClearResults = () => {
    setResults("");
  };

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  return (
    <div
      className={`flex flex-col h-[88vh] rounded-lg p-4 ${
        mode === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-4 px-8">
        <div className="flex items-center justify-center gap-1">
          <div className="p-2 bg-purple-500 rounded-lg">
            <FaRocketchat color="#fff" />
          </div>
          <div>
            <h1
              className={`${
                mode === "dark" ? "text-white" : "text-black"
              } font-bold text-2xl `}
            >
              Chatgpt 0.1
            </h1>
          </div>
        </div>

        <button
          onClick={toggleMode}
          className={`text-2xl text-white ${
            mode === "dark" ? "bg-gray-700" : "bg-gray-400"
          } rounded-full p-3 focus:outline-none`}
        >
          {mode === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto mb-4">
        {/* Query Results */}
        {results && (
          <div
            className={`flex flex-col items-start mt-2 ${
              mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <div
              className={`max-w-[75%] p-2 rounded-lg ${
                mode === "dark" ? "bg-gray-700" : "bg-blue-100"
              }`}
            >
              <p>{results}</p>
            </div>
          </div>
        )}

        {/* Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-2">
            <BeatLoader size={12} color="#a940f5" />
          </div>
        )}
      </div>

      {/* Query Input */}
      <div className="flex items-center mb-4 px-16">
        <div className="flex-grow flex shadow-lg  rounded-lg ">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query"
            className={`flex-grow bg-white border border-gray-300 px-4 py-4 rounded-l-lg focus:outline-none ${
              mode === "dark" ? "text-white" : "text-gray-900"
            } ${mode === "dark" ? "bg-gray-700" : ""}`}
          />
          <button
            onClick={handleSubmit}
            className={`${
              !query.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600"
            } text-white  rounded-r-lg ${
              mode === "dark" ? "bg-gray-700" : ""
            } px-6 py-3`}
            disabled={!query.trim()}
          >
            {isLoading ? (
              <BeatLoader size={8} color="#fff" />
            ) : (
              <FaArrowRight size={20} color="#fff" />
            )}
          </button>
        </div>
      </div>

      {/* Clear Results Button */}
      {results && (
        <button
          onClick={handleClearResults}
          className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg self-end ${
            mode === "dark" ? "bg-gray-700" : ""
          }`}
        >
          Clear Results
        </button>
      )}
    </div>
  );
}

export default Chat;
