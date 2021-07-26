const db = require("../models")
const Article = db.Article
const fs = require("fs")
const jwt = require("jsonwebtoken")

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

// Create a new Article
exports.create = (req, res) => {
	// Validate request
	if (!req) {
		res.status(403).send({
			message: "Content can not be empty!",
		})
		return
	}

	// Get user id from token
	const token = req.headers.authorization.split(" ")
	const decodedToken = jwt.verify(token[1], "monTokenSuperSecret1984")

	// if picture
	let pictureUrl = ""
	if (req.file) {
		pictureUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	}

	// Create a article
	const article = {
		text: req.body.text,
		author: decodedToken.userId,
		youtube: req.body.youtube,
		picture: pictureUrl,
		UserId: decodedToken.userId,
	}

	// console.log(article)

	// Save article in the database
	Article.create(article)
		.then((data) => {
			res.send(data)
		})
		.catch((error) => res.status(403).json({error}))
}

// Get all articles
exports.getAll = (req, res) => {
	Article.findAll({
		order: [["createdAt", "DESC"]],
		include: [{model: db.User, attributes: ["firstName", "lastName", "id", "photo"]}],
	})
		.then((articles) => {
			res.send(articles)
		})
		.catch((error) => res.status(403).json({error}))
}

// Get one article
exports.getOne = (req, res) => {
	console.log(req.params.id) // A SUPP
	Article.findOne({
		where: {id: req.params.id},
		include: [{model: db.User, attributes: ["firstName", "lastName", "id", "photo"]}],
	})
		.then((article) => {
			res.send(article)
		})
		.catch((error) => res.status(403).json({error}))
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
						.then(() => res.status(200).json("Article deleted"))
						.catch((error) => res.status(403).json({error}))
				})
			} else {
				res.status(403).json("Access authorization error")
			}

			console.log("post find but error authentication") // a supprimer
		})
		.catch((error) => res.status(403).json({error}))
}

// Modify one article
exports.modify = (req, res) => {
	let articleObjet = 0
	if (req.file) {
		Article.findOne({_id: req.params.id}).then((article) => {
			const fileName = sauce.imageUrl.split("/images/")[1]
			fs.unlinkSync(`images/${fileName}`)
		})
		articleObject = {
			...JSON.parse(rsq.body.article),
			picture: `${req.protocol}://${req.get("host")}/images/${req.file.fileName}`,
		}
	} else {
		articleObject = {...req.body}
	}

	Article.updateOne({id: req.params.id}, {...sauceObject, _id: req.params.id})
		.then(() => res.status(200).json({message: "article modifié"}))
		.catch((error) => res.status(403).json({error}))
}
