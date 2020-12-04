const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roles = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} is not a valid role',
};

const UserSchema = new mongoose.Schema({
	name: { type: String, required: [true, '{PATH} is required!'] },
	email: {
		type: String,
		unique: true,
		required: [true, '{PATH} is required!'],
	},
	password: { type: String, required: [true, '{PATH} is required!'] },
	role: { type: String, default: 'USER_ROLE', enum: roles },
});

UserSchema.methods.toJSON = function () {
	let user = this;

	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
};

UserSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' });

module.exports = mongoose.model('User', UserSchema);
