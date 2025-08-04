import React, { useEffect, useRef } from 'react';
import TechStackDetails from './techstackdetails';
import './portfolio.css';

import {
  java, python, api, css, git, github, html, kafka,
  micro, mysql, postgresql, postman, reactjs, springboot
} from "../assets";

const Portfolio = () => {
  const allSkills = [
    { name: 'Java', icon: java },
    { name: 'Python', icon: python },
    { name: 'HTML', icon: html },
    { name: 'ReactJS', icon: reactjs },
    { name: 'Spring Boot', icon: springboot },
    { name: 'REST APIs', icon: api },
    { name: 'CSS', icon: css },
    { name: 'MySQL', icon: mysql },
    { name: 'PostgreSQL', icon: postgresql },
    { name: 'Git', icon: git },
    { name: 'GitHub', icon: github },
    { name: 'Kafka', icon: kafka },
    { name: 'Microservices', icon: micro },
    { name: 'Postman', icon: postman },
  ];

  const gridRef = useRef(null);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const techItems = entry.target.querySelectorAll('.tech-item');
          if (entry.isIntersecting) {
            techItems.forEach((item, index) => {
              // First, remove the initial-hidden class
              item.classList.remove('initial-hidden');
              
              // Then add the animation class
              if (window.innerWidth > 768) {
                if (index % 5 < 3) {
                  item.classList.add('animate-left');
                } else {
                  item.classList.add('animate-right');
                }
              } else {
                item.classList.add('animate-left');
              }
            });
          } else {
            // When the grid leaves the viewport, remove all animation classes
            // and add the initial-hidden class to reset
            techItems.forEach((item) => {
              item.classList.remove('animate-left', 'animate-right');
              item.classList.add('initial-hidden');
            });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    // Start observing the grid element
    observer.observe(gridElement);

    // Add initial 'initial-hidden' class to all items before observing
    gridElement.querySelectorAll('.tech-item').forEach(item => {
        item.classList.add('initial-hidden');
    });

    return () => {
      observer.unobserve(gridElement);
    };
  }, []);

  return (
    <section id="skills">
      <h2 className="section-title">My Technical Skills</h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Explore my proficiency across various programming languages, web technologies, databases, and development tools.
      </p>
      <div
        className="portfolio-glass-card p-8 rounded-lg shadow-xl"
        ref={gridRef}
      >
        <TechStackDetails categoryData={{ skills: allSkills }} />
      </div>
    </section>
  );
};

export default Portfolio;