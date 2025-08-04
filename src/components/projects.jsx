import React, { useMemo, useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './projects.css';

import {
  mydriveimg,
  foodimage,
  quizimg,
  ecomimg,
} from '../assets';

import { FaGithub } from 'react-icons/fa';

const INITIAL_PROJECT_COUNT = 3;

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(INITIAL_PROJECT_COUNT);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // Allows replay on scroll
    });

    const handleScroll = () => AOS.refresh();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectsData = useMemo(() => [
    {
      title: ' My Drive- Cloud Storage Microservices Application',
      image: mydriveimg,
      description: 'Built a scalable, microservices-based cloud storage solution using Java and Spring Boot, with JWT authentication and RESTful APIs for file management.',
      githubLink: 'https://github.com/Shashank7892/My-Drive---Cloud-Storage-Microservices-Application',
    },
    {
      title: 'My Food APP',
      image: foodimage,
      description: 'Developed a full-stack Food Ordering Platform with PostgreSQL, RESTful APIs, and Razorpay integration for secure transactions.',
      githubLink: 'https://github.com/Shashank7892/food_ordering_springboot',
    },
    {
      title: 'ProQuizz Platform (Microservices-driven)',
      image: quizimg,
      description: 'Developed ProQuizz, a scalable online quiz application, using a Spring Boot microservices architecture with RESTful APIs and Spring Cloud OpenFeign for seamless service communication.',
      githubLink: 'https://github.com/Shashank7892/proQuizz-Platform-Microservices-',
    },
    {
      title: 'Ecommerce Application',
      image: ecomimg,
      description: 'Developed a scalable e-commerce backend using Java and Spring Boot, ensuring high maintainability & Leveraged Spring Data JPA to effectively manage all database entities within a PostgreSQL database',
      githubLink: 'https://github.com/Shashank7892/Ecommerce-application_spring',
    },
  ], []);

  const handleShowMore = () => {
    setVisibleProjects(projectsData.length);
  };

  const handleShowLess = () => {
    setVisibleProjects(INITIAL_PROJECT_COUNT);
  };

  return (
    <section id="projects">
      <h2 className="section-title" data-aos="fade-up">PROJECTS</h2>

      <div className="projects-grid">
        {projectsData.slice(0, visibleProjects).map((project, index) => (
          <div key={index} className="project-card" data-aos="zoom-in" data-aos-delay={index * 100}>
            
            {/* === LAYER 1: Outer container for padding === */}
            <div className="project-image-outer">
              {/* === LAYER 2: Blue-glass container === */}
              <div className="project-image-wrap">
                {/* === LAYER 3: Actual image === */}
                <img src={project.image} alt={project.title} />
              </div>
            </div>

            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github-link"
                  >
                    <FaGithub className="github-icon" /> Have A Look
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="show-more-less-container" data-aos="fade-up">
        {visibleProjects < projectsData.length && (
          <button onClick={handleShowMore} className="show-more-button">
            Show More
          </button>
        )}
        {visibleProjects === projectsData.length && projectsData.length > INITIAL_PROJECT_COUNT && (
          <button onClick={handleShowLess} className="show-more-button">
            Show Less
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;