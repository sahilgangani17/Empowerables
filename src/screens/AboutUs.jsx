// // import React from 'react'
// // // import { Card } from './Card'
// // import { Link } from 'react-router-dom'
// // import { Navbar } from "../components/Navbar";
// // import img1 from '../assets/images/person3.webp'

// // export const AboutUs = () => {
// //     return (
// //         <>
// //         <Navbar/>
// //         <div class="container">
// //             <section class="about-section">
// //                 <h1>About EmpowerAbles</h1>
// //                 <p>EmpowerAbles is dedicated to providing innovative solutions to make the digital world more accessible for specially-abled individuals. With cutting-edge technologies like object detection, speech-to-text, and text-to-speech, we strive to empower users to explore and interact with the digital environment without barriers.</p>
// //             </section>

// //             <section class="team">
// //                 <div class="card">
// //                     <img src={img1} alt="Reviewer John Smith" />
// //                     <h3>John Smith</h3>
// //                     <p>"EmpowerAbles has made my digital experience more accessible and inclusive. I'm impressed by the technology they've integrated for people with special needs."</p>
// //                 </div>
// //                 <div class="card">
// //                     <img src={img1} alt="Reviewer Sarah Lee" />
// //                     <h3>Sarah Lee</h3>
// //                     <p>"Using EmpowerAbles has completely transformed how I interact with technology. The accessibility tools are incredibly intuitive and user-friendly!"</p>
// //                 </div>
// //                 <div class="card">
// //                     <img src={img1} alt="Reviewer Anna Lee" />
// //                     <h3>Anna Lee</h3>
// //                     <p>"The object detection feature has helped me navigate spaces with ease. Thank you for this amazing service!"</p>
// //                 </div>
// //             </section>

// //             <section class="stats-section">
// //                 <h2>Our Impact</h2>
// //                 <div class="stats">
// //                     <div class="stat-box">
// //                         <h3>500+</h3>
// //                         <p>Users Empowered</p>
// //                     </div>
// //                     <div class="stat-box">
// //                         <h3>100+</h3>
// //                         <p>Projects Completed</p>
// //                     </div>
// //                     <div class="stat-box">
// //                         <h3>50+</h3>
// //                         <p>Accessible Features</p>
// //                     </div>
// //                 </div>
// //             </section>
// //         </div>
// //         </>
// //     )
// // }
import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';
import { Navbar } from "../components/Navbar";
import img1 from '../assets/images/person3.webp';


export const AboutUs = () => {
    return (
        <div className="containerr">
            <div className="images">
                <img
                    alt="Volunteer holding a box of aid"
                    height="300"
                    src="https://storage.googleapis.com/a1aa/image/rY2ntHbSRP6pH9QHjhrLEhbAW8HbJqd2KXJyWPFj9d4WIz5E.jpg"
                    width="300"
                />
                <img
                    alt="Two children standing in front of a tent"
                    height="300"
                    src="https://storage.googleapis.com/a1aa/image/0iZotBpeZdV7Tyz6n1ckoNFWWdu2sHhgUspJCgrGyuavQmzJA.jpg"
                    width="300"
                />
                <img
                    alt="People serving food"
                    height="300"
                    src="https://storage.googleapis.com/a1aa/image/eDmZdChbtP3TH62qbetcMBU9x23AZxmXdfokhM8faeKgLk5cC.jpg"
                    width="300"
                />
                <img
                    alt="Child holding a piece of string"
                    height="300"
                    src="https://storage.googleapis.com/a1aa/image/ebRKpbwpUqRxdKWWdJq4zizGG8GJeos6NxQuZFGSiu6ahMnTA.jpg"
                    width="300"
                />
            </div>
            <div className="content">
                <h2>ABOUT US</h2>
                <h1>Helping People In Need Around The World</h1>
                <p>We help provide necessities to help people in need around the world.</p>
                <div className="icon-text">
                    <i className="fas fa-hand-holding-heart" style={{ color: '#FF8C00' }}></i>
                    <div className="text">
                        <h3>Donate</h3>
                        <p>Providing assistance in the form of money and clothing to help others.</p>
                    </div>
                </div>
                <div className="icon-text">
                    <i className="fas fa-hands-helping" style={{ color: '#FFD700' }}></i>
                    <div className="text">
                        <h3>Volunteer</h3>
                        <p>Providing assistance in the form of time, skills and knowledge to help others.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
