const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

let login = (req, res) => {
	const body = req.body;

	User.findOne({ email: body.email })
		.then((user) => {
			if (!user) {
				return res
					.status(500)
					.json({ ok: false, error: 'User or password incorrect' });
			}

			if (!bcrypt.compareSync(body.password, user.password)) {
				return res
					.status(401)
					.json({ ok: false, error: 'User or password incorrect' });
			}

			// Token generation
			let token = jwt.sign({ user }, process.env.SEED, {
				expiresIn: process.env.TOKEN_EXPIRATION,
			});

			res.json({ ok: true, user, token });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

module.exports = { login };
