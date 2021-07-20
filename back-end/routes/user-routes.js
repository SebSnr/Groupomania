module.exports = app => {

    const router = require("express").Router()
    const userCtrl = require("../controllers/user-ctrl")
    const multer = require('../middleware/multer-config')

    
    app.use("/api/auth", router)

    router.post("/signup", multer, userCtrl.signup)
    router.post("/login", userCtrl.login)


    // router.get("/:id", userCtrl.getAll)
    // router.get("/:id", userCtrl.getOne)
    // router.delete("/:id", userCtrl.delete)
    // router.put("/:id", userCtrl.modify)
}