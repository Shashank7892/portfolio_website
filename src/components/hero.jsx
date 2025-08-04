import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './hero.css';
import { HashLink } from 'react-router-hash-link';
import ShashankResume from '../assets/Shashank_C_resumee.pdf';
import Shashankimg from '../assets/shashank_image_2.JPG';

const Hero = () => {
  const professions = useMemo(() => [
    [
      { text: 'A ', bold: false },
      { text: 'Full Stack', bold: true },
      { text: ' Developer.', bold: false }
    ],
    [
      { text: 'A ', bold: false },
      { text: 'Java', bold: true },
      { text: ' Developer.', bold: false }
    ]
  ], []);

  const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);
  const [displayedSegments, setDisplayedSegments] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentSegmentCharIndex, setCurrentSegmentCharIndex] = useState(0);

  const TYPING_SPEED = 75;
  const DELETING_SPEED = 75;
  const PAUSE_AFTER_TYPING = 500;
  const PAUSE_AFTER_DELETING = 100;

  useEffect(() => {
    let timer;
    const currentProfessionSegments = professions[currentProfessionIndex];
    const targetSegment = currentProfessionSegments[currentSegmentIndex];
    const nonDeletablePrefixSegment = professions[currentProfessionIndex][0];
    const nonDeletablePrefixLength = nonDeletablePrefixSegment.text.length;

    if (!isDeleting) {
      if (currentSegmentCharIndex < targetSegment.text.length) {
        timer = setTimeout(() => {
          setDisplayedSegments((prev) => {
            const newSegments = [...prev];
            if (newSegments.length === 0 && currentSegmentIndex === 0 && currentSegmentCharIndex === 0) {
              newSegments.push({ text: targetSegment.text.substring(0, 1), bold: targetSegment.bold });
            } else if (newSegments.length <= currentSegmentIndex) {
              newSegments.push({ text: targetSegment.text.substring(0, currentSegmentCharIndex + 1), bold: targetSegment.bold });
            } else {
              newSegments[currentSegmentIndex] = {
                text: targetSegment.text.substring(0, currentSegmentCharIndex + 1),
                bold: targetSegment.bold,
              };
            }
            return newSegments;
          });
          setCurrentSegmentCharIndex((prev) => prev + 1);
        }, TYPING_SPEED);
      } else {
        if (currentSegmentIndex < currentProfessionSegments.length - 1) {
          timer = setTimeout(() => {
            setCurrentSegmentIndex((prev) => prev + 1);
            setCurrentSegmentCharIndex(0);
          }, TYPING_SPEED);
        } else {
          timer = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
        }
      }
    } else {
      const hasReachedPrefixBoundary = currentSegmentIndex === 0 && currentSegmentCharIndex <= nonDeletablePrefixLength;
      if (!hasReachedPrefixBoundary) {
        timer = setTimeout(() => {
          setDisplayedSegments((prev) => {
            const newSegments = [...prev];
            if (currentSegmentCharIndex === 0) {
              newSegments.pop();
            } else {
              newSegments[currentSegmentIndex] = {
                text: targetSegment.text.substring(0, currentSegmentCharIndex - 1),
                bold: targetSegment.bold,
              };
            }
            return newSegments;
          });

          if (currentSegmentCharIndex === 0) {
            setCurrentSegmentIndex((prev) => prev - 1);
            const prevSegment = currentProfessionSegments[currentSegmentIndex - 1];
            setCurrentSegmentCharIndex(prevSegment.text.length);
          } else {
            setCurrentSegmentCharIndex((prev) => prev - 1);
          }
        }, DELETING_SPEED);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentProfessionIndex((prevIndex) => (prevIndex + 1) % professions.length);
          setCurrentSegmentIndex(0);
          setCurrentSegmentCharIndex(nonDeletablePrefixLength);
          setDisplayedSegments([{ text: nonDeletablePrefixSegment.text, bold: nonDeletablePrefixSegment.bold }]);
        }, PAUSE_AFTER_DELETING);
      }
    }

    return () => clearTimeout(timer);
  }, [
    currentSegmentCharIndex,
    isDeleting,
    currentProfessionIndex,
    currentSegmentIndex,
    professions,
  ]);

  const renderProfessionText = () =>
    displayedSegments.map((segment, index) =>
      segment.bold ? <strong key={index}>{segment.text}</strong> : <span key={index}>{segment.text}</span>
    );

  return (
    <section id="home" className="text-white min-h-[calc(100vh-64px)] flex items-center justify-center py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Animated Text Section */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="bg-solid-grey-gradient bg-clip-text text-transparent font-bold text-xl">Crafted by Me, For You</p>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-white-gradient-solid bg-clip-text text-transparent">Hi, I'm </span>
            <span className="bg-dark-pink-gradient bg-clip-text text-transparent">Shashank C</span>
          </h1>
          <h2 className="text-3xl mb-6 bg-ocean-blue-gradient bg-clip-text text-transparent">
            {renderProfessionText()}
            <span className="animate-blink-cursor">|</span>
          </h2>
          <p className="text-lg leading-relaxed mb-8 hero-general-text">
            A passionate Full Stack Software Developer 🚀 having an experience of building Web applications with Java / SpringBoot / Reactjs / PostgreSql and some other cool libraries and frameworks...</p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8">
            <div className="glow-button-wrapper">
              <HashLink 
                        to="/#contact" 
                        smooth 
                        className="glow-button-inner"
                    >
                        Contact Me
                    </HashLink>
            </div>
            <div className="glow-button-wrapper">
              <a href={ShashankResume} download="Shashank_C_Resume.pdf" className="glow-button-inner">
                Download Resume
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-gray-400 text-sm mb-4">FIND ME IN</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="https://www.linkedin.com/in/shashank-c-2027ba183" target="_blank" rel="noopener noreferrer" className="text-3xl hero-general-text"><FaLinkedin /></a>
              <a href="https://github.com/Shashank7892" target="_blank" rel="noopener noreferrer" className="text-3xl hero-general-text"><FaGithub /></a>
            </div>
          </div>
        </motion.div>

        {/* Animated Image Section */}
        <motion.div
          className="flex justify-center items-center p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        >
        <div className="rotating-image-wrapper">
  <div className="rotating-arcs"></div>
  <img
    src={Shashankimg}
    alt="Shashank C"
    className="profile-image"
  />
</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;