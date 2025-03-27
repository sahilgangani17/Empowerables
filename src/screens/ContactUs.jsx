import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { db } from "../firebase"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import "./contact.css";

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loader, setLoader] = useState(false); // Loader state

    // Function to handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            // Use addDoc with the collection reference
            await addDoc(collection(db, "usercontact"), {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                timestamp: new Date(), // Add a timestamp field
            });

            setLoader(false);
            alert("Form submitted successfully");
            setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("There was an error submitting the form: " + error.message);
            setLoader(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <section className="contact-header">
                    <h1>Contact Us</h1>
                    <p>We are here to help. Reach out to us for any queries or support!</p>
                </section>

                <section className="contact-section">
                    <div className="contact-info">
                        <h2>Our Office</h2>
                        <p><i className="fas fa-map-marker-alt"></i> EmpowerAbles:Devolped by KJ somaiya student team</p>
                        <p><i className="fas fa-phone-alt"></i> Phone: +123-456-7890</p>
                        <p><i className="fas fa-envelope"></i> Email: contact@empowerables.com</p>
                        <p><i className="fas fa-clock"></i> Business Hours: Mon - Fri, 9:00 AM - 5:00 PM</p>
                    </div>

                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                            />
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows="5"
                                required
                            />
                            <button type="submit" style={{ background: loader ? "#ccc" : "rgb(2, 2, 110)" }}>
                                {loader ? "Submitting..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </section>

                <section className="map-section">
                    <h2>Find Us</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096476!2d144.95373631531654!3d-37.81627917975143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f4af3f%3A0x5045675218ce7e33!2zU291dGhiYW5rIFZJQyAzMDAwLCDgk43gkI3gkI4gTWFyY29sLCBBdXN0cmFsaWE!5e0!3m2!1sen!2sin!4v1632251446723!5m2!1sen!2sin"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </section>
            </div>
        </>
    );
};
