module.exports = app => {

    const router = require("express").Router()
    const commentsCtrl = require("../controllers/comment-ctrl")
    const auth = require('../middleware/auth');
    
    app.use("/api/comments", router)

    router.post("/:id", auth, commentsCtrl.create) 
    router.get("/:id", auth, commentsCtrl.getAll)
    router.delete("/:id", auth, commentsCtrl.delete)
}