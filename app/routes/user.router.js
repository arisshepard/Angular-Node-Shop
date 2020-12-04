const express = require('express');
const app = express();

const users = require('../controllers/user.controller');
const {
	verifyToken,
	verifyAdminRole,
} = require('../middlewares/authentication.middleware');

// Get all users
app.get('/api/users', verifyToken, users.findAll);

// Delete a user given by Id
app.delete(
	'/api/user/delete/:id',
	[verifyToken, verifyAdminRole],
	users.deleteById
);

// Create a new user
app.post('/api/user/create', users.create);

// Update an existing user by Id
app.put(
	'/api/user/updatebyid/:id',
	[verifyToken, verifyAdminRole],
	users.updateById
);

module.exports = app;
