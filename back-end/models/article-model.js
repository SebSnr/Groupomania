module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        text: {
            type: Sequelize.STRING
        }, 
        author: {
            type: Sequelize.STRING 
        },
        picture: {
            type: Sequelize.STRING
        },
        youtube: {
            type: Sequelize.STRING
        }
    })

    // Article.associate = function() {
    //     Article.belongsTo(User, {foreignKey: 'id'})
    //   };

    return Article
}