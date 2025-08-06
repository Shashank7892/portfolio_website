import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaUser, FaEnvelope, FaRegCommentDots, FaShareAlt, FaPaperPlane,
  FaLinkedin, FaGithub
} from "react-icons/fa";
import "./contactme.css";

const ContactMe = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    const handleScroll = () => AOS.refresh();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_gafsfxk",
        "template_uevb8a4",
        form.current,
        "lp8PjwKdppXjZkrpH"
      )
      .then(() => {
        setLoading(false);
        setSent(true);
        form.current.reset();
        setTimeout(() => setSent(false), 4000);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="section-over-background">
      <h2 className="section-title" data-aos="fade-up">Contact Me</h2>
      <p className="contact-subtext" data-aos="fade-up" data-aos-delay="100">
        Got a question? Send me a message, and I'll get back to you soon.
      </p>

      <div className="contact-glass-card" data-aos="zoom-in" data-aos-delay="200">
        <div className="contact-glass-header">
          <h2>Get in Touch</h2>
          <FaShareAlt className="icon-share" />
        </div>
        <p className="contact-subtitle">
          Have something to discuss? Send me a message and let's talk.
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form-glass">
          <div className="form-group" data-aos="fade-up" data-aos-delay="300">
            <FaUser className="input-icon" />
            <input type="text" name="from_name" placeholder="Your Name" required />
          </div>
          <div className="form-group" data-aos="fade-up" data-aos-delay="400">
            <FaEnvelope className="input-icon" />
            <input type="email" name="from_email" placeholder="Your Email" required />
          </div>
          <div className="form-group" data-aos="fade-up" data-aos-delay="500">
            <FaRegCommentDots className="input-icon" />
            <textarea name="message" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="send-button" data-aos="fade-up" data-aos-delay="600">
            <FaPaperPlane className="send-icon" />
            {loading ? "Sending..." : "Send Message"}
          </button>
          {sent && <p className="sent-success" data-aos="fade-up">✅ Message sent!</p>}
        </form>

        {/* Connect With Me Section */}
        <div className="connect-section">
          <h3 className="connect-heading" data-aos="fade-up" data-aos-delay="700">
            <span className="line-highlight" /> Connect With Me
          </h3>
          <div className="social-cards">
            <a
              href="https://www.linkedin.com/in/shashank-c-2027ba183"
              target="_blank"
              rel="noreferrer"
              className="social-card linkedin"
              data-aos="fade-right"
              data-aos-delay="800"
            >
              <FaLinkedin className="social-icon" />
              <div>
                <p className="social-title">Let's Connect</p>
                <p className="social-sub">@Shashank C</p>
              </div>
            </a>
            <a
              href="https://github.com/Shashank7892"
              target="_blank"
              rel="noreferrer"
              className="social-card github"
              data-aos="fade-left"
              data-aos-delay="900"
            >
              <FaGithub className="social-icon" />
              <div>
                <p className="social-title">GitHub</p>
                <p className="social-sub">@Shashank</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;