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
	
	if (!req.body) return res.status(403).send("Erreur, la requête doit contenir des informations") // need content
	
	const decodedId = getTokenUserId(req) // get ID

	// if picture
	let pictureUrl = ""
	if (req.file) {
		pictureUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	}

	// Create article
	const article = {
		text: req.body.text,
		author: decodedId,
		youtube: req.body.youtube,
		picture: pictureUrl,
		UserId: decodedId,
	}

	// Save article in db
	Article.create(article)
		.then((data) => {
			res.send(data)
		})
		.catch((error) => res.status(500).send({error}))
}

// Get all articles
exports.getAll = (req, res) => {
	// find and send article, author informations
	Article.findAll({
		order: [["createdAt", "DESC"]],
		include: [{model: User, attributes: ["firstName", "lastName", "photo"]}],
	})
		.then((articles) => {
			res.status(200).send(articles)
		})
		.catch((error) => res.status(500).send({error}))
}

// Get one article
exports.getOne = (req, res) => {
	Article.findOne({
		where: {id: req.params.id},
		include: [{model: User, attributes: ["firstName", "lastName", "photo"]}],
	})
		.then((article) => {
			res.send(article)
		})
		.catch((error) => res.status(500).send({error}))
}

// Delete one article
exports.delete = (req, res) => {
	const decodedId = getTokenUserId(req) // get ID

	Article.findOne({where: {id: req.params.id}})
		.then((article) => {
			//check if user is the author of the article or is admin
			if (article.UserId === decodedId || checkAdmin(decodedId)) {
				const filename = article.picture.split("/images/")[1]  // delete picture then delete article
				fs.unlink(`./uploads/${filename}`, () => {
					Article.destroy({where: {id: req.params.id}})
						.then(() => res.status(200).send("Article supprimé"))
						.catch((error) => res.status(403).send({error}))
				})
			} else {
				res.status(403).send("Erreur d'authenfication")
			}
		})
		.catch((error) => res.status(500).send({error}))

}