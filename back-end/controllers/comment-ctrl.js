const jwt = require("jsonwebtoken")

const db = require("../models")
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
	if (!req.body) return res.status(403).send("Erreur, la requête doit contenir des informations") // need content

	const decodedId = getTokenUserId(req) // get ID

	// Create comment
	const comment = {
		text: req.body.text,
		UserId: decodedId,
		ArticleId: req.params.id
	}

	Comment.create(comment)
		.then(() => {
			res.send("Comment created") 
		})
		.catch((error) => res.status(500).send({error}))
}

// Get all comments
exports.getAll = (req, res) => {
	// find article by id and with author informations
	Comment.findAll({
		where: {ArticleId: req.params.id},
		order: [["createdAt", "DESC"]],
		include: [{model: User, attributes: ["firstName", "lastName", "photo"]}],
	})
		.then((comment) => {
			res.status(200).send(comment)
		})
		.catch((error) => res.status(500).send({error}))

}

// Delete one comment
exports.delete = (req, res) => {
	const decodedId = getTokenUserId(req) // get ID

	Comment.findOne({where: {id: req.params.id}})
		.then((comment) => {
			//check if user is the author of the article or is admin
			if (comment.UserId === decodedId || checkAdmin(decodedId)) {
					Comment.destroy({where: {id: req.params.id}})
						.then(() => res.status(200).send("Commentaire supprimé"))
						.catch((error) => res.status(500).send({error}))
			} else {
				res.status(403).send("Erreur d'authentification")
			}
		})
		.catch((error) => res.status(500).send({error}))
}
