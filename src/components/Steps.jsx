import React from 'react'
import { Navbar } from "../components/Navbar";
import img1 from '../assets/images/step 1.jpeg'
import img2 from '../assets/images/step 2.jpeg'
import img3 from '../assets/images/step 3.jpeg'

export const Steps = () => {
    return (
        <section class="steps-section">
            <h2 class="section-title">Get Started In Just 3 Steps</h2>
            <div class="steps-container">
                {/* <!-- SVG for Curved Dotted Line --> */}
                <svg class="steps-svg" xmlns="http://www.w3.org/2000/svg">
                    <path class="dotted-line" d="M 230 70 Q 350 200, 490 150 T 730 180 T 970 230" />

                    {/* <!-- Circle Icons -->
                    <!-- <circle class="step-circle" cx="200" cy="60" r="12" />
                    <circle class="step-circle" cx="470" cy="50" r="12" />
                    <circle class="step-circle" cx="950" cy="50" r="12" /> --> */}
                </svg>

                {/* <!-- Step 01 --> */}
                <div class="step">
                    <div class="step-number">01</div>
                    <img src={img1} alt="Discover your needs" class="step-image"/>
                        <p class="step-description">Discover and Identify your needs </p>
                </div>

                {/* <!-- Step 02 --> */}
                <div class="step">
                    <div class="step-number">02</div>
                    <img src={img2} alt="Get Personalized Assistance" class="step-image"/>
                        <p class="step-description">Get Personalized Assistance</p>
                </div>

                {/* <!-- Step 03 --> */}
                <div class="step">
                    <div class="step-number">03</div>
                    <img src={img3} alt="Start Exploring our Services" class="step-image"/>
                        <p class="step-description">Start Exploring our Services</p>
                </div>
            </div>
        </section>
    )
}
