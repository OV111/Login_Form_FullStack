import React from "react"
import { Login } from "./components/Login";
import {SignUp} from "./components/SignUp"
export const App = () => {
  return (
    <React.Fragment>
      <Login />
      <SignUp />
    </React.Fragment>
  )
}
export default App