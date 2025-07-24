// ➔ All fields should be validated
// ➔ Show error messages under the fields
// ➔ Disable button when all fields not filled
// ➔ Need to add Local Storage
// ➔ "Remember me" checkbox to choose storage type
// ➔ Connect to backend for login and signup
// ➔ On successful login, navigate to a protected page
// ➔ Auto-login if user already stored in storage
// ➔ Add Logout button to clear storage and redirect to login
// ➔ Add success and error toast/alerts for user feedback
// ➔ Show/hide password toggle (eye icon)
// ➔ Store passwords securely on backend (hashing later)
// ➔ Show loading spinner during network request
import React from "react";
import { useState } from "react";
// import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";

export const Login = () => {
  const [showPasswd, setshowPasswd] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [state, setState] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState("");

  const validateEmail = (email) => {
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
  };

  const validatePassword = (password) => {
    return password.trim().length >= 6;
  };
  const disableBtn = () => {
    return !email || !password || emailError !== "" || passwordError !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordValid = validatePassword(password);

    setEmailError(emailValid ? "" : "Invalid email address");
    setPasswordError(passwordValid ? "" : "Invalid password length");
    if (email && password) {
      // if(!rememberMe) {
      //   sessionStorage.setItem(email,password)
      //   console.log("Saved in Session Storage")
      // } else {
      //   localStorage.setItem(email,password)
      //   console.log("Saved in Local Storage")
      // }
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const resultFromServer = await response.json();
        if (
          resultFromServer.message === "Login Successful!" &&
          resultFromServer.status === 200
        ) {
          setLoginSuccessful(resultFromServer.message);
          setState(true);
          console.log(true);
        } else if (
          resultFromServer.message ===
            "Unauthorized | credentials are missing or Invalid." &&
          resultFromServer.status === 401
        ) {
          setState(false);
          setPasswordError('Email or password is incorrect.')
        }
      } catch (err) {
        console.log("vahe");
        console.log(err.message);
      }
    }
    // console.log(`Form Submitted: ${(email, password)}`);
  };

  return (
    <React.Fragment>
      {!state ? (
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
              <input
                type="email"
                placeholder="Enter your Email"
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  if (validateEmail(value)) {
                    setEmailError("");
                  } else {
                    setEmailError("Invalid Email address");
                  }
                }}
              />
              {emailError && <p className="errorText">{emailError}</p>}
            </div>
            <div className="password">
              <label htmlFor="">Password</label>
              <input
                type={showPasswd ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  if (validatePassword(value)) {
                    setPasswordError("");
                  } else if(value.length < 6){
                    setPasswordError("Password must be contain 6 character at least");
                  } 
                  // else {
                  //   setPasswordError('Email or password is incorrect.')
                  // }
                }}
                required
              />
              {passwordError && <p className="errorText">{passwordError}</p>}
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
              <input
                type="checkbox"
                className="checkbox"
                onClick={() => {
                  setRememberMe(true);
                }}
              />
              <p>Remember for 30 days</p>
              <a href="/">Forgot password?</a>
            </div>
            <div className="separator">
              <div className="separator-line"></div>
            </div>
            <div className="signinPart">
              <button
                className="signinBtn"
                type="submit"
                disabled={disableBtn()}
              >
                Sign in
              </button>
              <p>
                Don't have an account? <Link to="/signUp">Create account</Link>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="successPage">
          <h2>{loginSuccessful}</h2>
          <p>Welcome back</p>
        </div>
      )}
    </React.Fragment>
  );
};
