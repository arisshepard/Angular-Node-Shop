require('colors');
require('./config/config');
require('./config/mongodb.config');

// EXPRESS
const express = require('express');
const app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.json({ extended: false }));
app.use(require('./routes/index.router'));

// MONGOOSE
const mongoose = require('mongoose');

mongoose
	.connect(process.env.URLDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log('Connected to MongoDB'.gray))
	.catch((err) => console.log('Could not connect to MongoDB: '.red, err));

app.listen(process.env.port, () => {
	console.log(`Server listening on port ${process.env.port}`.grey);
});
