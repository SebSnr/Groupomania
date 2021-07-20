"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define associations tables
			models.User.hasOne(models.Article)
			//   models.User.hasMany(models.Comment);
			//   models.User.hasMany(models.Like);
		}
	}
	User.init(
		{
			firstName: {type: DataTypes.STRING, allowNull: false},
			lastName: {type: DataTypes.STRING, allowNull: false},
			email: {type: DataTypes.STRING, allowNull: false, unique: true},
			password: {type: DataTypes.STRING, allowNull: false},
			photo: { type: DataTypes.STRING, allowNull: true },
			isAdmin: {type: DataTypes.BOOLEAN, allowNull: false,  defaultValue: false},
		},
		{
			sequelize,
			modelName: "User",
		}
	)
	return User 
}
