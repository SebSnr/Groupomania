const db = require("../models")
const Article = db.articles
// const Op = db.Sequelize.Op
const fs = require("fs")
const jwt = require("jsonwebtoken")
// const User = db.users


// Create a new Article
exports.create = (req, res) => {
	// Validate request
	// if (!req.body.articleBody) {
	// 	res.status(403).send({
	// 		message: "Content can not be empty!",
	// 	})
	// 	return 
	// }

	let pictureUrl = ""
	if (req.file){ 
		pictureUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	}
	// Create a article 
	const article = {
			text: req.body.text,
			author: req.body.author, 
			youtube: req.body.youtube,
			picture: pictureUrl,  
		}

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

// test pour relier les tables users et articles
// exports.getAll = (req, res) => {
// 	Article.findAll({
// 		include: [{
// 			model: User,
// 			where: {id: 36 }
// 			}]
// 		})
// 			.then((data) => {
// 				res.send(data)
// 			})
// 			.catch((error) => res.status(403).json("das une errur"))
// }

// Get one article
exports.getOne = (req, res) => {
	// Article.findOne({where : {id: req.params.id}})
	// 	.then((article) => {res.status(200).json(article)})
	// 	.catch((error) => res.status(403).json({error})) 

	console.log(req.params.id)

	Article.findOne({where : {id: req.params.id}})
		.then ((article) => {res.send(article) })
		.catch((error) => res.status(403).json({error})) 
}

// Delete one article 
exports.delete = (req, res) => {

	// check user id and author id
	const usertoken = req.headers.authorization;
	const token = usertoken.split(' ');
	const decodedId = jwt.verify(token[1], "monTokenSuperSecret1984");
	console.log(decodedId.userId);

	Article.findOne({where : {id: req.params.id}})
		.then ((article) => { 

			console.log("article trouvé")  // a supprimer

			if (article.author ==  decodedId.userId) {
				const filename = article.picture.split("/images/")[1] 
				console.log(filename)
				// delete picture then delete article
				fs.unlink(`./uploads/${filename}`, () => {
					Article.destroy({where : {id: req.params.id}})
						.then(() => res.status(200).json("Article supprimé")) 
						.catch((error) => res.status(403).json({error})) 
				})
			} 

			console.log("post finden but authentificaton error")  // a supprimer
			
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
			picture: `${req.protocol}://${req.get("host")}/images/${req.file.fileName}` 
		}
	} else {
		articleObject = {...req.body}
	}

	Article.updateOne({id: req.params.id}, {...sauceObject, _id: req.params.id})
		.then(() => res.status(200).json({message: "article modifié"}))
		.catch((error) => res.status(403).json({error}))
}


