import React, { useMemo, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './experience.css';

import {
  java, python, springboot, micro, api, reactjs,
  mysql, postgresql, postman, accenture, mediakind
} from '../assets';

const Experience = () => {
  // Moved skill and experience data to the top, before any hooks that use them.
  const skillsData = useMemo(() => [
    { name: 'Java', icon: java },
    { name: 'Python', icon: python },
    { name: 'SpringBoot', icon: springboot },
    { name: 'MicroServices', icon: micro },
    { name: 'Restapi', icon: api },
    { name: 'React', icon: reactjs },
    { name: 'MySql', icon: mysql },
    { name: 'PostgreSql', icon: postgresql },
    { name: 'Postman', icon: postman }
  ], []);

  const experienceData = useMemo(() => [
    {
      company: 'Accenture',
      logo: accenture,
      role: 'Associate Software Engineer',
      dates: 'Feb 2024 - Sept 2024',
      achievements: [
        'Drove end-to-end security assessments (web, API, and DAST) and vulnerability management.',
        'Leveraged Burp Suite, SQLMap, and Postman to identify and prioritize critical vulnerabilities, significantly enhancing system security.',
      ],
    },
    {
      company: 'MediaKind',
      logo: mediakind,
      role: 'Development Engineer Intern',
      dates: 'June 2023 - Dec 2023',
      achievements: [
        'Collaborated with cross-functional teams to identify and resolve complex software bugs, leading to significant improvements in product reliability.',
        'Utilized Java, C++, and JavaScript for in-depth analysis and solution implementation.',
      ],
    },
  ], []);

  const [popIndex, setPopIndex] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    const handleScroll = () => AOS.refresh();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for the pop-up animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPopIndex(prevIndex => (prevIndex + 1) % skillsData.length);
    }, 700); // Changed from 500 to 1000 for a 1-second interval

    return () => clearInterval(interval);
  }, [skillsData.length]);


  return (
    <section id="experience">
      <h2 className="section-title" data-aos="fade-up">EXPERIENCE</h2>

      <div className="experience-main-content">
        {/* Skills grid */}
        <div className="experience-skills-grid" data-aos="zoom-in" data-aos-delay="100">
          {skillsData.map((skill, index) => (
            <div key={skill.name} className="skill-icon-card">
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className={`skill-icon ${index === popIndex ? 'pop-up' : ''}`}
              />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Experience cards */}
        <div className="experience-cards-grid">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className={`experience-card ${['Accenture', 'MediaKind'].includes(exp.company) ? 'wave-effect' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="company-header">
                <img src={exp.logo} alt={`${exp.company} Logo`} className="company-logo" />
                <h3 className="role-company">{exp.role}, {exp.company}</h3>
              </div>
              <p className="dates">{exp.dates}</p>
              <ul className="achievements-list">
                {exp.achievements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;