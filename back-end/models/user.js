"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define associations tables
			models.User.hasMany(models.Article)
			models.User.hasMany(models.Comment)
		}
	}
	User.init(
		{
			firstName: {type: DataTypes.STRING, allowNull: false},
			lastName: {type: DataTypes.STRING, allowNull: false},
			email: {type: DataTypes.STRING, allowNull: false, unique: true},
			password: {type: DataTypes.STRING, allowNull: false},
			photo: {type: DataTypes.STRING, allowNull: true},
			isAdmin: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		},
		{
			sequelize,
			modelName: "User",
		}
	)
	// // create test users
	// const fakeUsers = [
	// 	{
	// 		id: 1,
	// 		firstName: "Manager",
	// 		lastName: "Admin",
	// 		email: "admin@groupomania.com",
	// 		password: "$2b$10$OizGcgyBbX9tEYf/NDiSe.hxNz1olaH8llq0wORgKYU2scBmCdWsG",
	// 		photo: "http://localhost:3200/images/admin.jpg1628173738281.jpg",
	// 		isAdmin: 1,
	// 	},
	// 	{
	// 		id: 2,
	// 		firstName: "Amandine",
	// 		lastName: "Gamair",
	// 		email: "amandine.gameir@groupomania.com",
	// 		password: "$2b$10$HEpd0v/PA9XA2Ly4vQNLDOWZW.dJ/pheVO2fcugaUY1ju2J5KdXSm",
	// 		photo: "http://localhost:3200/images/LauraB.jpg1628185874399.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 3,
	// 		firstName: "Jérémy",
	// 		lastName: "Roh",
	// 		email: "jeremy.roh@groupomania.com",
	// 		password: "$2b$10$98NOwc.CGWK16rlT0ev3VuZyKV0hLJ1qwlK.ZK.VEFJK9eKA1UlM.",
	// 		photo: "http://localhost:3200/images/WillSmith.jpg1628173865144.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 4,
	// 		firstName: "Laura",
	// 		lastName: "Sophie",
	// 		email: "laura.sophie@groupomania.com",
	// 		password: "$2b$10$A8F0c5.KeXNLH79sHX1SKu1kpA2RQmNHuA22lcMgGC6rg0C9nY0YS",
	// 		photo: "http://localhost:3200/images/GeorgesLaura.jpg1628176445869.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 5,
	// 		firstName: "Patric",
	// 		lastName: "Armor",
	// 		email: "armor@groupomania.com",
	// 		password: "$2b$10$u76oxD09MgBWuNA6mpEvoeSYrg9t96QvYRgtjzornwhcr99I0tL4.",
	// 		photo: "http://localhost:3200/images/patrice.jpeg1628176417762.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 6,
	// 		firstName: "Didier",
	// 		lastName: "Super",
	// 		email: "didier.super@groupomania.com",
	// 		password: "$2b$10$AKUtP970W5aJPisGnLpRHetp4tyvG7lvqJp1pSAI/wmx65D7Oq/16",
	// 		photo: "http://localhost:3200/images/Patrice2.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 7,
	// 		firstName: "Bernard",
	// 		lastName: "Henri",
	// 		email: "bernard@groupomania.com",
	// 		password: "$2b$10$AKUtP970W5aJPisGnLpRHetp4tyvG7lvqJp1pSAI/wmx65D7Oq/16",
	// 		photo: "http://localhost:3200/images/Unknow.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 8,
	// 		firstName: "Julien",
	// 		lastName: "Yves",
	// 		email: "patrick@groupomania.com",
	// 		password: "$2b$10$AKUtP970W5aJPisGnLpRHetp4tyvG7lvqJp1pSAI/wmx65D7Oq/16",
	// 		photo: "http://localhost:3200/images/Pierre_Niney.jpg1628174238842.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 9,
	// 		firstName: "Melissa",
	// 		lastName: "Burli",
	// 		email: "burli.mel@groupomania.com",
	// 		password: "$2b$10$5/di2IUzMGLHuqC8KJJ5eeDo/Bbu3FKbmc5LpvSCeX3wTaLaPZKyy",
	// 		photo: "http://localhost:3200/images/Laura_Laune.jpg1628176491741.jpg",
	// 		isAdmin: 0,
	// 	},
	// 	{
	// 		id: 10,
	// 		firstName: "Georgette",
	// 		lastName: "Marie",
	// 		email: "georgette.marie@groupomania.com",
	// 		password: "$2b$10$PpiJrEXdBlLDvZ4IZ.aiTOkrhqaWkS9TzFQ7o/W03GYtBX/.hzKPS",
	// 		photo: "http://localhost:3200/images/Nemo.jpg1628160065909.jpg",
	// 		isAdmin: 0,
	// 	},
	// ]

	// fakeUsers.forEach((user) => {
	// 	User.findOrCreate({where: {id: user.id}, defaults: user})
	// 		.then(() => console.log("fake user created"))
	// 		.catch((error) => console.log(error))
	// })

	return User
}
