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
	if (!req) {
		res.status(403).send({message: "Content can not be empty"})
		return
	}
	if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
		res.status(403).send({message: "All fields (except photo) are required"})
		return
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
			.then((userDB) => {
				if (!userDB) {
					return res.status(500).send("Problème lors de la création de votre profil. veuillez réessayer plus tard")
				}
				res.status(200).send("account created")
			})
			.catch(() => res.status(403).send("Cet utilisateur existe déjà."))
	})
}

exports.login = (req, res) => {
	User.findOne({where: {email: req.body.email}})
		.then((user) => {
			if (!user) return res.status(401).send("Désolé, cet utilisateur n'a pas été trouvé. ")
			
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					console.log(valid)
					if (!valid) return res.status(403).send("Mot de passe incorrect")


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
		.catch(() => res.status(401).send("Utilisateur non trouvé"))
}

exports.getAll = (req, res) => {
	User.findAll({
		order: [["firstName", "ASC"]],
	})
		.then((users) => {
			console.log(users[2].firstName)
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

exports.deleteOneUser = (req, res) => {
	// get id
	const decodedId = getTokenUserId(req)
	
	// find user to delete with email
	User.findOne({where: {email: req.params.email}})
		.then((user) => {
			console.log("User found") //A SUPP
			//check if good user id or is admin
			if (checkAdmin(decodedId)) {
				const filename = user.photo.split("/images/")[1]
				if (!filename === "Unknow.jpg") {
					fs.unlink(`./uploads/${filename}`, () => {})
				}
				console.log(decodedId) //A SUPP
				console.log(user.id) //A SUPP
				User.destroy({where: {id: user.id}})
					.then(() => res.status(200).send("User Deleted"))
					.catch((error) => res.status(403).send({error}))
			} else {
				res.status(403).send("Access authorization error")
			}
			console.log("User found but error authentication") // a supprimer
		})
		.catch((error) => res.status(403).send({error}))
}

exports.delete = (req, res) => {
	// get id
	const decodedId = getTokenUserId(req)
	
	// find user to delete with email
	User.findOne({where: {id: decodedId}})
		.then((user) => {
			console.log("User found") //A SUPP
			//check if good user id or is admin
			if (user.id === decodedId && !checkAdmin(decodedId)) {
				const filename = user.photo.split("/images/")[1]
				if (!filename === "Unknow.jpg") {
					fs.unlink(`./uploads/${filename}`, () => {})
				}
				console.log(decodedId) //A SUPP
				console.log(user.id) //A SUPP
				User.destroy({where: {id: user.id}})
					.then(() => res.status(200).send("User Deleted"))
					.catch((error) => res.status(403).send({error}))
			} else {
				res.status(403).send("Access authorization error")
			}
			console.log("User found but error authentication") // a supprimer
		})
		.catch((error) => res.status(403).send({error}))
}

exports.modify = (req, res) => {
	if (!req.file && !req.body.firstName && !req.body.lastName) {
		res.status(401).send("Content can not be empty")
		return
	}

	// get ID or is admin
	const decodedId = getTokenUserId(req)
	checkAdmin(decodedId)
	console.log(decodedId) //A SUPP

	console.log(req.body.firstName) //A SUPP
	bcrypt.hash(req.body.password, 10, (err, hash) => {

		User.findOne({where: {id: decodedId}})
			.then((user) => {
				let newUser = {...req.body}
				console.log(user.firstName)

				if (req.body.password) {
					newUser = {...newUser, password: hash}
				}
				if (req.file) {
					// delete old picture
					const oldFilename = user.photo.split("/images/")[1]
					console.log(oldFilename) //ASUPP
					if (oldFilename !== "Unknow.jpg") { 
						fs.unlink(`./uploads/${oldFilename}`, () => {})
					}
					newUser = {...newUser, photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
					console.log(newUser)
				}
				return newUser
			})
			.then((newUser) => {
				return User.update(
					{
						...newUser,
					},
					{where: {id: decodedId}}
				)
				.catch(() => res.status(403).send("Impossible de modifier les informations dans le serveur"))
				// console.log(`newwwUser après update : ${User.firstName}`)
			})
			.then(() => {
				return User.findOne({where: {id: decodedId}})
			})
			.then((user) => {
				console.log("User found") //A SUPP
				console.log(`le user dans la db : ${user.firstName}`)
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
			.catch(() => res.status(500).send("utilisateur non trouvé"))
	})
}

exports.modifyPassword = (req, res) => {
	if (!req) return res.status(401).send("Content can not be empty")

	// get ID or is admin
	const decodedId = getTokenUserId(req)
	console.log(decodedId) //A SUPP

	console.log(req.body.password) //A SUPP

	console.log(req.body.newPassword) //A SUPP

	const passWord = req.body.password

	User.findOne({where: {id: decodedId}})
		.then((user) => {
			if (!user) return res.status(401).send("Désolé, cet utilisateur n'a pas été trouvé. ")
			console.log(user.firstName)
			
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) return res.status(403).send("Ancien mot de passe incorrect")
					if (req.body.newPassword !== req.body.newPasswordConfirm || req.body.newPassword === "" || req.body.newPasswordConfirm ===""  ) res.status(401).send("Les nouveau mots de passe sont différents")
					console.log(valid)

					bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
						User.update(
									{
										password: hash
									},
									{where: {id: decodedId}}
								)
								.then(() => {
									return res.status(200).send("Mot de passe modifié")
								})
								.catch(() => res.status(403).send("Impossible de modifier les informations dans le serveur"))
					})
				})
				.catch(() => res.status(401).send("Erreur lors du décryptage des mots de passe"))
		})
		.catch(() => res.status(500).send("Erreur de la base de données"))
	}
