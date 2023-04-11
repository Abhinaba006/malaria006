const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



router.post('/', async (req, res) => {
  try {
    const { username, password, previous_health_report } = req.body;
    const user = await UserService.createUser(username, password, previous_health_report);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

 router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password, previous_health_report } = req.body;
    const user = await UserService.updateUser(id, username, password, previous_health_report);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserService.deleteUser(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
