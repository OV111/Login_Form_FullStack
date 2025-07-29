import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { SuccesFullLogOut } from "./components/SuccessfullLogOut";
import { DeleteAccount } from "./components/DeleteAccount";
export const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/logOut" element={<SuccesFullLogOut />}></Route>
          <Route path="/DeleteAccount" element={<DeleteAccount />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
export default App;
