const Customer = require('../models/customer.model');

let create = (req, res) => {
	const body = req.body;

	const customer = new Customer({
		firstname: body.firstname,
		lastname: body.lastname,
		address: body.address,
		age: body.age,
		copyrightby: body.copyrightby,
	});

	customer
		.save()
		.then((data) => {
			res.json({ ok: true, customer: data });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

let deleteById = (req, res) => {
	const id = req.params.id;

	Customer.findByIdAndRemove(id)
		.then((customerRemoved) => {
			if (!customerRemoved) {
				return res.status(404).json({
					ok: false,
					err: `The customer with ID ${id} doesn't exists`,
				});
			}

			res.json({
				ok: true,
				message: `Customer ID ${id} has been successfully removed`,
			});
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

let findall = (req, res) => {
	Customer.find()
		.then((customers) => {
			res.json({ total: customers.length, customers });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

let findbyid = (req, res) => {
	const id = req.params.id;
	Customer.findById(id)
		.then((customer) => {
			if (!customer) {
				return res.status(404).json({
					ok: false,
					err: `The customer with ID ${id} doesn't exists`,
				});
			}

			res.json({ customer });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

let update = (req, res) => {
	const id = req.params.id;
	const body = req.body;

	const params = {
		firstname: body.firstname,
		lastname: body.lastname,
		address: body.address,
		age: body.age,
		copyrightby: body.copyrightby,
	};

	Customer.findByIdAndUpdate(id, params, { new: true, runValidators: true })
		.then((customerUpdated) => {
			if (!customerUpdated) {
				return res.status(404).json({
					ok: false,
					err: `The customer with ID ${id} doesn't exists`,
				});
			}

			res.json({
				ok: true,
				customer: customerUpdated,
			});
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
};

module.exports = { create, findall, findbyid, deleteById, update };
