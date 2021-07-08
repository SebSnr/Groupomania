module.exports = app => {

    const router = require("express").Router()
    const articlesCtrl = require("../controllers/article-ctrl")
    // const multer = require('../middleware/multer-config')
    const auth = require('../middleware/auth');

    const uploadCtrl = require("../controllers/upload-ctrl");
    const upload = require("../middleware/upload");
    
    app.use("/api/articles", router)

    router.post("/", auth, upload.single("picture"), uploadCtrl.uploadFiles, articlesCtrl.create)
    router.get("/", auth, articlesCtrl.getAll, articlesCtrl.getOnePicture)
    router.get("/:id", auth, articlesCtrl.getOne)
    router.delete("/:id", auth, articlesCtrl.delete)
    router.put("/:id", auth, articlesCtrl.modify)
}