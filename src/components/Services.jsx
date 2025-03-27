// import React from 'react'
// import { Card } from './Card'
// import { Link } from 'react-router-dom'


// export const Services = () => {
//   return (
//       <div id="service" class="page-section">
//           <div class="container">
//               <p class="lead text-secondary text-center text-bold text-uppercase">Explore Services with us</p>
//               <h2 class="m-heading text-center mb-30 text-primary">
//                   Our Main Services
//               </h2>
//             <div class="items">
//                 <div class="item item-rounded mb-30">
//                     <Link to='/object_detection'>   
//                         <div class="text-center service">
//                             <i class="fa fa-eye fa-2x service-icon"></i>
//                             <div class="mt-10">
//                                 <h3>Object Detection</h3>
//                                 <p>Empowering the visually impaired with real-time object recognition and alerts.</p>
//                                 <a href="#" class="btn btn-block btn-primary">Learn More</a>
//                             </div>
//                         </div>
//                     </Link>
//                 </div>
                
//                 <div class="item item-rounded">
//                     <Link to='/text_to_speech'>
//                         <div class="text-center service">
//                             <i class="fa fa-microphone fa-2x service-icon"></i>
//                             <div class="mt-10">
//                                 <h3>Text to Speech</h3>
//                                 <p>Transform written content into natural-sounding speech for easy listening.</p>
//                                 <a href="#" class="btn btn-block btn-primary">Learn More</a>
//                             </div>
//                         </div>
//                     </Link>
//                 </div>
                
                
//                 <div class="item item-rounded">
//                     <Link to='/speech_to_text'>
//                       <div class="text-center service">
//                           <i class="fa fa-volume-up fa-2x service-icon"></i>
//                           <div class="mt-10">
//                               <h3>Speech to Text</h3>
//                               <p>Convert spoken words into written text seamlessly, enhancing communication.</p>
//                               <a href="#" class="btn btn-block btn-primary">Learn More</a>
//                           </div>
//                       </div>
//                     </Link>
//                 </div>
//             </div>
//           </div>
//           <div class="container">
//               <div class="items">
//                   <div class="item item-rounded">
//                       <Link to='/dyslexia_reader'>
//                       <div class="text-center service">
//                           <i class="fa fa-font fa-2x service-icon"></i>
//                           <div class="mt-10">
//                               <h3>Font Simplifier</h3>
//                               <p>Customize fonts for dyslexia, improving readability and comprehension.</p>
//                               <a href="#" class="btn btn-block btn-primary">Learn More</a>
//                           </div>
//                       </div>
//                       </Link>
//                   </div>

//                   <div class="item item-rounded">
//                       <Link to='/pdf_reader'>
//                       <div class="text-center service">
//                           <i class="fa fa-file-pdf-o fa-2x service-icon"></i>
//                           <div class="mt-10">
//                               <h3>PDF Reader</h3>
//                               <p>Accessible PDF reader with features tailored for specially-abled users.</p>
//                               <a href="#" class="btn btn-block btn-primary">Learn More</a>
//                           </div>
//                       </div>
//                   </Link>
//                   </div>

//                   <div class="item item-rounded">
//                       <Link to='/sign_detection'>
//                       <div class="text-center service">
//                           <i class="fa fa-hand-paper-o fa-2x service-icon"></i>
//                           <div class="mt-10">
//                               <h3>Finger Gesture Detection</h3>
//                               <p>Enabling communication for the speech-impaired through gesture recognition.</p>
//                               <a href="#" class="btn btn-block btn-primary">Learn More</a>
//                           </div>
//                       </div>
//                       </Link>
//                   </div>

//               </div>
//           </div>
//       </div>
//   )
// }
import React from 'react'
import { Card } from './Card'
import { Link } from 'react-router-dom'

export const Services = () => {
    return (
        <div id="service" className="page-section">
            <div className="container">
                <p className="lead text-secondary text-center text-bold text-uppercase">Explore Services with Us</p>
                <h2 className="m-heading text-center mb-30 text-primary">
                    Our Main Services
                </h2>
                <div className="items">
                    {/** Object Detection Service **/}
                    <div className="item item-rounded mb-30">
                        <Link to='/object_detection'>
                            <div className="text-center service">
                                <i className="fa fa-eye fa-2x service-icon"></i>
                                <div className="mt-10">
                                    <h3>Object Detection</h3>
                                    <p>Empowering the visually impaired with real-time object recognition and alerts.</p>
                                    {/* <a href="#" className="btn btn-block btn-primary">Learn More</a> */}
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/** Text to Speech Service **/}
                    <div className="item item-rounded">
                        <Link to='/text_to_speech'>
                            <div className="text-center service">
                                <i className="fa fa-microphone fa-2x service-icon"></i>
                                <div className="mt-10">
                                    <h3>Text to Speech</h3>
                                    <p>Transform written content into natural-sounding speech for easy listening.</p>
                                    {/* <a href="#" className="btn btn-block btn-primary">Learn More</a> */}
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/** Speech to Text Service **/}
                    <div className="item item-rounded">
                        <Link to='/speech_to_text'>
                            <div className="text-center service">
                                <i className="fa fa-volume-up fa-2x service-icon"></i>
                                <div className="mt-10">
                                    <h3>Speech to Text</h3>
                                    <p>Convert spoken words into written text seamlessly, enhancing communication.</p>
                                    {/* <a href="#" className="btn btn-block btn-primary">Learn More</a> */}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/** Second container for additional services **/}
            <div className="container">
                <div className="items">
                    {/** Font Simplifier Service **/}
                    <div className="item item-rounded">
                        <Link to='/dyslexia_reader'>
                            <div className="text-center service">
                                <i className="fa fa-font fa-2x service-icon"></i>
                                <div className="mt-10">
                                    <h3>Font Simplifier</h3>
                                    <p>Customize fonts for dyslexia, improving readability and comprehension.</p>
                                    {/* <a href="#" className="btn btn-block btn-primary">Learn More</a> */}
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/** PDF Reader Service **/}
                    <div className="item item-rounded">
                        <Link to='/pdf_reader'>
                            <div className="text-center service">
                                <i className="fa fa-file-pdf-o fa-2x service-icon"></i>
                                <div className="mt-10">
                                    <h3>PDF Reader</h3>
                                    <p>Accessible PDF reader with features tailored for specially-abled users.</p>
                                    {/* <a href="#" className="btn btn-block btn-primary">Learn More</a> */}
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Sign Language Detection Service */}
                    <div className="item item-rounded mb-30">
                        <Link to='/signOption'>
                            <div className="text-center service">
                                <i className="fa fa-hand-paper-o fa-2x service-icon"></i>
                                <div className="mt-10">
                                    <h3>Sign Language Detection</h3>
                                    <p>Empowering communication for individuals with speech impairments through real-time sign language recognition.</p>
                                    {/* <a href="#" className="btn btn-block btn-primary">Learn More</a> */}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
