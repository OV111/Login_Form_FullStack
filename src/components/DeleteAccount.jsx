import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DeleteAccount = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

//   useEffect(() => {
//       const emailErro
//   },[error])

  useEffect(() => {
    const timerId = setTimeout(() => {
      // navigate("/signUp")
    }, 2500);
    return () => {
      clearTimeout(timerId);
    };
  }, [navigate]);

  const validEmailInput = (email) => {
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
  const validPasswordInput = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/deleteAccount",{
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(email,password)
    })

    const responseFromServer = await response.json()
    console.log(responseFromServer)
    //delete request
    // setSuccess(true)
  };

  return (
    <React.Fragment>
      {!success ? (
        <>
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              validEmailInput(value)
                ? setEmailError("")
                : setEmailError("Invalid Email");
            }}
            required
          />
          {emailError && <p className="errorText">{emailError}</p>}
          <input
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              validPasswordInput(value)
                ? setPasswordError("")
                : setPasswordError("Password must contain at least 6 character!");
            }}
            required
          />
          {passwordError && <p className="errorText">{passwordError}</p>}
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Confirm
          </button>
        </>
      ) : (
        <>
          <p>Succesfully Deleting Account</p>
          <p>Navigating to Sign Up</p>
        </>
      )}
    </React.Fragment>
  );
};
