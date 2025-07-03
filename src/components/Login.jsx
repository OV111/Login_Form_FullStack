// ➔ All fields should be validated
// ➔ Show error messages under the fields
// ➔ Disable button when all fields not filled
import React from "react";
import { useState } from "react";

export const Login = () => {
  const [showPasswd, setshowPasswd] = useState(false);
  // const [] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="headerText">
          <img
            src="src\assets\around-the-world.png"
            alt="icon image"
            width={50}
            height={50}
          />
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign-in</p>
        </div>

        <div className="headerBtn">
          <button>
            <img src="src/assets/google.png" alt="google logo" />
          </button>
          <button>
            <img src="src/assets/apple.png" alt="apple logo" />
          </button>
          <button>
            <img src="src/assets/facebook.png" alt="facebook logo" />
          </button>
        </div>

        <div className="separator">
          <div className="separator-line"></div>
          <span className="separator-text">or</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="email">Email address</label>
            <input type="email" placeholder="Enter your Email" />
          </div>
          <div className="password">
            <label htmlFor="">Password</label>
            <input
              type={showPasswd ? "text" : "password"}
              id="password"
              placeholder="Enter your Password"
              required
            />
            <button
              className="passwordBtn"
              type="button"
              onClick={() => {
                setshowPasswd(!showPasswd);
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
          </div>
          <div className="forgetPswd">
            <input type="checkbox" className="checkbox" />
            <p>Remember for 30 days</p>
            <a href="/">Forgot password?</a>
          </div>
          <div className="separator">
            <div className="separator-line"></div>
          </div>
          <div className="signinPart">
            <button
              type="submit"
              //    disabled={}
            >
              Sign in
            </button>
            <p>
              Don't have an account? <a href="">Create account</a>
            </p>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
