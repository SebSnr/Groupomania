module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
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
    })

    // User.associate = function() {
    //     User.hasOne(Article, {foreignKey: 'author'})
    //   };

    return User
}