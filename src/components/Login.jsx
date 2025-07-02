import React from "react"
export const Login = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="headerText">
                    <img src="src\assets\around-the-world.png" alt="icon image" width={50} height={50} />
                    <h1>Welcome Back</h1>
                    <p>Please enter your details to sign-in</p>
                </div>
                <div className="headerBtn">
                    <button ><img src="src/assets/google.png" alt="google logo"  /></button>
                    <button ><img src="src/assets/apple.png" alt="apple logo"  /></button>
                    <button ><img src="src/assets/facebook.png" alt="facebook logo"  /></button>
                </div>


                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                    </div>
                </div>

            <div className="email">

            </div>
            <div className="password">
                
            </div>

        </React.Fragment>
    )
}