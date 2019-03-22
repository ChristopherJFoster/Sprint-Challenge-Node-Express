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

//   projectModel
//     .update(req.body.id, req.body.changes)
//     .then(user => {
//       if (user) {
//         res
//           .status(200)
//           .json({ message: 'You successfully updated the user.' });
//       } else {
//         res.status(404).json({
//           message: 'The user with the specified ID does not exist.'
//         });
//       }
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: 'The user information could not be updated.' });
//     });
// }

// router.delete('/:id', (req, res) => {
//   projectModel
//     .remove(req.params.id)
//     .then(numberOfUsers => {
//       if (numberOfUsers === 1) {
//         res
//           .status(200)
//           .json({ message: `Number of records deleted: ${numberOfUsers}` });
//       } else {
//         res
//           .status(404)
//           .json({ error: 'The user with the specified ID does not exist.' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'The user could not be removed' });
//     });
// });

module.exports = router;
