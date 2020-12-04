const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
	firstname: { type: String, required: [true, '{PATH} is required!'] },
	lastname: { type: String, required: [true, '{PATH} is required!'] },
	address: { type: String, required: [true, '{PATH} is required!'] },
	age: {
		type: Number,
		min: 18,
		max: 65,
		required: true,
	},
	copyrightby: {
		type: String,
	},
});

module.exports = mongoose.model('Customer', CustomerSchema);
