import React from "react"
import {useState,useEffect }from "react"
import {useNavigate} from "react-router-dom"
const SuccesFullLogOut = () => {
    const navigate = useNavigate()

    // useEffect(() => {
    //     var timerId = setTimeout(() => {
    //         navigate("/signUp")
    //     },3000)
    //     return () => {clearTimeout(timerId)}
    // },[navigate])


    const handleClick = () => {
        setTimeout(() => {
            navigate("/signUp")
        },3000)
    }
    return (
        <React.Fragment>
            <p>succesfull logout</p>
            {/* and put some loader in button text */}
            <button onClick={handleClick}>get Back to signup</button>
        </React.Fragment>
    )
}
export default SuccesFullLogOut