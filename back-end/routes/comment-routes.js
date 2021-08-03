module.exports = app => {

    const router = require("express").Router()
    const commentsCtrl = require("../controllers/comment-ctrl")
    const multer = require('../middleware/multer-config')
    const auth = require('../middleware/auth');

    
    app.use("/api/comments", router)

    router.post("/:id", auth, multer, commentsCtrl.create)
    router.get("/:id", auth, commentsCtrl.getAll)
    // router.get("/:id", auth, commentsCtrl.getOne)
    // router.delete("/:id", auth, commentsCtrl.delete)

    // router.put("/:id", auth, commentsCtrl.modify)
}