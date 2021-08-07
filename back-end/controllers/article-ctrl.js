const jwt = require("jsonwebtoken")
const fs = require("fs")

const db = require("../models")
const Article = db.Article
const User = db.User

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

// Create a new Article
exports.create = (req, res) => {
	// Validate request
	if (!req) {
		res.status(403).send("Content can not be empty!")
		return
	}

	// get ID
	const decodedId = getTokenUserId(req)

	// if picture
	let pictureUrl = ""
	if (req.file) {
		pictureUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	}

	// Create a article
	const article = {
		text: req.body.text,
		author: decodedId,
		youtube: req.body.youtube,
		picture: pictureUrl,
		UserId: decodedId,
	}

	// console.log(article)

	// Save article in the database
	Article.create(article)
		.then((data) => {
			res.send(data)
		})
		.catch((error) => res.status(400).send({error}))
}

// Get all articles
exports.getAll = (req, res) => {
	Article.findAll({
		order: [["createdAt", "DESC"]],
		include: [{model: db.User, attributes: ["firstName", "lastName", "photo"]}],
	})
		.then((articles) => {
			res.send(articles)
		})
		.catch((error) => res.status(403).send({error}))
}

// Get one article
exports.getOne = (req, res) => {
	console.log(req.params.id) // A SUPP
	Article.findOne({
		where: {id: req.params.id},
		include: [{model: db.User, attributes: ["firstName", "lastName", "photo"]}],
	})
		.then((article) => {
			res.send(article)
		})
		.catch((error) => res.status(403).send({error}))
}

// Delete one article
exports.delete = (req, res) => {
	// get ID
	const decodedId = getTokenUserId(req)

	Article.findOne({where: {id: req.params.id}})
		.then((article) => {
			console.log("Article found") //A SUPP

			//check if user is the author of the article or is admin
			if (article.UserId === decodedId || checkAdmin(decodedId)) {
				const filename = article.picture.split("/images/")[1] 
				// delete picture then delete article
				fs.unlink(`./uploads/${filename}`, () => {
					Article.destroy({where: {id: req.params.id}})
						.then(() => res.status(200).send("Article deleted"))
						.catch((error) => res.status(403).send({error}))
				})
			} else {
				res.status(403).send("Access authorization error")
			}

			console.log("post find but error authentication") // a supprimer
		})
		.catch((error) => res.status(403).send({error}))
}