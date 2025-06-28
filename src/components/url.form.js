// src/components/UrlForm.js
"use client"; // This component will run on the client-side

import { useState } from "react";

export default function UrlForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission and page reload
    setIsLoading(true);
    setError("");
    setShortenedUrl(""); // Clear previous shortened URL

    if (!originalUrl) {
      setError("Please enter a URL to shorten.");
      setIsLoading(false);
      return;
    }

    try {
      // Send a POST request to your Next.js API Route
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }), // Send the originalUrl in the request body
      });

      // Check if the response was successful (status code 2xx)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      // Parse the JSON response from your backend
      const data = await response.json();

      // Update the state with the received shortUrl
      setShortenedUrl(data.shortUrl);
      setOriginalUrl(""); // Clear the input field after successful shortening
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h1>URL Shortener</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label htmlFor="originalUrl" style={{ fontWeight: "bold" }}>
          Enter your long URL:
        </label>
        <input
          type="url" // Use type="url" for better browser validation
          id="originalUrl"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="e.g., https://very.long.website.com/path/to/page"
          required
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "1em",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "12px 20px",
            backgroundColor: isLoading ? "#a0d9b5" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "1.1em",
            transition: "background-color 0.3s ease",
          }}
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>Error: {error}</p>
      )}

      {shortenedUrl && (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            backgroundColor: "#e9f7ef",
            border: "1px solid #d4edda",
            borderRadius: "4px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "1.1em",
              fontWeight: "bold",
              color: "#28a745",
            }}
          >
            Your shortened URL:
          </p>
          <a
            href={shortenedUrl}
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice for target="_blank"
            style={{
              wordBreak: "break-all",
              color: "#007bff",
              textDecoration: "underline",
            }}
          >
            {shortenedUrl}
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(shortenedUrl)}
            style={{
              marginLeft: "10px",
              padding: "8px 12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
