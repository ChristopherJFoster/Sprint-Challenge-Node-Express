import React from 'react';

const Project = ({ name, description, completed }) => {
  return (
    <div className='project'>
      <h3>{name}</h3>
      <div className='description'>
        <h5>Description:</h5>
        <p>{description}</p>
      </div>
      <div className='completed'>
        <h5>Completed:</h5>
        <p>{completed.toString()}</p>
      </div>
    </div>
  );
};

export default Project;
