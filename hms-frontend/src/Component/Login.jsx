import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

import './Login.css';
class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login" >Login </div>
                        <div className="col-12 form-group login-input">
                            <label>Username: </label>
                            <input type="text" className="form-control" placeholder="Enter your username" />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password: </label>
                            <input type="password" className="form-control" placeholder="Enter your password" />
                        </div>
                        <div className="col-12">
                            <button className="btn-login" >Login</button>
                        </div>

                        <div className="col-12">
                            <span >Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span >Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fa-brands fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}


export default Login;
