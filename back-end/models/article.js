"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	class Article extends Model {
		static associate(models) {
			// define associations tables
			models.Article.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE",
			})
			models.Article.hasMany(models.Comment)
			// models.Article.hasMany(models.Like)
		}
	}
	Article.init(
		{
			text: {type: DataTypes.TEXT, allowNull: true},
			picture: {type: DataTypes.STRING, allowNull: true},
			youtube: {type: DataTypes.STRING, allowNull: true},
		}, 
		{
			sequelize,
			modelName: "Article",
		}
	)

	// // create test articles
	// const fakeArticles = [
	// 	{
	// 		id: 1,
	// 		text: "Je vous souhaite à tous une belle semaine la team Groupomania !",
	// 		picture: "http://localhost:3200/images/bonjour_130.gif1628331269324.undefined",
	// 		createdAt: "2021-08-07 10:14:29",
	// 		updatedAt: "2021-08-07 10:14:29",
	// 		UserId: 1,
	// 	},
	// 	{
	// 		id: 2,
	// 		text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias dicta quos eaque sint, error molestias aliquid quo ea, aliquam facere voluptatem earum nam magni adipisci nesciunt. Laboriosam saepe commodi vitae accusantium consectetur dicta dolores animi libero placeat ea quo dolor, nesciunt incidunt itaque error dignissimos, ullam molestias similique amet reiciendis unde cumque. Corrupti nobis a voluptate, quis et dolores similique voluptas repellat delectus, nulla dolor facilis quo laborum doloremque molestiae ad omnis nesciunt tempora aliquid alias quaerat ab ea ipsa accusamus. In ipsam error, natus pariatur, numquam reprehenderit sunt excepturi fugit at voluptate soluta quia! In ipsa aliquid amet id facere deleniti aspernatur dolores, repellendus nostrum commodi. Ad expedita tempora minus facere sed dolor eligendi ut quam, ratione incidunt numquam perspiciatis fugit, vitae debitis deleniti corrupti nobis asperiores voluptate accusantium! Incidunt esse adipisci, corporis consequuntur aperiam alias vero dolor? Nulla suscipit molestiae dolores facere? Id quo sunt doloribus ducimus error natus velit, fugiat temporibus praesentium omnis amet ipsum repellendus quisquam. Aliquid, cupiditate. Harum tempora vero suscipit saepe velit ullam officia voluptatum voluptatibus in. Voluptatem ducimus explicabo, aliquam ut rerum rem eligendi repudiandae! Sequi, ab quidem accusantium explicabo recusandae voluptates molestiae iste perspiciatis, iure facilis unde harum quia! At accusantium itaque, molestiae non nemo impedit explicabo. Vel a dolorem, beatae ab corporis ratione illum pariatur cum consequatur dolores magnam! Similique quas optio veniam, explicabo debitis totam reiciendis enim mollitia repellat rem provident ex temporibus saepe! Amet, neque quos! Eum accusamus, ratione velit recusandae odio itaque molestiae soluta harum unde esse nulla eveniet numquam labore expedita vero.",
	// 		createdAt: "2021-08-07 10:15:41",
	// 		updatedAt: "2021-08-07 10:15:41",
	// 		UserId: 6,
	// 	},
	// 	{
	// 		id: 3,
	// 		text: "La relaxation au travail aide à diminuer l’impact du stress sur la santé au quotidien. Lara Histel-Barontini, auteure de La Boîte à Outils de la relaxion, vous propose ces 9 exercices peuvent être pratiqués en fonction de vos besoins et apportent leurs bienfaits au niveau physique, mental et émotionnel tout en améliorant votre productivité et votre performance.",
	// 		picture: "http://localhost:3200/images/Pass-Zen-.jpg1628331633409.jpg",
	// 		createdAt: "2021-08-07 10:20:33",
	// 		updatedAt: "2021-08-07 10:20:33",
	// 		UserId: 3,
	// 	},
	// 	{id: 4, text: "Pour commencer la semaine en musique !", youtube: "https://www.youtube.com/watch?v=OPf0YbXqDm0", createdAt: "2021-08-07 10:29:29", updatedAt: "2021-08-07 10:29:29", UserId: 9}
	// ]
	// fakeArticles.forEach((article) => {
	// 	Article.findOrCreate({where: {id: article.id}, defaults: article})
	// 		.then(() => console.log("fake article created"))
	// 		.catch((error) => console.log(error))
	// })

	return Article
}

