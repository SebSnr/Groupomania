const db = require("../models")
const User = db.User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")

// separate sensitive connect data
require("dotenv").config()
secretTokenKey = process.env.TOKEN_SECRET

// Get user id by token
const getTokenUserId = (req) => {
	const token = req.headers.authorization.split(" ")
	const decodedToken = jwt.verify(token[1], secretTokenKey)
	const decodedId = decodedToken.userId
	return decodedId
}

// security : check if user is admin
let admin = false
const checkAdmin = (decodedId) => {
	User.findOne({where: {id: decodedId}}).then((user) => (admin = user.isAdmin))
	return admin
}

exports.signup = (req, res) => {
	// Validate request
	if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.passwordConfirm) {
		return res.status(403).send("All fields (except photo) are required")
	}

	let photo = `${req.protocol}://${req.get("host")}/images/Unknow.jpg` //default profile picture
	if (req.file) {
		photo = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	}

	// crypt password
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		const user = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hash,
			photo: photo,
		}

		User.create(user)
			.then((valid) => {
				if (!valid) {
					return res.status(500).send("Problème lors de la création de votre profil. veuillez réessayer plus tard")
				}
				res.status(200).send("Compte créé")
			})
			.catch(() => res.status(403).send("Cet utilisateur existe déjà."))
	})
}

exports.login = (req, res) => {
	User.findOne({where: {email: req.body.email}})
		.then((user) => {
			if (!user) return res.status(403).send("Désolé, cet utilisateur n'a pas été trouvé. ")

			// user finded, compare passwords
			bcrypt.compare(req.body.password, user.password).then((valid) => {
				if (!valid) return res.status(403).send("Mot de passe incorrect")
				// send user data
				res.status(200).send({
					user: user.id,
					token: jwt.sign({userId: user.id}, secretTokenKey, {expiresIn: "2h"}),
					firstName: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase(),
					lastName: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase(),
					email: user.email.toLowerCase(),
					photo: user.photo,
					isAuthenticated: true,
					isAdmin: user.isAdmin,
				})
			})
		})
		.catch(() => res.status(500).send({error}))
}

exports.getAll = (req, res) => {
	User.findAll({
		order: [["firstName", "ASC"]],
	})
		.then((users) => {
			let result = []
			for (i in users) {
				let firstName = users[i].firstName
				let lastName = users[i].lastName
				let email = users[i].email
				let photo = users[i].photo
				result.push({firstName, lastName, email, photo})
			}
			res.status(200).json(result)
		})
		.catch((error) => res.status(500).send({error}))
}

// admin request only
exports.deleteOneUser = (req, res) => {
	const decodedId = getTokenUserId(req) // get id

	// find user to delete with email
	User.findOne({where: {email: req.params.email}})
		.then((user) => {
			//check if user is admin
			if (checkAdmin(decodedId)) {
				const filename = user.photo.split("/images/")[1] //delete picture if not by default
				if (!filename === "Unknow.jpg") {
					fs.unlink(`./uploads/${filename}`, () => {})
				}
				User.destroy({where: {id: user.id}})
					.then(() => res.status(200).send("Utilisateur supprimé"))
					.catch((error) => res.status(500).send({error}))
			} else {
				res.status(403).send("Erreur d'authentification")
			}
		})
		.catch((error) => res.status(500).send({error}))
}

exports.delete = (req, res) => {
	const decodedId = getTokenUserId(req) // get id

	// find user to delete
	User.findOne({where: {id: decodedId}})
		.then((user) => {
			//check if good user id, admin can't delete his own account
			if (user.id === decodedId && !checkAdmin(decodedId)) {
				const filename = user.photo.split("/images/")[1] //delete picture if not by default
				if (!filename === "Unknow.jpg") {
					fs.unlink(`./uploads/${filename}`, () => {})
				}
				User.destroy({where: {id: user.id}})
					.then(() => res.status(200).send("User Deleted"))
					.catch((error) => res.status(500).send({error}))
			} else {
				res.status(403).send("Erreur d'authentification")
			}
		})
		.catch((error) => res.status(500).send({error}))
}

exports.modify = (req, res) => {
	// need content
	if (!req.file && !req.body.firstName && !req.body.lastName) return res.status(403).send("Tous les champs sont obligatoires.")

	// get ID or is admin
	const decodedId = getTokenUserId(req)
	checkAdmin(decodedId)

	bcrypt.hash(req.body.password, 10, (err, hash) => {
		User.findOne({where: {id: decodedId}})
			.then((user) => {
				// set data to modify
				let newUser = {...req.body}
				if (req.file) {
					// delete old picture
					const oldFilename = user.photo.split("/images/")[1]
					if (oldFilename !== "Unknow.jpg") {
						fs.unlink(`./uploads/${oldFilename}`, () => {})
					}
					newUser = {...newUser, photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
				}
				return newUser
			})
			.then((newUser) => {
				return User.update(
					{
						...newUser,
					},
					{where: {id: decodedId}}
				).catch((error) => res.status(500).send({error}))
			})
			.then(() => {
				return User.findOne({where: {id: decodedId}})
			})
			.then((user) => {
				// if success, send new informations
				res.status(200).send({
					user: user.id,
					token: jwt.sign({userId: user.id}, secretTokenKey, {expiresIn: "2h"}),
					firstName: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase(),
					lastName: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase(),
					email: user.email.toLowerCase(),
					photo: user.photo,
					isAuthenticated: true,
					isAdmin: user.isAdmin,
				})
			})
			.catch((error) => res.status(500).send({error}))
	})
}

exports.modifyPassword = (req, res) => {
	// need content
	if (!req.body.oldPassword || !req.body.password || !req.body.passwordConfirm) return res.status(403).send("Tous les champs sont obligatoires.")
	
	const decodedId = getTokenUserId(req) // get ID or is admin

	User.findOne({where: {id: decodedId}})
		.then((user) => {
			if (!user) return res.status(403).send("Désolé, cet utilisateur n'a pas été trouvé. ")

			// confirm old password before update
			bcrypt
				.compare(req.body.oldPassword, user.password)
				.then((valid) => {
					if (!valid) return res.status(403).send("Ancien mot de passe incorrect")
					bcrypt.hash(req.body.passwordConfirm, 10, (err, hash) => {
						User.update(
							{
								password: hash,
							},
							{where: {id: decodedId}}
						)
							.then(() => {
								return res.status(200).send("Mot de passe modifié")
							})
							.catch(() => res.status(500).send("Impossible de modifier les informations dans le serveur"))
					})
				})
				.catch(() => res.status(500).send("Erreur lors du décryptage des mots de passe"))
		})
		.catch((error) => res.status(500).send(error))
}
