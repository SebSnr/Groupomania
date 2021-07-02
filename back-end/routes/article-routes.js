

module.exports = app => {

    const router = require("express").Router()
    
    
    const multer = require('../middleware/multer-config')
    const articles = require("../controllers/article-ctrl")


    router.post("/", multer, articles.create)
    router.get("/", articles.findAll)

    app.use('/api/articles', router)

}