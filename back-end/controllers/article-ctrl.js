const db = require("../models")
const Article = db.articles
// const Op = db.Sequelize.Op

// Create a new Article
exports.create = (req, res) => {
	// Validate request
	// if (!req.body.articleBody) {
	// 	res.status(403).send({
	// 		message: "Content can not be empty!",
	// 	})
	// 	return
	// }


	// Create a article
	const article = {
		text: req.body.text,
		author: req.body.author, 
		// pictureUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
		youtubeUrl: req.body.youtubeUrl 
	}

	// const article = {
	// 	text: req.params["text"],
	// 	author: req.params["author"], 
	// 	pictureUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
	// 	youtubeUrl: params["youtubeUrl"] 
	// }

	// Save article in the database
	Article.create(article)
		.then((data) => { 
			res.send(data) 
		})
		.catch((error) => res.status(403).json({error}))
}

// Get all articles
exports.getAll = (req, res) => {
	Article.findAll()
		.then((data) => {
			res.send(data)
		})
		.catch((error) => res.status(403).json({error}))

}

// Get one article
exports.getOne = (req, res) => {
	Article.findOne({_id: req.params.id})
		.then((article) => {res.status(200).json(sauce)})
		.catch((error) => {res.status(403).json({error})})
}

// Delete one article 
exports.delete = (req, res) => {
	Article.findOne({_id: res.param.id})
		.then ((article) => {
			const filename = article.pictureUrl.split("/images/")[1] 
			// delete picture then delete article
			fs.unlink(`images/${filename}`, () => {
				Article.deleteOne({_id:req.params.id})
					.then(() => res.status(200).json({error}))
			})
		})
		.catch((error) => res.status(403).json({error}))
}

// Modify one article
exports.modify = (req, res) => {
	let articleObjet = 0
	if (req.file) {

		Article.findOne ({_id: req.params.id})
			.then((article) => {
				const fileName = sauce.imageUrl.split("/images/")[1]
				fs.unlinkSync(`images/${fileName}`)
			})
		articleObject = {
			...JSON.parse(rsq.body.article),
			pictureUrl: `${req.protocol}://${req.get("host")}/images/${req.file.fileName}`
		}
	} else {
		articleObject = {...req.body}
	}

	Article.updateOne({id: req.params.id}, {...sauceObject, _id: req.params.id})
		.then(() => res.status(200).json({message: "article modifié"}))
		.catch((error) => res.status(403).json({error}))
}


