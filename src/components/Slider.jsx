import React from 'react';
import '../screens/AboutUs';
import logo from '../assets/images/slide1.jpg';

export const Slider = () => {
    return (
        <div id="showcase">
            <div class="container">
                <div class="showcase-content">
                    <h1 className='bg-light'>Empowerables</h1>
                    <div>
                        <p>EmpowerAbles is a organization committed to improving the lives of specially-abled individuals by leveraging innovative technology and thoughtful design. Our mission is to create accessible tools and platform.</p>
                        <a href="../screens/AboutUs"class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    );
};