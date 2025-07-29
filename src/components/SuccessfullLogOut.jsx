import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
const SuccesFullLogOut = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);

  const handleClick = () => {
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
          {!state ? "Get Back to Sign Up" : <Spin>redirecting</Spin>}
        </button>
      </div>
    </React.Fragment>
  );
};
export default SuccesFullLogOut;