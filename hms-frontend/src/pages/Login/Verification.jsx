import React, { useState } from 'react';
import './Verification.css';
const Verification = () => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        // Add your verification logic here
        console.log('Verification code:', verificationCode);
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
                        <p>Code has been send to vuviethunghg2004@gmail.com</p>
                        <div className='input-field-vertify'>
                            <input
                                type="password"
                                id="verificationCode"
                                value={verificationCode}
                                onChange={handleVerificationCodeChange}
                                style={{ marginRight: '15px' }}
                            />
                            <button type="submit" style={{ padding: '5px 10px' }}>Verify</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Verification;    