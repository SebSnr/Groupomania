module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstname : {
            type: Sequelize.STRING
        },
        lastname : {
            type: Sequelize.STRING
        },
        // mail : {
        //     type: Sequelize.STRING
        // },
        photo : {
            type: Sequelize.STRING
        },
        // isAdmin : {
        //     type: Sequelize.BOOLEAN
        // },
    })
    return User
}