const router = require('express').Router();

const projectModel = require('../helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const projects = await projectModel.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      error: `There was an error while retrieving the projects. ${err}`
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
        error: 'There is no project with the specified ID.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `There was an error while retrieving the project. ${err}`
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
        error: `There was an error while saving the project. ${err}`
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
          message: 'There is no project with the specified ID.'
        });
      }
    } catch (err) {
      res.status(500).json({
        error: `There was an error while updating the project. ${err}`
      });
    }
  }
});

router.delete('/:id', async (req, res) => {
  const project = await projectModel.get(req.params.id);
  if (project) {
    try {
      const projectActions = await projectModel.getProjectActions(
        req.params.id
      );
      if (projectActions) {
        return res.status(400).json({
          error:
            "You must delete all a project's actions before deleting the project."
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: `There was an error while checking the project's actions. ${err}`
      });
    }
    try {
      const numOfDeletedProjects = await projectModel.remove(req.params.id);
      if (numOfDeletedProjects) {
        res.status(200).json({
          message: `Number of projects deleted: ${numOfDeletedProjects}.`
        });
      }
    } catch (err) {
      res.status(500).json({
        error: `There was an error while deleting the project. ${err}`
      });
    }
  } else {
    res.status(404).json({
      error: 'There is no project with the specified ID.'
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
        error: `There was an error while retrieving the project's actions. ${err}`
      });
    }
  } else {
    res.status(404).json({
      error: 'There is no project with the specified ID.'
    });
  }
});

module.exports = router;
