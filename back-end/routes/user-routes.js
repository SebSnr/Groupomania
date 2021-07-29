module.exports = (app) => {
	const router = require("express").Router()
	const userCtrl = require("../controllers/user-ctrl")
	const multer = require("../middleware/multer-config")
	const auth = require("../middleware/auth")
	const verifyMail = require("../middleware/verifyMail")
	const verifyPassword = require("../middleware/verifyPassword")

	app.use("/api/auth", router)

	router.post("/signup", multer, verifyMail, verifyPassword, userCtrl.signup)
	router.post("/login", verifyMail, verifyPassword, userCtrl.login) 
	router.get("/", auth, userCtrl.getAll)
	router.delete("/user/:email", auth, userCtrl.deleteOneUser)
	router.delete("/", auth, userCtrl.delete)
	router.put("/", auth, multer, userCtrl.modify)
}
