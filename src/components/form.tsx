"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Input } from "./input";
import { Button } from "./ui/button";
import { TextMorph } from "./effects/text-morph";
import Shortened from "./shortened";

interface ApiResponse {
  shortUrl: string;
  message?: string;
}

interface ApiError {
  message: string;
}

export default function UrlForm(): React.ReactElement {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortenedUrl("");

    if (!originalUrl) {
      setError("Please enter a URL to shorten.");
      setIsLoading(false);
      return;
    }

    try {
      // send POST
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }), // this will send the originalUrl in the request body
      });

      // this is where to check if the response was successful
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      // this will parse the JSON response from your backend
      const data: ApiResponse = await response.json();

      setShortenedUrl(data.shortUrl);
      setOriginalUrl(""); // will clear the input field after successful shortening
    } catch (err) {
      console.error("Error shortening URL:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setOriginalUrl(e.target.value);
  };

  return (
    <div className="md:w-md lg:w-lg sm:w-sm flex flex-col gap-y-4 justify-center items-center">
      <form onSubmit={handleSubmit} className="flex gap-4 lg:flex-row flex-col">
        <Input
          type="url"
          id="originalUrl"
          value={originalUrl}
          onChange={handleInputChange}
          required
          placeholder="e.g., https://crzn.com/long-website/path/to/page"
          className="lg:w-lg md:w-sm w-xs"
        />
        <Button
          size="lg"
          type="submit"
          disabled={isLoading}
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          <TextMorph>
            {isLoading ? "Generating..." : "Generate Short URL"}
          </TextMorph>
        </Button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>Error: {error}</p>
      )}

      {shortenedUrl && <Shortened shortenedUrl={shortenedUrl} />}
    </div>
  );
}
