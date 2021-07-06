module.exports = app => {

    const router = require("express").Router()
    const userCtrl = require("../controllers/user-ctrl")
    
    app.use("/api/auth", router)

    router.post("/signup", userCtrl.signup)
    router.post("/login", userCtrl.login)


    // router.get("/:id", userCtrl.getOne)
    // router.get("/:id", userCtrl.getAll)
    // router.delete("/:id", userCtrl.delete)
    // router.put("/:id", userCtrl.modify)
}