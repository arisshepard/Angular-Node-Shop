const express = require('express');
const app = express();

const customers = require('../controllers/customer.controller');

const {
	verifyToken,
	verifyAdminRole,
} = require('../middlewares/authentication.middleware');

// Create a new Customer
app.post('/api/customer/create', customers.create);

// Retrieve all Customer
app.get('/api/customer/retrieveinfos', customers.findall);

// Get customer by ID
app.get('/api/customer/:id', customers.findbyid);

// Update a Customer with Id
app.put('/api/customer/updatebyid/:id', customers.update);

// Delete a Customer with Id
app.delete('/api/customer/deletebyid/:id', customers.deleteById);

module.exports = app;
