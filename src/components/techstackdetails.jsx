import React from "react";

const TechStackDetails = ({ categoryData }) => {
  // Check if categoryData or skills array is available
  if (!categoryData || !categoryData.skills) {
    return <div className="text-center text-gray-500">No skills to display.</div>;
  }

  return (
    <div className="p-4">
      <div className="portfolio-grid">
        {categoryData.skills.map((skill, index) => (
          <div
            key={index}
            className="tech-item"
          >
            {skill.icon && <img src={skill.icon} alt={skill.name} />}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackDetails;