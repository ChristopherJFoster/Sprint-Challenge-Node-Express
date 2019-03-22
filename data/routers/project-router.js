const router = require('express').Router();

const projectModel = require('../helpers/projectModel');

// router.get('/', (req, res) => {
//   projectModel
//     .get()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: 'The users information could not be retrieved.' });
//     });
// });

router.get('/', async (req, res) => {
  try {
    let projects = await projectModel.get();
    res.status(200).json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The projects information could not be retrieved.' });
  }
});

// router.get('/:id', (req, res) => {
//   projectModel
//     .getById(req.params.id)
//     .then(user => {
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res
//           .status(404)
//           .json({ error: 'The user with the specified ID does not exist.' });
//       }
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: 'The user information could not be retrieved.' });
//     });
// });

// router.post('/', (req, res) => {
//   if (req.body.name) {
//     projectModel
//       .insert(req.body)
//       .then(user => {
//         res.status(201).json(user);
//       })
//       .catch(err => {
//         res.status(500).json({
//           error:
//             'There was an error while saving the user to the database. Try submitting a different name.'
//         });
//       });
//   } else {
//     res.status(400).json({
//       error: 'Please provide a name for the user.'
//     });
//   }
// });

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

// router.put('/', (req, res) => {
//   if (!req.body.id || !req.body.changes) {
//     res.status(400).json({
//       error:
//         'Please provide the ID of the user you intend to update as well as your intended changes.'
//     });
//   } else {
//     projectModel
//       .update(req.body.id, req.body.changes)
//       .then(user => {
//         if (user) {
//           res
//             .status(200)
//             .json({ message: 'You successfully updated the user.' });
//         } else {
//           res.status(404).json({
//             message: 'The user with the specified ID does not exist.'
//           });
//         }
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: 'The user information could not be updated.' });
//       });
//   }
// });

module.exports = router;
