// import React, { useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'

// const LoginPopup = ({setShowLogin}) => {

//     const [currState,setCurrState] = useState("Sign Up");

//   return (
//     <div className='login-popup'>
//         <div className="login-popup-container">
//             <div className="login-popup-title">
//                 <h2>{currState}</h2> <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//             </div>
//             <div className="login-popup-inputs">
//                 {currState==="Sign Up"?<input type="text" placeholder='Your name' />:<></>}
//                 <input type="email" placeholder='Your email' />
//                 <input type="password" placeholder='Password' />
//             </div>
//             <button>{currState==="Login"?"Login":"Create account"}</button>
//             <div className="login-popup-condition">
//                 <input type="checkbox" name="" id="" />
//                 <p>By continuing, i agree to the terms of use & privacy policy.</p>
//             </div>
//             {currState==="Login"
//                 ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
//                 :<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
//             }
//         </div>
//     </div>
//   )
// }

// export default LoginPopup
import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        let url = currState === "Sign Up"
            ? "http://localhost:5000/api/auth/register"
            : "http://localhost:5000/api/auth/login";

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: currState === "Sign Up" ? name : undefined,
                email,
                password
            }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert(data.message);
            setShowLogin(false);
        } else {
            alert(data.message);
        }
    };

    return (
        <div className='login-popup'>
            <div className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> 
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input 
                            type="text" 
                            placeholder='Your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}

                    <input 
                        type="email" 
                        placeholder='Your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleSubmit}>
                    {currState === "Login" ? "Login" : "Create account"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login" ? (
                    <p>Create a new account? 
                        <span onClick={() => setCurrState("Sign Up")}> Click here</span>
                    </p>
                ) : (
                    <p>Already have an account? 
                        <span onClick={() => setCurrState("Login")}> Login here</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;
