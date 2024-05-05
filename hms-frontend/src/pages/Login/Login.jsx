import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

import './Login.css';
import { BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';


const Login = () => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(); // cho phan PhoneNumber
    // Hàm xử lý sự kiện khi nhấn nút Register
    const handleRegisterClick = () => {
        setIsActive(true);
    };

    // Hàm xử lý sự kiện khi nhấn nút Login
    const handleLoginClick = () => {
        setIsActive(false);
    };
    return (
        <>
            <div className="login-body-page">
                <Link to="/"><BsXLg size={45} className="exit-icon" /></Link>
                <div className={`login-container ${isActive ? 'active' : ''}`} id="container">
                    <div className="form-container sign-up">
                        <form>
                            <h1>Create Account</h1>
                            <div className="col-12 social-login">
                                <i className="fa-brands fa-google-plus-g google"></i>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Name" />
                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email" />
                            <PhoneInput placeholder="Nhập số điện thoại" value={value}
                                onChange={setValue} className="PhoneInputInput"
                            />
                            <input type="password" placeholder="Password" />
                            <Link to="/main"><button type="submit">Sign Up</button></Link>
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form>
                            <h1>Sign In</h1>
                            <div className="col-12 social-login">
                                <i className="fa-brands fa-google-plus-g google"></i>
                            </div>
                            <span>or use your email password</span>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forget Your Password?</a>
                            <Link to="/main"><button type="submit">Sign In</button></Link>
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
        </>
    );
}



export default Login;
