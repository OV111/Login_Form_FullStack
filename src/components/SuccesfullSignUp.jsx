import React from "react";

export const SuccesfullSignUp = () => {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="success-icon">
          <div className="checkmark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M20 6L9 17l-5-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="loading-ring"></div>
        </div>

        <div className="content">
          <h2>Account Created Successfully!</h2>
          <p>Redirecting you to login page...</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span className="countdown">Redirecting in 3 seconds</span>
        </div>
      </div>
    </div>
  );
};
