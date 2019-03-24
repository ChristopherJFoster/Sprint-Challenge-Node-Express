import React from 'react';

const Project = ({ project_id, description, notes, completed }) => {
  return (
    <div className='action'>
      <h3>{project_id}</h3>
      <div className='description'>
        <h5>Description:</h5>
        <p>{description}</p>
      </div>
      <div className='notes'>
        <h5>Notes:</h5>
        <p>{notes}</p>
      </div>
      <h5>Notes:</h5>
      <p>{notes}</p>
      <div className='completed'>
        <h5>Completed:</h5>
        <p>{completed.toString()}</p>
      </div>
    </div>
  );
};

export default Project;
