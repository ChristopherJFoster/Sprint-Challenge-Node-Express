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
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        error: 'There is no project with that ID.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was an error retrieving the project information.'
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
      error: 'There was an error while removing the project from the database.'
    });
  }
});

router.get('/:id/actions', async (req, res) => {
  try {
    const projectActions = await projectModel.getProjectActions(req.params.id);
    if (projectActions.length > 0) {
      res.status(200).json(projectActions);
    } else {
      // Since we aren't supposed to edit the helpers (I assume), I think this is a good compromise for not knowing whether there is no project with the submitted ID, or whether project has no actions:
      res.status(404).json({
        projectActions: projectActions,
        message:
          'Either there is no project with that ID, or the project has no actions.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error retrieving the project's actions."
    });
  }
});

module.exports = router;
