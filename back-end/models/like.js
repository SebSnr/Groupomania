"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		static associate(models) {
			// define associations tables
			// models.Like.belongsTo(models.User, {
			// 	foreignKey: {
			// 		allowNull: false,
			// 	},
			// 	onDelete: "CASCADE",
			// })
            // models.Like.belongsTo(models.Article, {
			// 	foreignKey: {
			// 		allowNull: false,
			// 	},
			// 	onDelete: "CASCADE",
			// })
		}
	} 
	Like.init(
		{
			like: {type: DataTypes.INTEGER, allowNull: true},   
			disLike: {type: DataTypes.INTEGER, allowNull: true},  
			// usersLiked:{type: DataTypes.ARRAY(DataTypes.DECIMAL), allowNull: true},
			// usersDisLiked:{type: DataTypes.ARRAY(DataTypes.DECIMAL), allowNull: true}  
		},
		{
			sequelize,
			modelName: "Like", 
		}
	)
	return Like
}
