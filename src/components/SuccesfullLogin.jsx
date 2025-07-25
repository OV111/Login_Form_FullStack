import React from "react";
import { Link } from "react-router-dom";
export const SuccesFullLogin = ({ successMsg, fname, email }) => {
  return (
    <React.Fragment>
      <div className="card-header">
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <div className="checkmark2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M20 6L9 17l-5-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <h1 className="success-title">{successMsg}</h1>
        <p className="success-subtitle">
          Welcome back, you're all set to continue.
        </p>
        <div className="status-indicator">
          <div className="status-badge">
            <div className="pulse-dot"></div>
            <span className="status-text">Logged in securely</span>
          </div>
        </div>
        <div className="user-info">
          <div className="avatar">
            <img src="" alt="User" className="avatar-image" />
            <div className="avatar-fallback">{email}</div>
          </div>
          <div className="user-details">
            <h3 className="user-name">{fname}</h3>
            <p className="user-email">{email}</p>
          </div>
        </div>
        <div className="action-buttons">
          <Link to="/signUp">
            <button className="primary-button">Back to Sign Up</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
