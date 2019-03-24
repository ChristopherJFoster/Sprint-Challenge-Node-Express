import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Projects from './components/Projects';
import Actions from './components/Actions';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const projects = await axios.get(
          'https://web17-sprint-challenge-node-ex.herokuapp.com/api/projects'
        );
        if (projects) {
          setProjects(projects.data);
        } else {
          console.log('error');
        }
      } catch (err) {
        console.log(err);
      }
      try {
        const actions = await axios.get(
          'https://web17-sprint-challenge-node-ex.herokuapp.com/api/actions'
        );
        if (actions) {
          setActions(actions.data);
        } else {
          console.log('error');
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <Projects projects={projects} />
      <Actions actions={actions} />
    </div>
  );
};

export default App;
