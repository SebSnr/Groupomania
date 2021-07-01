const db = require("../models")
const Article = db.articles
const Op = db.Sequelize.Op

// Create a new Article
exports.create = (req, res) => {
	// Validate request
	// if (!req.body.articleBody) {
	// 	res.status(400).send({
	// 		message: "Content can not be empty!",
	// 	})
	// 	return
	// }

	// Create a Tutorial
	const article = {
		text: req.body.article.text,
		author: req.body.article.author, 
		pictureUrl: req.body.article.pictureUrl,
		youtubeUrl: req.body.article.youtubeUrl 
	}

	// Save Tutorial in the database
	Article.create(article)
		.then((data) => {
			res.send(data) 
		})
		.catch((err) => {
			err.status(500).send({
				message: err.message || "Some error occurred while creating article.",
			})
		})
}

// Get all articles
exports.findAll = (req, res) => {
	Article.findAll()
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tutorials.",
			})
		})
}

// Get one article
exports.findOne = (req, res) => {
	
}
