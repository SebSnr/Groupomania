module.exports = app => {

    const articles = require("../controllers/article-ctrl")

    const router = require("express").Router()


    router.post("/", articles.create)
    router.get("/", articles.findAll)

    app.use('/api/articles', router)

}