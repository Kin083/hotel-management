import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

import './Login.css';
const Login = () => {
    const [isActive, setIsActive] = useState(false);

    // Hàm xử lý sự kiện khi nhấn nút Register
    const handleRegisterClick = () => {
        setIsActive(true);
    };

    // Hàm xử lý sự kiện khi nhấn nút Login
    const handleLoginClick = () => {
        setIsActive(false);
    };
    return (
        <div className="login-body-page">
            <div className={`login-container ${isActive ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <div className="col-12 social-login">
                            <i className="fa-brands fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div className="col-12 social-login">
                            <i className="fa-brands fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                        <span>or use your email password</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Login;
