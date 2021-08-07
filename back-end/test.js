const db = require("./models")
const User = db.User
const Article = db.Article
const Comment = db.Comment




exports.createFakeUsers = () => {
	// create test users
	const fakeUsers = [
		{
			id: 1,
			firstName: "Manager",
			lastName: "Admin",
			email: "admin@groupomania.com",
			password: "$2b$10$OizGcgyBbX9tEYf/NDiSe.hxNz1olaH8llq0wORgKYU2scBmCdWsG",
			photo: "http://localhost:3200/images/admin.jpg1628173738281.jpg",
			isAdmin: 1,
		},
		{
			id: 2,
			firstName: "Amandine",
			lastName: "Gamair",
			email: "amandine.gameir@groupomania.com",
			password: "$2b$10$HEpd0v/PA9XA2Ly4vQNLDOWZW.dJ/pheVO2fcugaUY1ju2J5KdXSm",
			photo: "http://localhost:3200/images/LauraB.jpg1628185874399.jpg",
			isAdmin: 0,
		},
		{
			id: 3,
			firstName: "Jérémy",
			lastName: "Roh",
			email: "jeremy.roh@groupomania.com",
			password: "$2b$10$98NOwc.CGWK16rlT0ev3VuZyKV0hLJ1qwlK.ZK.VEFJK9eKA1UlM.",
			photo: "http://localhost:3200/images/WillSmith.jpg1628173865144.jpg",
			isAdmin: 0,
		},
		{
			id: 4,
			firstName: "Laura",
			lastName: "Sophie",
			email: "laura.sophie@groupomania.com",
			password: "$2b$10$A8F0c5.KeXNLH79sHX1SKu1kpA2RQmNHuA22lcMgGC6rg0C9nY0YS",
			photo: "http://localhost:3200/images/GeorgesLaura.jpg1628176445869.jpg",
			isAdmin: 0,
		},
		{
			id: 5,
			firstName: "Patric",
			lastName: "Armor",
			email: "armor@groupomania.com",
			password: "$2b$10$u76oxD09MgBWuNA6mpEvoeSYrg9t96QvYRgtjzornwhcr99I0tL4.",
			photo: "http://localhost:3200/images/patrice.jpeg1628176417762.jpg",
			isAdmin: 0,
		},
		{
			id: 6,
			firstName: "Didier",
			lastName: "Super",
			email: "didier.super@groupomania.com",
			password: "$2b$10$AKUtP970W5aJPisGnLpRHetp4tyvG7lvqJp1pSAI/wmx65D7Oq/16",
			photo: "http://localhost:3200/images/Patrice2.jpg",
			isAdmin: 0,
		},
		{
			id: 7,
			firstName: "Bernard",
			lastName: "Henri",
			email: "bernard@groupomania.com",
			password: "$2b$10$AKUtP970W5aJPisGnLpRHetp4tyvG7lvqJp1pSAI/wmx65D7Oq/16",
			photo: "http://localhost:3200/images/Unknow.jpg",
			isAdmin: 0,
		},
		{
			id: 8,
			firstName: "Julien",
			lastName: "Yves",
			email: "patrick@groupomania.com",
			password: "$2b$10$AKUtP970W5aJPisGnLpRHetp4tyvG7lvqJp1pSAI/wmx65D7Oq/16",
			photo: "http://localhost:3200/images/Pierre_Niney.jpg1628174238842.jpg",
			isAdmin: 0,
		},
		{
			id: 9,
			firstName: "Melissa",
			lastName: "Burli",
			email: "burli.mel@groupomania.com",
			password: "$2b$10$5/di2IUzMGLHuqC8KJJ5eeDo/Bbu3FKbmc5LpvSCeX3wTaLaPZKyy",
			photo: "http://localhost:3200/images/Laura_Laune.jpg1628176491741.jpg",
			isAdmin: 0,
		},
		{
			id: 10,
			firstName: "Georgette",
			lastName: "Marie",
			email: "georgette.marie@groupomania.com",
			password: "$2b$10$PpiJrEXdBlLDvZ4IZ.aiTOkrhqaWkS9TzFQ7o/W03GYtBX/.hzKPS",
			photo: "http://localhost:3200/images/Nemo.jpg1628160065909.jpg",
			isAdmin: 0,
		},
	]
 
	return fakeUsers.forEach((user) => {
		User.findOrCreate({where: {id: user.id}, default: user})
			.then(() => console.log("fake user created"))
			.catch((err) => console.log(err))
	})
}

