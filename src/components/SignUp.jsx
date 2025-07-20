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
import { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!fname.trim()) errors.fname = "First Name is Required";
    if (!lname.trim()) errors.lname = "Last Name is Required";
    if (!email.trim().toLowerCase().includes("@"))
      errors.email = "Email should be Valid";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    // console.log(true)
    console.log(formErrors);
  };

  console.log(fname, lname, email, password, repeatedPassword);
  return (
    <React.Fragment>
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

        {/* <div className="headerBtn">
          <button>
            <img src="src/assets/google.png" alt="google logo" />
          </button>
          <button>
            <img src="src/assets/apple.png" alt="apple logo" />
          </button>
          <button>
            <img src="src/assets/facebook.png" alt="facebook logo" />
          </button>
        </div> */}

        <div className="separator">
          <div className="separator-line"></div>
          {/* <span className="separator-text">or</span> */}
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
              />
              {formErrors.fname && (
                <p className="errorText">First Name is required</p>
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
              />
              {formErrors.lname && (
                <p className="errorText">Last Name is required</p>
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
            />
            {formErrors.email && (<p className="errorText">Email should be valid</p>)}
          </div>

          <div className="password">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              placeholder="Enter Your Passsord"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="confirmPassword">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your Password"
              onChange={(e) => {
                setRepeatedPassword(e.target.value);
              }}
            />
          </div>

          <div className="terms">
            <input type="checkbox" name="" />
            <p>
              I agree to the <span>Terms and Conditions</span>
            </p>
          </div>

          <div className="signUpPart">
            <button>Sign Up</button>
            <p>
              Already have an account? <Link to="/">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

// Need to add asap
