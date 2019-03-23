import React, { Component } from 'react';
// import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      actions: []
    };
  }

  // componentDidMount() {
  //   async function fetchProjects() {
  //     try {
  //       const projects = await axios.get('localhost:5000/api/projects');
  //       console.log(projects);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchProjects();
  // }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
