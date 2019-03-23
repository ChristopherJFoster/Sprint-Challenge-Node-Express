const router = require('express').Router();

const actionModel = require('../helpers/actionModel');
const projectModel = require('../helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const actions = await actionModel.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({
      error: `There was an error while retrieving the actions. ${err}`
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await actionModel.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({
        error: 'There is no action with the specified ID.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `There was an error while retrieving the action. ${err}`
    });
  }
});

router.post('/', async (req, res) => {
  const { project_id, description, notes } = req.body;
  try {
    project = await projectModel.get(project_id);
    if (!project) {
      res.status(404).json({
        error: 'There is no project with the specified ID.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `There was an error while checking the project ID. ${err}`
    });
  }
  if (!description || !notes) {
    res.status(400).json({
      error: 'Please provide both a description and notes for the action.'
    });
  } else if (req.body.description.length > 128) {
    res.status(400).json({
      error:
        'The action description field is limited to 128 characters. Please use the action notes field to add additional information.'
    });
  } else {
    try {
      const addedAction = await actionModel.insert(req.body);
      res.status(201).json(addedAction);
    } catch (err) {
      res.status(500).json({
        error: `There was an error while saving the action. ${err}`
      });
    }
  }
});

router.put('/:id', async (req, res) => {
  if (!req.params.id || !req.body.changes) {
    res.status(400).json({
      error:
        'Please provide the ID of the action you intend to update as well as your intended changes.'
    });
  } else if (req.body.changes.description) {
    if (req.body.changes.description.length > 128) {
      res.status(400).json({
        error:
          'Your action description is limited to 128 characters. Please use the notes field for additional information.'
      });
    }
  }
  try {
    const updatedAction = await actionModel.update(
      req.params.id,
      req.body.changes
    );
    if (updatedAction) {
      res.status(200).json({ message: 'You successfully updated the action.' });
    } else {
      res.status(404).json({
        message: 'The action with the specified ID does not exist.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while updating the action.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const numOfDeletedActions = await actionModel.remove(req.params.id);
    if (numOfDeletedActions) {
      res.status(200).json({
        message: `Number of actions deleted: ${numOfDeletedActions}`
      });
    } else {
      res.status(404).json({
        error: `There is no action with the specified ID. Number of actions deleted: ${numOfDeletedActions}.`
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `There was an error while deleting the action. ${err}`
    });
  }
});

module.exports = router;
