const User = require('../models/user.js')

class UserService {
  static async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      console.error('Error getting all users:', err);
      throw err; // re-throw the error to the calling function
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      console.error(`Error getting user with ID ${id}:`, err);
      throw err; // re-throw the error to the calling function
    }
  }

  static async updateUserById(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.update(userData);
        return user;
      }
      return null;
    } catch (err) {
      console.error(`Error updating user with ID ${id}:`, err);
      throw err; // re-throw the error to the calling function
    }
  }

  static async createUser(username, password, previous_health_report) {
    try {
      const user = new User({
        username,
        password,
        previous_health_report,
      });
    
      await user.save();
      console.log('User created');
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err; // re-throw the error to the calling function
    }
  }

  static async deleteUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        return true;
      }
      return false;
    } catch (err) {
      console.error(`Error deleting user with ID ${id}:`, err);
      throw err; // re-throw the error to the calling function
    }
  }

  static async getUserByUsername(username) {
    const user = await User.findOne({ username: username });
    return user;
  }
}

module.exports = UserService;