exports.createFakeArticles = () => {
	// create test articles
	const fakeArticles = [
		{
			id: 1,
			text: "Je vous souhaite à tous une belle semaine la team Groupomania !",
			picture: "http://localhost:3200/images/bonjour_130.gif1628331269324.undefined",
			createdAt: "2021-08-07 10:14:29",
			updatedAt: "2021-08-07 10:14:29",
			UserId: 1,
		},
		{
			id: 2,
			text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias dicta quos eaque sint, error molestias aliquid quo ea, aliquam facere voluptatem earum nam magni adipisci nesciunt. Laboriosam saepe commodi vitae accusantium consectetur dicta dolores animi libero placeat ea quo dolor, nesciunt incidunt itaque error dignissimos, ullam molestias similique amet reiciendis unde cumque. Corrupti nobis a voluptate, quis et dolores similique voluptas repellat delectus, nulla dolor facilis quo laborum doloremque molestiae ad omnis nesciunt tempora aliquid alias quaerat ab ea ipsa accusamus. In ipsam error, natus pariatur, numquam reprehenderit sunt excepturi fugit at voluptate soluta quia! In ipsa aliquid amet id facere deleniti aspernatur dolores, repellendus nostrum commodi. Ad expedita tempora minus facere sed dolor eligendi ut quam, ratione incidunt numquam perspiciatis fugit, vitae debitis deleniti corrupti nobis asperiores voluptate accusantium! Incidunt esse adipisci, corporis consequuntur aperiam alias vero dolor? Nulla suscipit molestiae dolores facere? Id quo sunt doloribus ducimus error natus velit, fugiat temporibus praesentium omnis amet ipsum repellendus quisquam. Aliquid, cupiditate. Harum tempora vero suscipit saepe velit ullam officia voluptatum voluptatibus in. Voluptatem ducimus explicabo, aliquam ut rerum rem eligendi repudiandae! Sequi, ab quidem accusantium explicabo recusandae voluptates molestiae iste perspiciatis, iure facilis unde harum quia! At accusantium itaque, molestiae non nemo impedit explicabo. Vel a dolorem, beatae ab corporis ratione illum pariatur cum consequatur dolores magnam! Similique quas optio veniam, explicabo debitis totam reiciendis enim mollitia repellat rem provident ex temporibus saepe! Amet, neque quos! Eum accusamus, ratione velit recusandae odio itaque molestiae soluta harum unde esse nulla eveniet numquam labore expedita vero.",
			createdAt: "2021-08-07 10:15:41",
			updatedAt: "2021-08-07 10:15:41",
			UserId: 6,
		},
		{
			id: 3,
			text: "La relaxation au travail aide à diminuer l’impact du stress sur la santé au quotidien. Lara Histel-Barontini, auteure de La Boîte à Outils de la relaxion, vous propose ces 9 exercices peuvent être pratiqués en fonction de vos besoins et apportent leurs bienfaits au niveau physique, mental et émotionnel tout en améliorant votre productivité et votre performance.",
			picture: "http://localhost:3200/images/Pass-Zen-.jpg1628331633409.jpg",
			createdAt: "2021-08-07 10:20:33",
			updatedAt: "2021-08-07 10:20:33",
			UserId: 3,
		},
		{id: 4, text: "Pour commencer la semaine en musique !", youtube: "https://www.youtube.com/watch?v=OPf0YbXqDm0", createdAt: "2021-08-07 10:29:29", updatedAt: "2021-08-07 10:29:29", UserId: 9},
	] 

	return fakeArticles.forEach((article) => {
		Article.findOrCreate({where: {id: article.id}, default: article})
			.then(() => console.log("fake article created"))
			.catch((err) => console.log(err))
	})
}

exports.createFakeComments = () => { 
	// create test comments
	const fakeComments = [
		{
			id: 1,
			text: "Super vidéo ! :)",
			createdAt: "2021-08-07 15:29:29",
			updatedAt: "2021-08-07 15:29:29",
            ArticleId: 4, 
			UserId: 3,
		},
		{
			id: 2,
			text: "J'adore Bruno Mars ! Un bon lundi qui commnce",
			createdAt: "2021-08-07 16:14:41",
			updatedAt: "2021-08-07 16:14:41",
            ArticleId: 4,
			UserId: 6,
		},
		{
			id: 3,
			text: "Tout en améliorant votre productivité et votre performance. héhé ça va intéressé les patrons ...",
			createdAt: "2021-08-07 10:20:33",
			updatedAt: "2021-08-07 10:20:33",
            ArticleId: 3,
			UserId: 2,
		},
	] 

	return fakeComments.forEach((comment) => {
		Comment.findOrCreate({where: {id: comment.id}, default: comment})
			.then(() => console.log("fake article created"))
			.catch((err) => console.log(err))
	})
}

