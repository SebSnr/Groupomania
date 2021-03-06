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

	return Article
}

