import React from 'react';
import { Link } from 'react-router-dom';
import './SignOption.css';

export const SignOption = () => {
    return (
        <div id="sign-option-container">
            <h2 className="sign-option-heading">Sign Detection Feature</h2>
            <div className="sign-option-items">
                <Link to="/sign_language_detection" className="sign-option-item">
                    <div className="service-icon">🔤</div>
                    <h3 className="sign-option-card-title">Word Detection</h3>
                    <p className="sign-option-card-description">
                        Detect sign language words in real-time. Click here to start.
                    </p>
                </Link>
                <Link to="/sign_language_detection2" className="sign-option-item">
                    <div className="service-icon">🔠</div>
                    <h3 className="sign-option-card-title">Letter Detection</h3>
                    <p className="sign-option-card-description">
                        Detect sign language letters in real-time. Click here to start.
                    </p>
                </Link>
            </div>
        </div>
    );
};
