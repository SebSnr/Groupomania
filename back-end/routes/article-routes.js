module.exports = app => {

    const router = require("express").Router()
    const articlesCtrl = require("../controllers/article-ctrl")
    const multer = require('../middleware/multer-config')
    
    app.use("/api/articles", router)

    router.post("/", multer, articlesCtrl.create)
    router.get("/", articlesCtrl.getAll)
    router.get("/:id", articlesCtrl.getOne)
    router.delete("/:id", articlesCtrl.delete)
    router.put("/:id", articlesCtrl.modify)
}