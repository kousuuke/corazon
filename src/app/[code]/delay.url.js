"use client";

import React, { useEffect, useState } from "react";

export default function DelayRedirectClient({ originalUrl, delaySeconds }) {
  const [countdown, setCountdown] = useState(delaySeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.location.href = originalUrl;
    }, delaySeconds * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [originalUrl, delaySeconds]);
  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1>Redirecting you in {countdown} seconds...</h1>
        <p>
          You are being redirected to:{" "}
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ wordBreak: "break-all" }}
          >
            {originalUrl}
          </a>
        </p>
        {countdown <= 0 && <p>Redirecting now...</p>}
        <p style={{ marginTop: "20px", fontSize: "0.9em", color: "#555" }}>
          If you are not redirected automatically, please click the link above.
        </p>
      </div>
    </div>
  );
}
