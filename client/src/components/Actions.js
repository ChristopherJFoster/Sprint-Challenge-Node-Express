import React from 'react';

import Action from './Action';

const Actions = ({ actions, projects }) => {
  return (
    <div className='actions'>
      <h1>Actions</h1>
      <ul>
        {actions.map(action => {
          return (
            <Action
              key={action.id}
              project={
                projects.filter(project => project.id === action.project_id)[0]
                  .name
              }
              description={action.description}
              notes={action.notes}
              completed={action.completed}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Actions;
