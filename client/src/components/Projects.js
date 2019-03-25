import React from 'react';

import Project from './Project';

const Projects = ({ projects }) => {
  return (
    <div className='projects'>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => {
          return (
            <Project
              key={project.id}
              name={project.name}
              description={project.description}
              completed={project.completed}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Projects;
