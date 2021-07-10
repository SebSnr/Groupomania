// 'use strict';

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName : { 
            type: Sequelize.STRING
        },
        lastName : {
            type: Sequelize.STRING
        },
        email : {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        // photo : {
        //     type: Sequelize.STRING
        // },
        // isAdmin : {
        //     type: Sequelize.BOOLEAN
        // }, 
    }, 

    // {
    //     associate: function(db) {
    //         Article.hasOne(db.Article, {foreignKey: ''}) 
    //     }
    // }
    )

    // User.associate = function() {
    //     User.hasMany(Article, {foreignKey: 'author'})
    //   };

    return User
}

   