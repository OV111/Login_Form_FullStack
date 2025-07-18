import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
export const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
export default App;
