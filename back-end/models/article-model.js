'use strict';

module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.STRING
        }, 
        author: {
            type: Sequelize.INTEGER,
            // references: {
            //     // This is a reference to another model
            //     model: db.users, 

            //     // This is the column name of the referenced model
            //     key: 'id' 
            // } 
        },
        picture: {
            type: Sequelize.STRING
        },
        youtube: {
            type: Sequelize.STRING 
        }
    }, 
        // {classMethods: {
        //   associate: function () {
        //     Article.belongsTo(User, {foreignKey: 'id'})
        //   }}
        // }
    // )
     {
        associate:  function(models) {
            Article.hasOne(models.users, {foreignKey: 'id'}) 
        }
    })
    return Article
}
