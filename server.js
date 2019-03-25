const express = require('express');
const cors = require('cors');

const server = express();

const projectsRouter = require('./data/routers/project-router');
const actionsRouter = require('./data/routers/action-router');

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send('Server running...');
});

module.exports = server;
