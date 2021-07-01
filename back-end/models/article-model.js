module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        text : {
            type: Sequelize.STRING
        }, 
        author : {
            type: Sequelize.STRING 
        },
        pictureUrl : {
            type: Sequelize.STRING
        },
        youtubeUrl : {
            type: Sequelize.STRING
        }
    })
    return Article
}