// import React from 'react';
// import logo from '../utils/logo.png';

// export const Footer = () => {
//   return (
//     <div id="pageFooter" className="py-20 bg-light">
//       <div className="container footer-container">
//         <div>
//           <img src={logo} alt="EmpowerAbles Logo" className="logo" />
//           <p>
//             EmpowerAbles is dedicated to enhancing accessibility and providing support to specially-abled individuals
//             through innovative technology and user-friendly design.
//           </p>
//         </div>
//         <div>
//           <h3>Email Newsletter</h3>
//           <p>
//             Stay updated with the latest features, updates, and news from EmpowerAbles. Subscribe to our newsletter!
//           </p>
//           <form>
//             <input type="email" placeholder="Enter Email" required />
//             <input type="submit" value="Subscribe" className="btn btn-secondary btn-block" />
//           </form>
//         </div>
//         <div>
//           <h3>Site Links</h3>
//           <ul className="list">
//             <li><a href="#">Home</a></li>
//             <li><a href="#">Services</a></li>
//             <li><a href="#">About Us</a></li>
//             <li><a href="#">Contact Us</a></li>
//           </ul>
//         </div>
//         <div>
//           <h3>Our Services</h3>
//           <ul className="list">
//             <li><a href="./object-detection.html">Object Detection</a></li>
//             <li><a href="./speech-to-text.html">Speech to Text</a></li>
//             <li><a href="./text-to-speech.html">Text to Speech</a></li>
//             <li><a href="./font-simplifier.html">Font Simplifier</a></li>
//             <li><a href="./pdf-reader.html">PDF Reader</a></li>
//             <li><a href="./gesture-detection.html">Gesture Detection</a></li>
//           </ul>
//         </div>
//         <div className="bg-light">
//           <h3>Connect with Us</h3>
//           <p>Join our community and stay connected through social media. Follow us for updates and announcements.</p>
//           <a href="#" className="btn btn-secondary">Follow Us</a>
//         </div>
//       </div>
//       <div className="footer-bottom bg-light">
//         <p>Copyright &copy; 2024 EmpowerAbles | All rights Reserved</p>
//       </div>
//     </div>
//   );
// };
import React from 'react';
import logo from '../utils/logo.png';

export const Footer = () => {
  return (
    <div id="pageFooter" className="py-20 bg-light">
      <div className="container footer-container">
        <div>
          <img src={logo} alt="EmpowerAbles Logo" className="logo" />
          <p>
            EmpowerAbles is dedicated to enhancing accessibility and providing support to specially-abled individuals
            through innovative technology and user-friendly design.
          </p>
        </div>
        <div>
          <h3>Email Newsletter</h3>
          <p>
            Stay updated with the latest features, updates, and news from EmpowerAbles. Subscribe to our newsletter!
          </p>
          <form>
            <input type="email" placeholder="Enter Email" required className='email'/>
            <input type="submit" value="Subscribe" className="btn btn-secondary btn-block" />
          </form>
        </div>
        <div>
          <h3>Site Links</h3>
          <ul className="list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="connect-section">
          <h3>Connect with Us</h3>
          <p>Join our community and stay connected through social media. Follow us for updates and announcements.</p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
          <a href="#" className="btn btn-secondary">Follow Us</a>
        </div>
      </div>
      <div className="footer-bottom bg-light">
        <p>Copyright &copy; 2024 EmpowerAbles | All rights Reserved</p>
      </div>
    </div>
  );
};
