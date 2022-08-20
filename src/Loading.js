import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "absolute",
        top: "45%",
        left: "45%",
      }}
    >
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}
