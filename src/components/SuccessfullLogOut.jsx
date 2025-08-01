import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
export const SuccesFullLogOut = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);

  const handleClick = () => {
    localStorage.clear()
    setTimeout(() => {  
      navigate("/signUp");
    }, 1500);
    setState(true);
  };

  return (
    <React.Fragment>
      <div className="logout-success">
        <h2>Succesfull Log Out</h2>
        <button onClick={handleClick}>
          {!state ? "Get Back to Sign Up" : <Spin>Redirecting</Spin>}
        </button>
      </div>
    </React.Fragment>
  );
};