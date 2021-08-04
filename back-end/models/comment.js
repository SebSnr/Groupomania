"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			// define associations tables
			models.Comment.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE", 
			})
            models.Comment.belongsTo(models.Article, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE",
			})
		}
	}
	Comment.init(
		{
			text: {type: DataTypes.TEXT, allowNull: true},
		},
		{
			sequelize,
			modelName: "Comment", 
		}
	)
	return Comment
}
