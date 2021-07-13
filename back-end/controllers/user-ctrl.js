const db = require("../models")
const User = db.User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		const user = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hash,
			// photo: req.body.photo, 
		}

		User.create(user)
			.then((valid) => {
				console.log(valid)
				if (!valid) {
					return res.status(401).json("Problème lors de la création de votre profil. veuillez réessayer plus tard")
				}
				
				res.status(200).json({
						user: user.id,
						token: jwt.sign({userId: user.id}, "monTokenSuperSecret1984", {expiresIn: "2h"}),
						firstName: user.firstName,
						lastName: user.lastName,
						picture: "",
						isAuthenticated: true,
				})
			})
			.catch(() => res.status(403).json("Cet utilisateur existe déjà."))
	})
}

exports.login = (req, res) => {
	User.findOne({where: {email: req.body.email}})
		.then((user) => {
			console.log(req.body.email) 
			if (!user) {
				return res.status(401).json("Désolé, cet utilisateur n'a pas été trouvé. ")
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json("Mot de passe incorrect")
					}
					res.status(200).json({
						user: user.id,
						token: jwt.sign({userId: user.id}, "monTokenSuperSecret1984", {expiresIn: "2h"}),
						firstName: user.firstName,
						lastName: user.lastName,
						picture: "",
						isAuthenticated: true,
						isAdmin: user.isAdmin
					})
				})
				.catch((error) => res.status(402).json({error}))
		})
		.catch((error) => res.status(500).json({error}))
}

exports.getOne = (req, res) => {}

exports.getAll = (req, res) => {}

exports.delete = (req, res) => {}

exports.modify = (req, res) => {}
