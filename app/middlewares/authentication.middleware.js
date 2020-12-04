const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
	const token = req.get('token');

	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({ ok: false, error: 'Token is invalid' });
		}

		req.user = decoded.user;
		next();
	});
};

let verifyAdminRole = (req, res, next) => {
	const user = req.user;

	if (user.role !== 'ADMIN_ROLE') {
		return res.status(401).json({ ok: false, error: 'User is not admin' });
	}

	next();
};

module.exports = { verifyToken, verifyAdminRole };
