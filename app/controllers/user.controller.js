const bcrypt = require('bcrypt');
const User = require('../models/user.model');

let create = (req, res) => {
	const body = req.body;

	const user = new User({
		name: body.name,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role,
	});

	user
		.save()
		.then((data) => {
			res.json({ ok: true, user: data });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

let deleteById = (req, res) => {
	const id = req.params.id;

	User.findByIdAndRemove(id)
		.then((userRemoved) => {
			if (!userRemoved) {
				return res.status(404).json({
					ok: false,
					err: `The user with ID ${id} doesn't exists`,
				});
			}

			res.json({
				ok: true,
				message: `User ID ${id} has been successfully removed`,
			});
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

let findAll = (req, res) => {
	User.find()
		.then((users) => {
			res.json({ total: users.length, users });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

let updateById = (req, res) => {
	const id = req.params.id;

	const body = req.body;
	const params = {
		name: body.name,
		email: body.email,
		role: body.role,
	};

	User.findByIdAndUpdate(id, params, {
		new: true,
		runValidators: true,
		context: 'query',
	})
		.then((userUpdated) => {
			if (!userUpdated) {
				return res.status(404).json({
					ok: false,
					err: `The user with ID ${id} doesn't exists`,
				});
			}

			res.json({
				ok: true,
				user: userUpdated,
			});
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

module.exports = { create, deleteById, findAll, updateById };
