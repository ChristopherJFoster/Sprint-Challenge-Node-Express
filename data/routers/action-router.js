const router = require('express').Router();

const actionModel = require('../helpers/actionModel');
const projectModel = require('../helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const actions = await actionModel.get();
    res.status(200).json(actions);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The actions information could not be retrieved.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await actionModel.get(req.params.id);
    res.status(200).json(action);
  } catch (err) {
    res.status(404).json({
      error:
        'There is no action with that ID, or there was an error retrieving the action information.'
    });
  }
});

router.post('/:id', async (req, res) => {
  // First check if the project ID exists:
  try {
    project = await projectModel.get(req.params.id);
  } catch (err) {
    res.status(404).json({
      error:
        'There is no project with that ID, or there was an error checking the project ID.'
    });
  }
  // Then check if the action submission requirements are met:
  if (!req.body.description || !req.body.notes) {
    res.status(400).json({
      error: 'Please provide both a description and notes for the action.'
    });
  } else if (req.body.description.length > 128) {
    res.status(400).json({
      error:
        'Your action description is limited to 128 characters. Please use the notes field for additional information.'
    });
  }
  // Then submit the new action:
  try {
    const addedAction = await actionModel.insert({
      project_id: req.params.id,
      description: req.body.description,
      notes: req.body.notes
    });
    res.status(201).json(addedAction);
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while saving the action to the database.'
    });
  }
});

// router.put('/:id', async (req, res) => {
//   if (!req.params.id || !req.body.changes) {
//     res.status(400).json({
//       error:
//         'Please provide the ID of the action you intend to update as well as your intended changes.'
//     });
//   } else {
//     try {
//       const updatedaction = await actionModel.update(
//         req.params.id,
//         req.body.changes
//       );
//       if (updatedaction) {
//         res
//           .status(200)
//           .json({ message: 'You successfully updated the action.' });
//       } else {
//         res.status(404).json({
//           message: 'The action with the specified ID does not exist.'
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         error: 'There was an error while updating the action.'
//       });
//     }
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const numOfRemovedactions = await actionModel.remove(req.params.id);
//     if (numOfRemovedactions) {
//       res.status(200).json({
//         message: `Number of actions deleted: ${numOfRemovedactions}`
//       });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'The action with the specified ID does not exist.' });
//     }
//   } catch (err) {
//     res.status(500).json({
//       error: 'There was an error while removing the action from the database.'
//     });
//   }
// });

module.exports = router;
