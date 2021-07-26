module.exports = app => {

    const router = require("express").Router()
    const userCtrl = require("../controllers/user-ctrl")
    const multer = require('../middleware/multer-config')
    const auth = require('../middleware/auth');

    
    app.use("/api/auth", router)

    router.post("/signup", multer, userCtrl.signup)
    router.post("/login", userCtrl.login)
    router.put("/", auth, multer, userCtrl.modify)
    router.delete("/:id", auth, userCtrl.delete) 
    
    router.get("/", auth, userCtrl.getAll)


    // router.get("/:id", userCtrl.getOne)
}