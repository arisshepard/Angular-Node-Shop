const express = require('express');
const app = express();

const login = require('../controllers/login.controller');

app.post('/api/login', login.login);

module.exports = app;
