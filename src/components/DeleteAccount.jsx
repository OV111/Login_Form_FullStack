import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export const DeleteAccount = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswd, setShowPasswd] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timerId = setTimeout(() => {
        navigate("/signUp");
      }, 2500);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [success, navigate]);

  const validEmailInput = useCallback((email) => {
    const trimmedEmail = email.trim().toLowerCase();
    const [username, domain] = trimmedEmail.split("@");
    if (
      !trimmedEmail.includes("@") ||
      trimmedEmail.split("@").length !== 2 ||
      trimmedEmail.includes(" ")
    ) {
      return false;
    }
    return !!(username && domain && domain.includes("."));
  }, []);
  const validPasswordInput = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    if (!validEmailInput(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    if (!validPasswordInput(password)) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const responseFromServer = await response.json();
      console.log(responseFromServer);
      if (!response.ok) {
        setServerMsg(responseFromServer.message || "Something went wrong!");
      } else {
        setServerMsg(responseFromServer.message);
        setSuccess(true);
      }
    } catch (err) {
      setServerMsg("Failed to connect to Server.");
      console.log(err.message);
    }
  };

  return (
    <React.Fragment>
      {!success ? (
        <div className="deleteAccContainer">
          <div className="header-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            </svg>
          </div>
          <h1 className="H1DeleteAcc">Delete Account</h1>
          <p className="card-description">
            This action cannot be undone. Please enter your credentials to
            confirm.
          </p>

          <div className="card-content">
            <div className="alert-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m21.73,18l-8,-14a2,2 0 0,0 -3.46,0l-8,14A2,2 0 0,0 4,21H20A2,2 0 0,0 21.73,18Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div className="alert-content">
              <strong>Warning:</strong> Deleting your account will permanently
              remove all your data and cannot be reversed.
            </div>
          </div>

          <div className="deleteAccInput">
            <div className="emailInput">
              <input
                type="email"
                id="password"
                placeholder="Enter your Email"
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  validEmailInput(value)
                    ? setEmailError("")
                    : setEmailError("Invalid Email");
                }}
                required
              />
              {emailError && <p className="errorText2">{emailError}</p>}
            </div>
            <div className="passwordInput">
              <input
                type={!showPasswd ? "password" : "text"}
                placeholder="Enter your Password"
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  validPasswordInput(value)
                    ? setPasswordError("")
                    : setPasswordError(
                        "Password must contain at least 6 character!"
                      );
            <button
              className="deleteAccpasswordBtn"
              type="button"
              onClick={() => {
                setShowPasswd(!showPasswd);
              }}
            >
              {showPasswd ? (
                <svg
                  className="eye-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  className="eye-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
                }}
                required
              />
              {passwordError && <p className="errorText2">{passwordError}</p>}
            </div>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" className="checkbox-input" />
            <label htmlFor="confirm" className="checkbox-label">
              I understand that this action cannot be undone
            </label>
          </div>

          <button
            className="confirmBtn"
            onClick={() => {
              handleSubmit();
            }}
          >
            {!success ? "Confirm" : <Spin>Redirecting</Spin>}
          </button>
          {serverMsg && <p className="serverMsg">{serverMsg}</p>}
        </div>
      ) : (
        <>
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
                <h2>{serverMsg}</h2>
                <p>Navigating to Sign Up</p>
              </div>

              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <span className="countdown">Redirecting in 3 seconds</span>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};
