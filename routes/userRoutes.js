const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const cors = require('cors');

const router = express.Router();
const UserService = require('../services/userService');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ki")
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




// Login route
router.post('/login',async (req, res) => {
  try {
    
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Find the user in the database by username
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    

    // Generate a JWT token with the user ID as the payload
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });

    // Return the token as response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    // Clear the user object from the request
    req.user = null;
    
    // Return success response
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
