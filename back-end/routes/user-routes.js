module.exports = app => {

    const router = require("express").Router()
    const userCtrl = require("../controllers/user-ctrl")
    
    app.use("/api/users", router)

    router.post("/", userCtrl.create)
    router.get("/:id", userCtrl.getOne)
    router.get("/:id", userCtrl.getAll)
    router.delete("/:id", userCtrl.delete)
    router.put("/:id", userCtrl.modify)
}