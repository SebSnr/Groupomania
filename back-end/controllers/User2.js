const db = require("../models")
const User = db.User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")

// Get user id by token
const getTokenUserId = (req) => {
	const token = req.headers.authorization.split(" ")
	const decodedToken = jwt.verify(token[1], "monTokenSuperSecret1984")
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
	let photo = `${req.protocol}://${req.get("host")}/images/Unknow.jpg`
	if (req.file) {
		photo = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	}

	bcrypt.hash(req.body.password, 10, (err, hash) => {
		const user = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hash,
			photo: photo,
		}

		// console.log(req.body.firstName)

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
					photo: user.photo,
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
						photo: user.photo,
						isAuthenticated: true,
						isAdmin: user.isAdmin,
					})
				})
				.catch((error) => res.status(402).json({error}))
		})
		.catch((error) => res.status(500).json({error}))
}

exports.getOne = (req, res) => {}

exports.getAll = (req, res) => {}

exports.delete = (req, res) => {
	const decodedId = getTokenUserId(req)
	checkAdmin(decodedId)
	console.log(decodedId) //A SUPP

	User.findOne({where: {id: decodedId}})
		.then((user) => {
			console.log("User found") //A SUPP

			//check if good user id or admin
			if (user.id === decodedId || checkAdmin()) {
				const filename = user.photo.split("/images/")[1]
				console.log(filename)
				console.log(decodedId)
				console.log(user.id)
				// delete picture then delete article
				fs.unlink(`./uploads/${filename}`, () => {
					User.destroy({where: {id: decodedId}})
						.then(() => res.status(200).json("User Deleted"))
						.catch((error) => res.status(403).json({error}))
				})
			} else {
				res.status(403).json("Access authorization error")
			}

			console.log("User found but error authentication") // a supprimer
		})
		.catch((error) => res.status(403).json({error}))
}

exports.modify = (req, res) => {
	// get id or is admin
	const decodedId = getTokenUserId(req)
	checkAdmin(decodedId)
	console.log(decodedId) //A SUPP

	console.log(req.body.firstName)
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		
		console.log(req.body.firstName)
		
		User.findOne({where: {id: decodedId}})
			.then((user) => {
				let newUser = {...req.body}
				console.log(user.firstName )

				if (req.body.password) {
					newUser = {...newUser, password: hash}
				} 
				if (req.file) {
					// delete old picture
					// console.log(req.file.filename)
					const oldFilename = user.photo.split("/images/")[1]
					console.log(oldFilename)
					fs.unlink(`./uploads/${oldFilename}`, () => {})
					newUser = {...newUser, photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
				}
				// console.log(newUser)
				return newUser
			})
				.then((newUser) => {
					return User.update(
						{
							...newUser
						},
						{where: {id: decodedId}}
					)
					// console.log(`newwwUser après update : ${User.firstName}`)
				})
					.then(() => {
						return User.findOne({where: {id: decodedId}})
					})
						.then((user) => {
							console.log("User found") //A SUPP
							console.log(`le user dans la db : ${user.firstName}`) 
							res.status(200).json({
								user: user.id,
								token: jwt.sign({userId: user.id}, "monTokenSuperSecret1984", {expiresIn: "2h"}),
								firstName: user.firstName,
								lastName: user.lastName,
								photo: user.photo,
								isAuthenticated: true,
								isAdmin: user.isAdmin,
							})
						})
			.catch((error) => res.status(403).json({error}))

			













		// let newUser = {...req.body}
		// if (req.body.password) {
		// 	newUser = {...newUser, password: hash}
		// }
		// if (req.file) {
		// 	User.findOne({where: {id: decodedId}}).then((user) => {
		// 		// delete old picture
		// 		const oldFilename = user.photo.split("/images/")[1]
		// 		fs.unlink(`./uploads/${oldFilename}`)
		// 		newUser = {...newUser, photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
		// 	})
		// }

		// User.update(
		// 	{
		// 		...newUser,
		// 	},
		// 	{where: {id: decodedId}}
		// )
		// 	.then((valid) => {User.findOne({where: {id: decodedId}})})
		// 	.then((user) => {
		// 		console.log("User found") //A SUPP
		// 		res.status(200).json({
		// 			user: user.id,
		// 			token: jwt.sign({userId: user.id}, "monTokenSuperSecret1984", {expiresIn: "2h"}),
		// 			firstName: user.firstName,
		// 			lastName: user.lastName,
		// 			photo: user.photo,
		// 			isAuthenticated: true,
		// 			isAdmin: user.isAdmin,
		// 		})
		// 		//check if good user id or admin
		// 		console.log("User found but error authentication") // a supprimer
		// 	}) 
		// 	.catch((error) => res.status(403).json({error}))
	})
}
