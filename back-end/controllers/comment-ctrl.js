const jwt = require("jsonwebtoken")
const fs = require("fs")

const db = require("../models")
const Article = db.Article
const User = db.User
const Comment = db.Comment


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

	// Save comment in the database
	Comment.create(comment)
		.then(() => {
			res.send("Comment created") 
		})
		.catch((error) => res.status(403).send({error}))
}

// Get all comments
exports.getAll = (req, res) => {
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

// Delete one comment
exports.delete = (req, res) => {
	// get ID
	const decodedId = getTokenUserId(req)

	Comment.findOne({where: {id: req.params.id}})
		.then((comment) => {
			console.log("Comment found") //A SUPP

			//check if user is the author of the article or is admin
			if (comment.UserId === decodedId || checkAdmin(decodedId)) {
					Comment.destroy({where: {id: req.params.id}})
						.then(() => res.status(200).send("Comment deleted"))
						.catch((error) => res.status(403).send({error}))
			} else {
				res.status(403).send("Access authorization error")
			}

			console.log("comment find but error authentication") // a supprimer
		})
		.catch((error) => res.status(403).send({error}))
}
