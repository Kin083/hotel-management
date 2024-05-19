import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

import './Login.css';
import { BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import userApi from "../../api/userApi";
import { useNavigate } from 'react-router-dom';

const Verification = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();
    const handleVerificationSubmit = async(e) => {
        // Add your verification logic here
        e.preventDefault();
        try{
            const response = await userApi.getValidCode({verificationCode});
            alert("Đăng ký tài khoản thành công!");
            navigate("/login");
        } catch (error) {
            alert("Mã xác nhận không chính xác");
            console.error("Đăng ký không thành công", error);
        }
    };

    return (
        <div>
            <div className="verify-body-page">
                <div className='verify-container'>
                    <header>
                        <i className="bx bxs-check-shield"></i>
                    </header>
                    <form onSubmit={handleVerificationSubmit}>
                        <h2>Enter OTP Code</h2>
                        <p>Check your email to get verification code</p>
                        <div className='input-field-vertify'>
                            <input
                                type="password"
                                id="verificationCode"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                style={{ marginRight: '15px' }}
                            />
                            <button type="submit" style={{ padding: '5px 10px' } }>Verify</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Verification;    