module.exports = app => {

    const router = require("express").Router()
    // const articlesCtrl = require("../controllers/article-ctrl")
    const auth = require('../middleware/auth');
    const uploadCtrl = require("../controllers/upload-ctrl");
    const upload = require("../middleware/upload");

    
    app.use("/api/articles", router)

    router.post("/", upload.single("picture"), uploadCtrl.uploadFiles)

    // router.post("/", auth, multer, articlesCtrl.create)
    // router.get("/", auth, articlesCtrl.getAll)
    // router.get("/:id", auth, articlesCtrl.getOne)
    // router.delete("/:id", auth, articlesCtrl.delete)
    // router.put("/:id", auth, articlesCtrl.modify)
}

