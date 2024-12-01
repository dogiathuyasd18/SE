'use strict';
const Customer = require('../models/User');
const bcrypt = require('bcrypt');

class AccessService {
  static signUp = async ({ name, email, password, tier }) => {
    try {
      // Check if user exists
      const existingUser = await Customer.findOne({ where: { email } });
      if (existingUser) {
        return {
          code: '20002',
          message: 'User already exists',
          status: 'error',
        };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await Customer.create({
        name,
        email,
        password: passwordHash,
        tier, // Include 'tier' if necessary
      });

      // Return success response
      return {
        code: '20001',
        message: 'User created successfully',
        status: 'success',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          tier: newUser.tier,
        },
      };
    } catch (err) {
      // Handle errors appropriately
      return {
        code: '50001',
        message: err.message,
        status: 'error',
      };
    }
  };
}

module.exports = AccessService;
