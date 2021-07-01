module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        text : {
            type: Sequelize.STRING
        }, 
        author : {
            type: Sequelize.STRING 
        },
    })
    return Article
}