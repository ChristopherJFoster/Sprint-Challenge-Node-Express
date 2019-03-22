const router = require('express').Router();

const projectModel = require('../helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const projects = await projectModel.get();
    res.status(200).json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The projects information could not be retrieved.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await projectModel.get(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({
      error:
        'There is no project with that ID, or the project information could not be retrieved.'
    });
  }
});

router.post('/', async (req, res) => {
  if (req.body.name && req.body.description) {
    try {
      const addedProject = await projectModel.insert(req.body);
      res.status(201).json(addedProject);
    } catch (err) {
      res.status(500).json({
        error: 'There was an error while saving the project to the database.'
      });
    }
  } else {
    res.status(400).json({
      error: 'Please provide both a name and description for the project.'
    });
  }
});

router.put('/:id', async (req, res) => {
  if (!req.params.id || !req.body.changes) {
    res.status(400).json({
      error:
        'Please provide the ID of the project you intend to update as well as your intended changes.'
    });
  } else {
    try {
      const updatedProject = await projectModel.update(
        req.params.id,
        req.body.changes
      );
      if (updatedProject) {
        res
          .status(200)
          .json({ message: 'You successfully updated the project.' });
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
      res
        .status(200)
        .json({
          message: `Number of projects deleted: ${numOfRemovedProjects}`
        });
    } else {
      res
        .status(404)
        .json({ error: 'The project with the specified ID does not exist.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        error:
          'There was an error while removing the project from the database.'
      });
  }
});

module.exports = router;
