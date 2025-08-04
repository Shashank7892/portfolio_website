import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './about.css';
import Shashank from "../assets/animated.png"

const TypewriterParagraph = ({ text, typingSpeed = 50, resetDelay = 2000 }) => {
  const [typedText, setTypedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (charIndex < text.length && !isResetting) {
      timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + text.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (charIndex === text.length && !isResetting) {
      timeoutId = setTimeout(() => {
        setIsResetting(true);
        setTypedText('');
        setCharIndex(0);
        setIsResetting(false);
      }, resetDelay);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isResetting, text, typingSpeed, resetDelay]);

  return <p className="typewriter-text">{typedText}</p>;
};

const About = () => {
  const aboutText = `Highly motivated and aspiring Software Engineer with hands-on experience in Java, Python, and Spring Boot. Passionate about building robust and scalable applications, and committed to continuous learning and professional growth within a dynamic team environment. Eager to apply my knowledge and skills in a challenging full-time position where I can contribute to team success while gaining valuable hands-on experience . . .`;

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleScroll = () => AOS.refresh();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="about-container">
      <h2 className="section-title" data-aos="fade-up">ABOUT ME</h2>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 md:px-8 lg:px-16">
        {/* Image */}
        <div className="flex justify-center" data-aos="fade-right">
          <img
            src={Shashank}
            alt="About Me"
            className="about-image"
          />
        </div>

        {/* Card */}
        <div className="text-center" data-aos="fade-left">
          <div className="space-y-6">
            <div className="about-card">
              <div className="wave-light" />
              <h3 className="about-card-title">Java Software Engineer</h3>
              <TypewriterParagraph text={aboutText} typingSpeed={50} resetDelay={2000} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;