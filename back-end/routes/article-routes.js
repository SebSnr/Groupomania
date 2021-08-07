module.exports = app => {

    const router = require("express").Router()
    const articlesCtrl = require("../controllers/article-ctrl")
    const multer = require('../middleware/multer-config')
    const auth = require('../middleware/auth');
    
    app.use("/api/articles", router)

    router.post("/", auth, multer, articlesCtrl.create)
    router.get("/", auth, articlesCtrl.getAll)
    router.get("/:id", auth, articlesCtrl.getOne)
    router.delete("/:id", auth, articlesCtrl.delete)
}