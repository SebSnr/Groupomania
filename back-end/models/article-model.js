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
    return Article
}