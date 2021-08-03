const db = require("../models")
const Article = db.Article
const User = db.User
const Comment = db.Comment
const fs = require("fs")
const jwt = require("jsonwebtoken")

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

// Create a new comment
exports.create = (req, res) => {
	// Validate request
	if (!req) {
		res.status(403).send("Content can not be empty!")
		return
	}

	// get ID
	const decodedId = getTokenUserId(req)


	// Create a comment
	const comment = {
		text: req.body.text,
		UserId: decodedId,
		ArticleId: req.params.id
	}

	console.log(comment) 

	// Save comment in the database
	Comment.create(comment)
		.then(() => {
			res.send("Comment created") 
		})
		.catch((error) => res.status(403).send({error}))
}

// Get all comments
exports.getAll = (req, res) => {
	console.log(req.params.id)
	console.log(req.params.id) // A SUPP
	Comment.findAll({
		// attributes: {exclude: ['UserId']},
		where: {ArticleId: req.params.id},
		order: [["createdAt", "DESC"]],
		include: [{model: db.User, attributes: ["firstName", "lastName", "photo"]}],
	})
		.then((comment) => {
			res.send(comment)
		})
		.catch((error) => res.status(403).send({error}))

}

// Get one article
exports.getOne = (req, res) => {
	console.log(req.params.id) // A SUPP
	Article.findOne({
		attributes: {exclude: ['id']},
		where: {id: req.params.id},
		include: [{model: User, attributes: ["firstName", "lastName", "photo"]}],
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

// Modify one article //no working
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
		.catch((error) => res.status(403).send({error}))
}
