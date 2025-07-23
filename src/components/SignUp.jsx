// ➔ Validate all input fields (email, password, confirm password)
// ➔ Show clear error messages under each field
// ➔ Check if password and confirm password match
// ➔ Disable submit button until all fields are valid and filled
// ➔ On submit, send signup data to backend (POST /signup)
// ➔ Handle backend responses (success or user already exists error)
// ➔ Show loading state during request
// ➔ Optionally, after successful signup, redirect to login or auto-login
// ➔ Store any necessary tokens or user info (if backend returns tokens)
// ➔ Optionally, add "Show password" toggle for both password fields
// ➔ Consider password strength feedback (bonus)
// ➔ Clear form or errors on successful signup
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SuccesfullSignUp } from "./SuccesfullSignUp";

export const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [showPasswd, setshowPasswd] = useState(false);
  const [showPasswd2, setshowPasswd2] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const [touched, setTouched] = useState({
    fname: false,
    lname: false,
    email: false,
    password: false,
    repeatedPassword: false,
    checkbox: false,
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    const errors = validateForm();
    setFormErrors(errors);
    const noErrors = Object.keys(errors).length === 0;
    const allFieldsFilled = fname && lname && email && password && repeatedPassword && checkbox;
    setIsFormValid(noErrors && allFieldsFilled);
  }, [fname, lname, email, password, repeatedPassword, checkbox]);

  useEffect(() => {
    if (serverMessage === "Account Created Successfully!") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => {clearTimeout(timer);};
    }
  }, [serverMessage, navigate]);

  const validateForm = () => {
    const errors = {};
    const trimmedEmail = email.trim().toLowerCase();
    if (!fname.trim()) errors.fname = "First Name is Required";
    if (!lname.trim()) errors.lname = "Last Name is Required";
    if (!trimmedEmail) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmedEmail)) {
      errors.email = "Email should be valid";
    }
    if (!password) {
      errors.password = "Password is Required";
    } else if (password.length < 6) {
      errors.password = "Password must be contain 6 character at least";
    }
    if (!repeatedPassword) {
      errors.repeatedPassword = "Repeating Password is required";
    } else if (repeatedPassword !== password) {
      errors.repeatedPassword = "Passwords need to match!";
    }
    if (!checkbox) {
      errors.checkbox = "Agree with terms and conditions";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fname: true,
      lname: true,
      email: true,
      password: true,
      repeatedPassword: true,
      checkbox: true,
    });

    const errors = validateForm();
    setFormErrors(errors);

    // Sending data to Server
    if (Object.keys(errors).length !== 0) return;

    try {
      const response = await fetch("http://localhost:5000/signUp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      });
      const datafromServer = await response.json();
      if (datafromServer.message === "Account Created Successfully!" && response.status === 201) {
        setServerMessage(datafromServer.message);
      } else if (response.status === 409 && datafromServer.message === "User with that Email already Exist | Conflict") {
        setFormErrors((prev) => ({
          ...prev,
          email: "User with that Email already Exist | Conflict",
        }));
      }
      // setFname("")
    } catch (err) {
      console.log("Network or Server Error ", err.message);
    }
    // console.log(true);
  };

  return (
    <React.Fragment>
      {!serverMessage ? (
        <div className="container2">
          <div className="headerText">
            <img
              src="src\assets\around-the-world.png"
              alt="icon image"
              width={50}
              height={50}
            />
            <h1>Create Account</h1>
            <p>Please enter your details to sign-up</p>
          </div>

          <div className="separator">
            <div className="separator-line"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="names">
              <div className="firstName">
                <label htmlFor="First Name">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, fname: true }))
                  }
                />
                {touched.fname && formErrors.fname && (
                  <p className="errorText">{formErrors.fname}</p>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="Last Name">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, lname: true }))
                  }
                />
                {touched.lname && formErrors.lname && (
                  <p className="errorText">{formErrors.lname}</p>
                )}
              </div>
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              />
              {touched.email && formErrors.email && (
                <p className="errorText">{formErrors.email}</p>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Enter Password</label>
              <input
                type={showPasswd ? "text" : "password"}
                placeholder="Enter Your Passsord"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, password: true }))
                }
              />
              <button
                className="passwordBtn1"
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
              {touched.password && formErrors.password && (
                <p className="errorText">{formErrors.password}</p>
              )}
            </div>

            <div className="confirmPassword">
              <label htmlFor="password">Confirm Password</label>
              <input
                type={showPasswd2 ? "text" : "password"}
                placeholder="Confirm your Password"
                onChange={(e) => {
                  setRepeatedPassword(e.target.value);
                }}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, repeatedPassword: true }))
                }
              />
              <button
                className="passwordBtn2"
                type="button"
                onClick={() => {
                  setshowPasswd2(!showPasswd2);
                }}
              >
                {showPasswd2 ? (
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
                    id="eyeIcon2"
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
              {touched.repeatedPassword && formErrors.repeatedPassword && (
                <p className="errorText">{formErrors.repeatedPassword}</p>
              )}
            </div>

            <div className="terms">
              <input
                type="checkbox"
                name="checkbox"
                onChange={(e) => {
                  setCheckbox(e.target.checked);
                }}
              />
              {formErrors.checkbox && (
                <p className="errorText">{formErrors.checkbox}</p>
              )}
            </div>

            <div className="signUpPart">
              <button type="submit" disabled={!isFormValid}>
                Sign Up
              </button>
              <p>
                Already have an account? <Link to="/">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <React.Fragment>
          <SuccesfullSignUp serverMessage={serverMessage} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

// Need to add asap
