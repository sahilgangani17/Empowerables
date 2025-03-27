import React from 'react'
import video from '../assets/videos/4116381-uhd_3840_2160_25fps.mp4'
import './Navbar';
import { Navbar } from './Navbar';

export const Demo = () => {
    return (
        <>
        <Navbar/>
            <div id="demo" className="demo-section bg-light">
                <div className="page-section container">
                    <h2 className="m-heading text-center mb-30 text-primary">
                        Demo
                    </h2>
                    <div className="video-wrapper">
                        <video className="video-element" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </>
        );
    }
