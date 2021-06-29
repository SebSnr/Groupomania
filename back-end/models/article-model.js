module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        text : {
            type: Sequelize.STRING
        }
    })
    return Article
}