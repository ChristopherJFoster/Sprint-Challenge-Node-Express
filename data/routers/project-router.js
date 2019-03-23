const router = require('express').Router();

const projectModel = require('../helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const projects = await projectModel.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while retrieving the projects information.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await projectModel.get(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        error: 'The project with the specified ID does not exist.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while retrieving the project information.'
    });
  }
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    try {
      const addedProject = await projectModel.insert(req.body);
      res.status(201).json(addedProject);
    } catch (err) {
      res.status(500).json({
        error: 'There was an error while saving the project.'
      });
    }
  } else {
    res.status(400).json({
      error: 'Please provide both a name and description for the project.'
    });
  }
});

router.put('/:id', async (req, res) => {
  const { name, description, completed } = req.body;
  if (!name && !description && !completed) {
    res.status(400).json({
      error: 'Please provide the project changes you intend to make.'
    });
  } else {
    try {
      const updatedProject = await projectModel.update(req.params.id, req.body);
      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        });
      }
    } catch (err) {
      res.status(500).json({
        error: 'There was an error while updating the project.'
      });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const numOfRemovedProjects = await projectModel.remove(req.params.id);
    if (numOfRemovedProjects) {
      res.status(200).json({
        message: `Number of projects deleted: ${numOfRemovedProjects}.`
      });
    } else {
      res.status(404).json({
        error: `The project with the specified ID does not exist. Number of projects deleted: ${numOfRemovedProjects}.`
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while deleting the project.'
    });
  }
});

router.get('/:id/actions', async (req, res) => {
  const project = await projectModel.get(req.params.id);
  if (project) {
    try {
      const projectActions = await projectModel.getProjectActions(
        req.params.id
      );
      res.status(200).json(projectActions);
    } catch (err) {
      res.status(500).json({
        error: "There was an error while retrieving the project's actions."
      });
    }
  } else {
    res.status(404).json({
      error: 'The project with the specified ID does not exist.'
    });
  }
});

module.exports = router;
