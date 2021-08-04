module.exports = (app) => {
	const router = require("express").Router()
	const userCtrl = require("../controllers/user-ctrl")
	const multer = require("../middleware/multer-config")
	const auth = require("../middleware/auth")
	const verifyMail = require("../middleware/verifyMail")
	const pwCtrl = require("../middleware/verifyPassword")
	const limiter = require('../middleware/rate-limiter')


	app.use("/api/auth", router)

	router.post("/signup", multer, verifyMail, pwCtrl.verifyPassword, userCtrl.signup)
	router.post("/login", limiter, verifyMail, pwCtrl.verifyPassword, userCtrl.login) 
	router.get("/", auth, userCtrl.getAll)
	router.delete("/user/:email", auth, userCtrl.deleteOneUser)
	router.delete("/", auth, userCtrl.delete)
	router.put("/", auth, multer, userCtrl.modify)
	router.put("/password", auth, pwCtrl.verifyPassword, pwCtrl.verifyNewPassword, userCtrl.modifyPassword)

}
